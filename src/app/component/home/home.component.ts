import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SceneService } from 'src/app/service/scene.service';
import { Object3D, Vector3 } from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('container')
  set container(container: ElementRef) {
    if (!this.sceneService.scene) {
      this.sceneService.initialize(container.nativeElement);
    }
  }


  models: Object3D[] = [];

  model: Object3D;
  assetModels = [{ name: "Kuka Robot", id: "kuka" }, { name: "Plane", id: "plane" }];

  constructor(@Inject(SceneService) private sceneService: SceneService) { }

  ngOnInit(): void {
    // this.sceneService.createModels("assets/factory.glb", new Vector3(0,0,0), new Vector3(0.01,0.01,0.01));
    // this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01));
  }

  selectAsset(id: string) {
    this.transformControlsModeListener('t');
    switch (id) {
      case "kuka": {
        this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01)).then(model => {
          this.model = model as Object3D;
            this.models.push(model as Object3D);
        }).catch(err => {
          console.log(err);
        })
      }; break;

      case "plane": {
        this.model = this.sceneService.createPlane();
        this.models.push(this.model as Object3D);
        break;
      }

      default: break;
    }


  }

  transformControlsModeListener(mode: string) {
    switch (mode) {
      case 't':
        this.sceneService.transformControls.mode = 'translate';
        break;
      case 'r':
        this.sceneService.transformControls.mode = 'rotate';
        break;
      case 's':
        this.sceneService.transformControls.mode = 'scale';
        break;
      case 'Enter':
        // Stop listening for key strokes  
        this.sceneService.transformControls.detach();
        break;
      default:
        return;
    }
  }


  sceneClicked(event: MouseEvent) {
    // const model = this.getClickedModel(event, this.sceneService.camera, this.sceneService.scene, this.sceneService.transformControls);
    // console.log(model);
    console.log(this.model)
  }

  selectModel(item: Object3D) {
    this.model = item;
    this.sceneService.setTransformControl(this.model);
    this.transformControlsModeListener('t');
  }
  

  // getClickedModel(event: MouseEvent, camera: PerspectiveCamera, scene: THREE.Scene, transformControls: TransformControls | null): THREE.Object3D | null {
  //   // Remove TransformControls from the scene if it exists  
  //   if (transformControls && transformControls.parent === scene) {
  //     scene.remove(transformControls);
  //   }

  //   // Perform raycasting  
  //   const raycaster = new Raycaster();
  //   const mouse = new Vector2();
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  //   raycaster.setFromCamera(mouse, camera);

  //   // raycaster.far = camera.far * 100000;
  //   camera.far = camera.far * 10000;
  //   camera.updateProjectionMatrix();

  //   const intersects = raycaster.intersectObjects(scene.children, true);

  //   // Reset the camera's far property  
  //   camera.far = camera.far / 10000;
  //   camera.updateProjectionMatrix();
  //   if (transformControls && transformControls.parent !== scene) {
  //     scene.add(transformControls);
  //   }

  //   // Loop through intersected objects and find the top-level parent  
  //   for (let i = 0; i < intersects.length; i++) {
  //     let object = intersects[i].object;
  //     while (object && object.parent !== scene) {
  //       object = this.getParent(object.parent, scene) as Object3D;
  //     }
  //     if (object) {
  //       return object;
  //     }
  //   }

  //   return null;
  // }

  // getParent(object: any, scene: THREE.Scene): any {
  //   if (object.parent && object.parent !== scene) {
  //     return this.getParent(object.parent, scene);
  //   } else {
  //     return object;
  //   }
  // }

}
