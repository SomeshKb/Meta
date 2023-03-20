import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // Three.js variables  
    private renderer: THREE.WebGLRenderer;  
    private camera: THREE.PerspectiveCamera;  
    private scene: THREE.Scene;  
    private floor: THREE.Mesh;  
    private machines: THREE.Mesh[];  
    
    ngOnInit(): void {  
      // Create the Three.js scene  
      this.createScene();  
    
      // Add objects to the scene  
      this.createFloor();  
      this.createMachines();  
    
      // Bind event listeners  
      document.addEventListener('keydown', (event) => this.onKeyDown(event));  
    
      // Render the scene  
      this.render();  
    }  
    
    createScene(): void {  
      // Initialize the Three.js renderer  
      this.renderer = new THREE.WebGLRenderer();  
      this.renderer.setSize(window.innerWidth, window.innerHeight);  
      document.body.appendChild(this.renderer.domElement);  
    
      // Create the Three.js camera  
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
      this.camera.position.set(0, 10, 20);  
    
      // Create the Three.js scene  
      this.scene = new THREE.Scene();  
      this.scene.background = new THREE.Color(0xf0f0f0);  
    }  
    
    createFloor(): void {  
      // Create the floor geometry  
      const floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);  
      const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });  
      this.floor = new THREE.Mesh(floorGeometry, floorMaterial);  
    
      // Rotate the floor to be horizontal  
      this.floor.rotation.x = -Math.PI / 2;  
    
      // Add the floor to the scene  
      this.scene.add(this.floor);  
    }  
    
    createMachines(): void {  
      // Create the machine geometry  
      const machineGeometry = new THREE.BoxGeometry(2, 2, 2);  
      const machineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  
      this.machines = [];  
    
      // Create two rows of machines  
      for (let i = 0; i < 2; i++) {  
        for (let j = 0; j < 5; j++) {  
          const machine = new THREE.Mesh(machineGeometry, machineMaterial);  
    
          // Position the machine on the factory floor  
          machine.position.x = (j - 2) * 6;  
          machine.position.y = 1;  
          machine.position.z = (i - 0.5) * 8;  
    
          // Add the machine to the scene  
          this.scene.add(machine);  
          this.machines.push(machine);  
        }  
      }  
    }  
    
    onKeyDown(event: KeyboardEvent): void {  
      switch (event.keyCode) {  
        case 37: // Left arrow  
          this.camera.position.x -= 1;  
          break;  
        case 38: // Up arrow  
          this.camera.position.z -= 1;  
          break;  
        case 39: // Right arrow  
          this.camera.position.x += 1;  
          break;  
        case 40: // Down arrow  
          this.camera.position.z += 1;  
          break;  
      }  
    }  
    
    render(): void {  
      // Render the scene  
      this.renderer.render(this.scene, this.camera);  
    
      // Call the render function again  
      requestAnimationFrame(() => this.render());  
    }  
  }  