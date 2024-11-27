import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function init() {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(scene.position);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const pointlight = new THREE.PointLight(0xffffff, 1);
  pointlight.position.set(200, 200, 200);
  scene.add(pointlight);

  const loader = new GLTFLoader();
  loader.load(
    'chromakopia_demo/container.glb',
    function (gltf) {
      console.log('Model loaded:', gltf.scene);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(1, 1, 1); // Adjust scale if necessary
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error('Error loading model:', error);
    }
  );

  // Add a grid helper for debugging
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // Add a test cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(2, 2, 0);
  scene.add(cube);

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}

init();
