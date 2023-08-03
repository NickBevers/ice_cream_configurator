<script setup lang="ts">
    import { ref, Ref, onMounted, watch } from 'vue';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    const props = defineProps({
        currentPhase: Number,
        flavour: String,
        topping: String,
        color: String,
        image: String
    });

    // convert the props to refs
    const flavour: Ref<string> = ref(props.flavour ?props.flavour :'');
    const topping: Ref<string> = ref(props.topping ?props.topping :'');
    const color: Ref<string> = ref(props.color ?props.color :'');
    const image: Ref<string> = ref(props.image ?props.image :'/src/assets/Images/logo_semibold.jpg');

    watch(props, (newValue) => {
        flavour.value = newValue.flavour!;
        topping.value = newValue.topping!;
        color.value = newValue.color!;
        image.value = newValue.image!;
    });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    const softserveModel = '/src/assets/Models/softserve.gltf';

    onMounted(() => {
        const domElement = document.querySelector<HTMLElement>(".configurator__threejs")!;
        const sizes = { width: domElement.offsetWidth, height: domElement.offsetHeight }

        if (sizes.width === 0 || sizes.height === 0) {
            sizes.width = document.querySelector<HTMLElement>(".configurator__threejs")!.offsetWidth!;
            sizes.height = document.querySelector<HTMLElement>(".configurator__threejs")!.offsetHeight!;
        };

        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xCAE3E8);
        const camera = new THREE.PerspectiveCamera(60, domElement.offsetWidth / domElement.offsetHeight, 0.01, 1000);
        camera.position.set(0, 0, 0.5);

        if (sizes.width < 500) {
            camera.zoom = 0.7;
            camera.updateProjectionMatrix();
        }

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        let logoMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image.value), side: THREE.DoubleSide, });
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0.15;
        controls.maxDistance = 1;
        controls.enableZoom = false;
        // controls.enablePan = false;
        dracoLoader.setDecoderConfig({ type: 'js' });
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        // dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        // ice cream flavour updates
        watch(flavour, (newValue) => {
            let color = 0xF9F3E6;
            switch (newValue) {
                case 'vanilla':
                    color = 0xF9F3E6;
                    break;
                case 'chocolate':
                    color = 0xBD9276;
                    break;
                case 'strawberry':
                    color = 0xFAAFAF;
                    break;
                default:
                    color = 0xF9F3E6;
                    break;
                }
            scene.traverse((child) => {
                if (child.name === 'softServe') {
                    const material = child as THREE.Mesh;
                    material.material = new THREE.MeshStandardMaterial({ color: color });
                }
            });
        });

        // topping updates
        watch(topping, (newValue) => {
            if (newValue === '') return;

            // remove the previous topping
            scene.traverse((child) => {
                if (child.name === 'Scene'){
                    const root = child as THREE.Group;
                    root.children.forEach((rootChild) => {
                        if (rootChild.name === 'sauce' || rootChild.name === 'sprinkles' || rootChild.name === 'mnms') {
                            if (child.children.length === 1){
                                scene.remove(child);
                            } else{
                                root.remove(rootChild);
                            }
                        }
                    });
                }
            });

            if (newValue !== 'sprinkles' && newValue !== 'mnm') {
                let color = 0x4D1F0C;
                switch (newValue) {
                    case 'chocolateSauce':
                        color = 0x4D1F0C;
                        break;
                    case 'strawberrySauce':
                        color = 0xB71C27;
                        break;
                    default:
                        color = 0x4D1F0C;
                        break;
                }

                loadSauce([0, 0, 0], [1, 1, 1], color);
            } else {
                // load the sprinkles or mnm
                switch (newValue) {
                    case 'sprinkles':
                        loadSprinkles();
                        break;
                    case 'mnm':
                        loadMnm();
                        break;
                    default:
                        loadSprinkles();
                        break;
                }
            }
        });
        
        // color updates
        watch(color, (newValue) => {
            scene.traverse((child) => {
                if (child.name === 'cup') {
                    const meshColour = child as THREE.Mesh;
                    meshColour.material = new THREE.MeshStandardMaterial({ color: newValue });
                }
            });
        });

        // logo updates
        watch(image, (newValue) => {
            if (newValue === '') return;
            console.log('SCENE', scene);
            scene.traverse((child) => {
                if (child.name === 'logo') {
                    scene.remove(child);
                }
            });
            loadLogo();
        });


        //load the softserve model
        const loadSoftserveModel = (position = [0, 0, 0], scale = [1, 1, 1]) => {
            loader.load(
                softserveModel,

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale as [number, number, number]);
                    root.position.set(...position as [number, number, number]);

                    root.traverse((child) => {
                        if (child.name === 'cup') {
                            const meshColour = child as THREE.Mesh;
                            meshColour.material = new THREE.MeshStandardMaterial({ color: 0xE2D4FF });
                        }
                    });

                    scene.add(root);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        const loadSprinkles = (position = [0, 0, 0], scale = [1, 1, 1]) => {
            loader.load(
                '/src/assets/Models/sprinkles.gltf',

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale as [number, number, number]);
                    root.position.set(...position as [number, number, number]);
                    scene.add(root);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        const loadMnm = (position = [0, 0, 0], scale = [1, 1, 1]) => {
            loader.load(
                '/src/assets/Models/mnms.gltf',

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale as [number, number, number]);
                    root.position.set(...position as [number, number, number]);
                    scene.add(root);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        // load the chocolate sauce
        const loadSauce = (position = [0, 0, 0], scale = [1, 1, 1], color: THREE.ColorRepresentation = 0) => {
            loader.load(
                '/src/assets/Models/sauce.gltf',

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale as [number, number, number]);
                    root.position.set(...position as [number, number, number]);
                    root.traverse((child) => {
                        if (child.name === 'sauce') {
                            const material = child as THREE.Mesh;
                            material.material = new THREE.MeshStandardMaterial({ color: color });
                        }
                    });
                    scene.add(root);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        const loadLogo = async () => {
            console.log('image', image.value);
            let tempImage = new Image();
            tempImage.src = image.value;

            // wait for the image to have a width and height
            await new Promise((resolve) => {
                tempImage.onload = () => {
                    resolve(void 0);
                }
            });

            const width = tempImage.width;
            const height = tempImage.height;
            logoMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image.value), transparent:true, side: THREE.DoubleSide, opacity: 1, });
            
            let aspectRatio = width / height;
            let geometry;
            if (width > height) {
                geometry = new THREE.PlaneGeometry(0.1, 0.1 / aspectRatio);

            } else {
                geometry = new THREE.PlaneGeometry(0.1 * aspectRatio, 0.1);
            }

            const imageToAdd = new THREE.Mesh( geometry, logoMaterial );
            imageToAdd.name = "logo";
            imageToAdd.position.set(-0.01, 0.09, 0.1);
            imageToAdd.rotation.set(-0.15, -0.2, -0.06);
            scene.add(imageToAdd);
        }

        const spotLight = new THREE.SpotLight(0xcfcfcf, 0.25);
        spotLight.position.set(0, 0, 15);
        scene.add(spotLight);

        const backSpotLight = new THREE.SpotLight(0xcfcfcf, 0.25);
        backSpotLight.position.set(0, 0, -15);
        scene.add(backSpotLight);
        
        // setup rectAreaLights
        const topRectAreaLight = new THREE.RectAreaLight(0xffffff, 1.1, 15, 15);
        topRectAreaLight.position.set(0, 0.5, 0);
        topRectAreaLight.lookAt(0, 0, 0);
        topRectAreaLight.name = "topRectAreaLight";
        scene.add(topRectAreaLight);

        const bottomRectAreaLight = new THREE.RectAreaLight(0xffffff, 0.8, 15, 15);
        bottomRectAreaLight.position.set(0, -0.5, 0);
        bottomRectAreaLight.lookAt(0, 0, 0);
        bottomRectAreaLight.name = "bottomRectAreaLight";
        scene.add(bottomRectAreaLight);

        // Setting up the controls
        controls.update();
        controls.autoRotate = true;


        // Setting up the renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        document.querySelector(".configurator__threejs")?.appendChild(renderer.domElement);
        renderer.render(scene, camera);


        // Animating the scene
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Calling the functions
        loadSoftserveModel();
        loadLogo();
        animate();
    });

</script>

<template>
    <div class="configurator__threejs">
    </div>
</template>

<style scoped>

    .configurator__threejs{
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
</style>