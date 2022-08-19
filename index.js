import {
  WebGLRenderer,
  sRGBEncoding,
  ACESFilmicToneMapping,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  GridHelper,
} from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Controllers from './Controllers';

const { innerWidth, innerHeight } = window;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(2);
renderer.xr.enabled = true;
renderer.xr.setFramebufferScaleFactor(2);
renderer.outputEncoding = sRGBEncoding;
renderer.toneMapping = ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const camera = new PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 10);
camera.position.set(0, 1.3, 3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.enableDamping = true;

const scene = new Scene();

const light = new AmbientLight(0xffffff, 1.2);
scene.add(light);

const floor = new GridHelper(4, 4);
scene.add(floor);

const controllers = new Controllers(renderer);
scene.add(controllers);

const onResize = () => {
  const { innerWidth, innerHeight } = window;

  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', onResize);

renderer.setAnimationLoop(() => {
  const session = renderer.xr.getSession();

  if (session?.inputSources) {
    session.inputSources.forEach(source => {
      const handedness = source.handedness;
      const axes = source.gamepad.axes.slice(0);

      axes.forEach((axis, index) => {
        if (index === 2 && handedness === 'left') {
          // left and right axis on left thumbstick
        }

        if (index === 3 && handedness === 'right') {
          // up and down axis on right thumbstick
        }
      });
    });
  }

  controls.update();

  renderer.render(scene, camera);
});
