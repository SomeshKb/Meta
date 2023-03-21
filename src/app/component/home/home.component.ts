import { Component, ElementRef, Inject, OnInit, ViewChild  } from '@angular/core';
import { SceneService } from 'src/app/service/scene.service';
import * as THREE from 'three';
import { Vector3 } from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('container')
  set container(container: ElementRef) {
    this.scene.initialize(container.nativeElement);
  }

  constructor(@Inject(SceneService) private scene: SceneService,
  ) {
  }

  ngOnInit(): void {

    console.log(this.scene)
    this.scene.createModels("assets/factory.glb", new Vector3(0,0,0), new Vector3(0.01,0.01,0.01));
    this.scene.createModels("assets/kuka.glb", new Vector3(5,0,0), new Vector3(0.01,0.01,0.01));

  }


}