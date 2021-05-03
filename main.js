import * as THREE from './lib/three.module.js';
import { GLTFLoader } from './lib/GLTFLoader.js';

window.addEventListener('DOMContentLoaded', DOMContentLoaded => {

    //INIT
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
    renderer.updateShadowMap.enabled = true;
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    const camera = new THREE.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x88CCFF);
    scene.fog = new THREE.FogExp2(scene.background, 0.15);

    //Light
    const dir_light = new THREE.DirectionalLight(0xFFFFFF, 1);
    dir_light.getWorldPosition.set(3, 4, 5);
    dir_light.castShadow = true;
    scene.add(dir_light);
    const hemilight = new THREE.HemisphereLight(0xFFFFFF, 0.5);
    scene.add(hemilight);

    //Bringing in the model baby
    const loader = new GLTFLoader();
    loader.load('./model/3D_Environment_V5.glb', gltf => {
        scene.add(gltf.scene);

        window.requestAnimationFrame(animation);
    });

    //Animate
    const animation = timestamp => {

        //Renderer
        renderer.render(scene, camera);
        window.requestAnimationFrame(animation);
    };
});