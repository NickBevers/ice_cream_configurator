<script setup lang="ts">
    import { onMounted } from 'vue';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    
    onMounted(() => {
        // get the width and height of the backdrop container
        let { width, height } = document.querySelector('.three__container')?.getBoundingClientRect() as DOMRect;
        height < 750 ? height = 750 : height = height;
        
        // set up the scene, camera, renderer, controls, loader, and dracoLoader
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();

        // set the control settings
        controls.minDistance = 0.15;
        controls.maxDistance = 1;
        controls.maxPolarAngle, controls.minPolarAngle = Math.PI / 2;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enabled = false;
        controls.autoRotate = true;

        // set the size of the renderer
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0);

        // add the renderer to the page
        document.querySelector('.three__container')!.appendChild(renderer.domElement);
    
        // set the camera position and make the model bigger
        camera.position.z = 5;
        camera.zoom = 1.5;
        camera.updateProjectionMatrix();
        
        // dracoLoader.setDecoderPath('/node_modules/three/examples/jsm/libs/draco/');
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        
        // dracoLoader.preload();
        loader.setDRACOLoader(dracoLoader);
        const loadModel = (position: Array<number> = [0, 0.11, 0], rotation: Array<number> = [0.2, 0, 0], scale: Array<number> = [1, 1, 1]) => {
            // Load the donut model
            loader.load(
                '/src/assets/Models/softserve.gltf',

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale as [number, number, number]);
                    root.rotation.set(...rotation as [number, number, number]);
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

        loadModel();
    
        // set up the lighting
        // add a spot light
        const spotLight = new THREE.SpotLight(0xcfcfcf, 0.25);
        spotLight.position.set(0, 0, 15);
        scene.add(spotLight);

        const backSpotLight = new THREE.SpotLight(0xcfcfcf, 0.25);
        backSpotLight.position.set(0, 0, -15);
        scene.add(backSpotLight);
        
        // setup rectAreaLights
        const topRectAreaLight = new THREE.RectAreaLight(0xffffff, 1.5, 15, 15);
        topRectAreaLight.position.set(0, 0.5, 0);
        topRectAreaLight.lookAt(0, 0, 0);
        topRectAreaLight.name = "topRectAreaLight";
        scene.add(topRectAreaLight);

        const bottomRectAreaLight = new THREE.RectAreaLight(0xffffff, 0.5, 15, 15);
        bottomRectAreaLight.position.set(0, -0.5, 0);
        bottomRectAreaLight.lookAt(0, 0, 0);
        bottomRectAreaLight.name = "bottomRectAreaLight";
        scene.add(bottomRectAreaLight);
        
        // update the renderer on resize
        window.addEventListener('resize', () => {
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        // animate the scene
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    });
</script>

<template>
    <div class="three__container">
    </div>
</template>

<style scoped>
    .three__container{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
</style>