import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { SceneService } from 'src/app/service/scene.service';
import { Object3D, Vector3 } from 'three';

@Component({
  selector: 'app-create-metaverse',
  templateUrl: './create-metaverse.component.html',
  styleUrls: ['./create-metaverse.component.scss']
})
export class CreateMetaverseComponent {
  @ViewChild('container')
  set container(container: ElementRef) {
    if (!this.sceneService.scene) {
      this.sceneService.initialize(container.nativeElement);
    }
  }
  models: Object3D[] = [];
  model: Object3D;

  assetModels = [{ name: "Kuka Robot", id: "kuka" }, { name: "Plane", id: "plane" },
  { name: "Roller Conveyor", id: "conveyor" },
  { name: "Curved Roller Conveyor", id: "conveyor2" },
  { name: "Belt Conveyor", id: "motor-conveyor" }
  ];

  constructor(@Inject(SceneService) private sceneService: SceneService, private renderer: Renderer2) { }


  ngOnInit(): void {
    // this.sceneService.createModels("assets/factory.glb", new Vector3(0,0,0), new Vector3(0.01,0.01,0.01));
    // this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01));
  }

  ngAfterViewInit(): void {
    this.renderer.listen(window, 'mousewheel', (event) => {
      const isZommed = event.deltaY < 0;
      if (event.target.parentNode == this.sceneService.container) {
        // this.sceneService.camera.zoom += 1;
        // this.sceneService.camera.updateProjectionMatrix();
        // this.sceneService.transformControls.updateMatrix();

        this.sceneService.orbitControls.enabled = true;
        if (isZommed) {
          window.dispatchEvent(new Event("scroll"));
          window.dispatchEvent(new Event("custom-zoom-in"));
        } else {
          window.dispatchEvent(new Event("scroll"));
          window.dispatchEvent(new Event("custom-zoom-out"));
        }
        event.stopPropagation();
      }
    });

    this.renderer.listen(window, 'custom-zoom-in', (event) => {
      setTimeout(() => {
        this.sceneService.orbitControls.enabled = false;
      }, 100);

    });

    this.renderer.listen(window, 'custom-zoom-out', (event) => {
      setTimeout(() => {
        this.sceneService.orbitControls.enabled = false;
      }, 100);
    });
  }


  selectAsset(id: string) {
    this.transformControlsModeListener('t');
    switch (id) {
      case "kuka": {
        this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01), "Kuka Robot", "kuka").then(model => {
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

      case "conveyor": {
        this.sceneService.createModels("assets/conveyor.glb", new Vector3(0, 0, 0), new Vector3(1, 1, 1), "Roller Conveyor", "conveyor").then(model => {
          this.model = model as Object3D;
          this.models.push(model as Object3D);
        }).catch(err => {
          console.log(err);
        })
      }; break;

      case "conveyor2": {
        this.sceneService.createModels("assets/conveyor2.glb", new Vector3(0, 0, 0), new Vector3(1, 1, 1), "Curved Roller Conveyor", "conveyor2").then(model => {
          this.model = model as Object3D;
          this.models.push(model as Object3D);
        }).catch(err => {
          console.log(err);
        })
      }; break;

      case "motor-conveyor": {
        this.sceneService.createModels("assets/factory_conveyer.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01), "Belt Conveyor", "motor-conveyor").then(model => {
          this.model = model as Object3D;
          this.models.push(model as Object3D);
        }).catch(err => {
          console.log(err);
        })
      }; break;

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

  }


  selectModel(item: Object3D) {
    this.model = item;
    this.sceneService.setTransformControl(this.model);
    this.transformControlsModeListener('t');
  }

  saveMapping() {
    const models = this.models.map((x: Object3D) => {
      const rotation = { x: x.rotation.x, y: x.rotation.y, z: x.rotation.z }
      const data = { id: x.userData['id'], name: x.userData['name'], position: x.position, scale: x.scale, rotation: rotation };
      return data;
    });
    console.log(models)
  }


  deleteModel(model: Object3D) {
    // this.sceneService.transformControls.removeFromParent();
    // model.removeFromParent();
  }


}
