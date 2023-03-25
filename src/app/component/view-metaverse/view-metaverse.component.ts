import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SceneService } from 'src/app/service/scene.service';
import { Euler, Vector3 } from 'three';

@Component({
  selector: 'app-view-metaverse',
  templateUrl: './view-metaverse.component.html',
  styleUrls: ['./view-metaverse.component.scss']
})
export class ViewMetaverseComponent implements OnInit, AfterViewInit {
  @ViewChild('container')
  set container(container: ElementRef) {
    if (!this.sceneService.scene) {
      this.sceneService.initialize(container.nativeElement);
    }
  }
  modelData = [
    {
      "id": "kuka",
      "name": "Kuka Robot",
      "position": { "x": 2.5391923523937576, "y": 0, "z": 0 },
      "scale": { "x": 0.01, "y": 0.01, "z": 0.01 },
      "rotation": { "x": -1.5707963267948963, "y": 0, "z": 0 }
    },
    {
      "id": "plane",
      "name": "Plane",
      "position": { "x": 0.012838000420733131, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "rotation": { "x": 1.5707963267948966, "y": 0, "z": 0 }
    },
    {
      "id": "kuka",
      "name": "Kuka Robot",
      "position": { "x": -2.0360265965806397, "y": 0, "z": 0 },
      "scale": { "x": 0.01, "y": 0.01, "z": 0.01 },
      "rotation": { "x": -1.5707963267948963, "y": 0, "z": 0 }
    }
  ]

  constructor(@Inject(SceneService) private sceneService: SceneService, private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.generateModel();
  }

  generateModel() {
    this.modelData.map(x => {
      switch (x.id) {
        case "kuka": {
          this.sceneService.createModels("assets/kuka.glb", new Vector3(x.position.x, x.position.y, x.position.z), new Vector3(x.scale.x, x.scale.y, x.scale.z), "Kuka Robot", "kuka").then(model => {
            // this.models.push(model as Object3D);
            this.sceneService.transformControls.detach();
            // this.sceneService.gridHelper.remove();
            this.sceneService.orbitControls.enabled = true;
          }).catch(err => {
            console.log(err);
          })
        }; break;

        case "plane": {
          const model = this.sceneService.createPlane(new Vector3(x.position.x, x.position.y, x.position.z), new Euler(x.rotation.x, x.rotation.y, x.rotation.z), new Vector3(x.scale.x, x.scale.y, x.scale.z));
          // this.models.push(this.model as Object3D);
          this.sceneService.transformControls.detach();
          // this.sceneService.gridHelper.remove();
          this.sceneService.orbitControls.enabled = true;
          console.log(this.sceneService.scene)
          break;
        }

        default: break;
      }
    })
  }

}
