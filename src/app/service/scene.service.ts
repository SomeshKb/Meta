import { Injectable } from '@angular/core';
import {
  AmbientLight,
  AnimationMixer,
  Clock,
  Color,
  EquirectangularReflectionMapping,
  HemisphereLight,
  LoadingManager,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Texture,
  Vector3,
  WebGLRenderer,
} from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

@Injectable()
export class SceneService {
  aspect!: number;
  camera!: PerspectiveCamera;
  container!: HTMLElement;
  controls!: OrbitControls;
  hemisphere!: HemisphereLight;
  loader!: GLTFLoader;
  mainLight!: AmbientLight;
  scene!: Scene;

  deltaX = 0.01;
  deltaY = 0.01;
  deltaZ = 0.01;
  far = 100;
  fov = 35;
  gammaFactor = 2.2;
  gammaOutput = true;
  near = 1;
  physicallyCorrectLights = true;
  sceneBackground = 0x8fbcd4;
  renderer = new WebGLRenderer({ antialias: true });

  clock = new Clock();
  mixers = new Array<AnimationMixer>();

  modelPosition = new Vector3(0, -1, 0);
  modelScale = new Vector3(0.01, 0.01, 0.01);

  loadingManager: LoadingManager = new LoadingManager();

  directionalLightOptions = {
    color: 0xece1bc,
    intensity: 20,
  };

  hemisphereOptions = {
    skyColor: 0xffeeb1,
    groundColor: 0x08020,
    intensity: 4,
  };

  // CAMERA

  private createCamera = () => {
    this.camera = new PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );

    // this.camera.position.set(-75, 35, 142);
    this.camera.position.set(7, 4, 9.5);
  };

  // CONTROLS

  private createControls = () =>
    (this.controls = new OrbitControls(this.camera, this.container));

  // LIGHTING

  private createLight = () => {
    this.hemisphere = new HemisphereLight(
      this.hemisphereOptions.skyColor,
      this.hemisphereOptions.groundColor,
      this.hemisphereOptions.intensity
    );

    this.mainLight = new AmbientLight(
      this.directionalLightOptions.color,
      this.directionalLightOptions.intensity,
    );
    this.mainLight.position.set(-7, -4, -9.5);


    this.scene.add(this.hemisphere);
  };

  // GEOMETRY

  public createModels = (modelPath: string, modelPosition: Vector3, modelScale: Vector3) => {
    this.loader = new GLTFLoader(this.loadingManager);
    const loadModel = (gltf: GLTF) => {
      const model = gltf.scene.children[0];
      model.position.copy(modelPosition);
      model.scale.copy(modelScale);

      const animation = gltf.animations[0];

      if (animation) {
        const mixer = new AnimationMixer(model);
        this.mixers.push(mixer);

        const action = mixer.clipAction(animation);
        action.play();
      }
      this.scene.add(model);
      console.log(this.scene)
    };

    this.loader.load(
      modelPath,
      (gltf) => {
        loadModel(gltf);
      },
      () => { },
      (err) => console.log(err)
    );
  };

  // RENDERER

  private onWindowResize = () => {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer &&
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
  };

  private createRenderer = () => {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // this.renderer.gammaFactor = this.gammaFactor;
    // this.renderer.gammaOutput = true;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;


    this.container.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onWindowResize);
  };

  // INITIALIZATION

  private update = () => {
    const delta = this.clock.getDelta();
    this.mixers.forEach((x) => x.update(delta));
  };

  private render = () => this.renderer.render(this.scene, this.camera);

  start = () =>
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.render();
    });

  stop = () => this.renderer.setAnimationLoop(() => { });

  initialize = (container: HTMLElement) => {
    this.container = container;
    this.scene = new Scene();
    this.scene.background = new Color(this.sceneBackground);
    this.aspect = container.clientWidth / container.clientHeight;

    this.createCamera();
    this.createControls();
    this.createLight();

    this.initializeLoadingManager();
    this.createRenderer();
    this.setEnviromentLighting().then((texture: any) => {
      this.scene.environment = texture;
    })
    this.start();
  };


  setEnviromentLighting() {
    return new Promise((resolve, reject) => {
      new RGBELoader(this.loadingManager).load('./assets/hdr/venice_sunset.hdr', (texture: Texture) => {
        texture.mapping = EquirectangularReflectionMapping;
        resolve(texture);
      }
      )
    });

  }

  initializeLoadingManager() {
    this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {

      const loadingElement = this.container?.parentElement?.lastChild as HTMLElement;
      loadingElement.classList.remove('fade-out');
    };

    this.loadingManager.onLoad = () => {

      const loadingElement = this.container?.parentElement?.lastChild as HTMLElement;
      loadingElement.classList.add('fade-out');
    };


    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {

      const loadingElement: HTMLElement = this.container?.parentElement?.lastChild as HTMLElement;
      const loadingTextDiv = loadingElement?.lastChild as HTMLElement;
      loadingTextDiv.innerText = Math.round(itemsLoaded / itemsTotal * 100,) + '%';
    };

    this.loadingManager.onError = (url) => {

      console.log('There was an error loading ' + url);
    };
  }



}