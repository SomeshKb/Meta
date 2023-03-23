import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { SceneService } from 'src/app/service/scene.service';
import { Object3D, Raycaster, Vector2, Vector3 } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('container')
  set container(container: ElementRef) {
    this.sceneService.initialize(container.nativeElement);
  }

  model: Object3D;
  assetModels = [{ name: "Kuka Robot", id: "kuka" }, { name: "Plane", id: "plane" }];

  transformControls : TransformControls;

  constructor(@Inject(SceneService) private sceneService: SceneService) { }

  ngOnInit(): void {
    // this.sceneService.createModels("assets/factory.glb", new Vector3(0,0,0), new Vector3(0.01,0.01,0.01));
    // this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01));
  }

  selectAsset(id: string) {
    switch (id) {
      case "kuka": {
        this.sceneService.createModels("assets/kuka.glb", new Vector3(0, 0, 0), new Vector3(0.01, 0.01, 0.01)).then(model => {
          this.model = model as Object3D;
          console.log(this.model.scale)
        }).catch(err => {
          console.log(err);
        })
      }; break;

      case "plane" : this.model = this.sceneService.createPlane(); break;

      default : break;
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
          break;  
        default:  
          return;  
      }  
    }


    sceneClicked(event: MouseEvent) {
        const model  = this.getClickedModel(event, this.sceneService.camera, this.sceneService.scene);
        console.log(model);
    }


    getClickedModel(event: MouseEvent, camera: THREE.Camera, scene: THREE.Scene): THREE.Object3D | null {  
      const raycaster = new Raycaster();  
      const mouse = new Vector2();  
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;  
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;  
      raycaster.setFromCamera(mouse, camera);  
      const intersects = raycaster.intersectObjects(scene.children, true);  
      for (let i = 0; i < intersects.length; i++) {  
        let object = null;  
        while (object && object.parent !== scene && object.type == "Mesh") {  
          object = object.parent as Object3D;  
        }  
        if (object) {  
          return object;  
        }  
      }  
      return null;  
    }  

}
