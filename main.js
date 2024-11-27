import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


function init() {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth - 2, window.innerHeight - 108);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0, 2, 8);
  camera.lookAt(scene.position);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;

  const pointlight = new THREE.PointLight(0xffffff, 1);
  pointlight.position.set(200, 200, 200);
  scene.add(pointlight);


  // Add a grid helper for debugging
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00853C } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(0,Math.random(),0)
  scene.add( cube );  

  const geometry2 = new THREE.SphereGeometry(1,32,16); 
  const sphere = new THREE.Mesh( geometry2, material ); 
  sphere.position.set((Math.random() < 0.5 ? -1 : 1) * 5 ,Math.random(),(Math.random() < 0.5 ? -1 : 1) * 5)
  scene.add( sphere );  

  const knotgeometry = new THREE.TorusKnotGeometry( 0.5, 0.2, 100, 16 ); 
  const torusKnot = new THREE.Mesh( knotgeometry, material );
  torusKnot.position.set((Math.random() < 0.5 ? -1 : 1) * 2 ,Math.random(),(Math.random() < 0.5 ? -1 : 1) * 2)
  scene.add( torusKnot );

  const icosageo = new THREE.IcosahedronGeometry()
  const icosaMesh = new THREE.Mesh( icosageo, material ); 
  icosaMesh.position.set((Math.random() < 0.5 ? -1 : 1) * 6 ,Math.random(),(Math.random() < 0.5 ? -1 : 1) * 6)
  scene.add( icosaMesh );


  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

init();
