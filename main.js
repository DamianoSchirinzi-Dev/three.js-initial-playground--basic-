import * as THREE from "../node_modules/three/build/three.module.js"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometery = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometery, material);
scene.add(cube);
cube.position.x = -2;

const geometery2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: 0xFF0000});
const cube2 = new THREE.Mesh(geometery2, material2);
scene.add(cube2);
cube2.position.y  += 2;

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.position.x += 0.01;
    cube2.rotation.x -= 0.01;
    cube2.rotation.y -= 0.01;

    renderer.render(scene, camera);
}

animate();
