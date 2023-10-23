import * as THREE from "../node_modules/three/build/three.module.js";

const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const scene = new THREE.Scene();

const boxWidth = 1.5;
const boxHeight = 0.5;
const boxDepth = 2;
const widthSegments = 4;
const heightSegments = 4;
const depthSegments = 4;
const cubeGeometery = new THREE.BoxGeometry(
  boxWidth,
  boxHeight,
  boxDepth,
  widthSegments,
  heightSegments,
  depthSegments
);

const radius = .5;
const height = 2;
const radialSegments = 16;
const coneGeometry = new THREE.ConeGeometry( radius, height, radialSegments );

const color = 0xffffff;
const intensity = 2;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-2, 2, 4);

scene.add(light);

const sphereRadius = 1;
const sphereWidthSegments = 40;
const sphereHeightSegments = 40;
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereWidthSegments, sphereHeightSegments);
const material = new THREE.PointsMaterial({
    color: 'red',
    size: 0.01,     // in world units
});
const points = new THREE.Points(sphereGeometry, material);
scene.add(points);

const shapes = [
  createInstance(cubeGeometery, 0x44aa88, -3),
  createInstance(coneGeometry, 0x8844aa, 3),
];

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function createInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  shape.position.x = x;
  shape.rotation.x = .3;

  return shape;
}

function render(time) {
  time *= 0.0006;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  shapes.forEach((shape, ndx) => {
    const speed = 1 + ndx * 0.1;
    const rot = time * speed;

    shape.rotation.y = rot;
  });

  points.rotation.y += .01;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
