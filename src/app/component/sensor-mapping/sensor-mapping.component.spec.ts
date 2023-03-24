import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorMappingComponent } from './sensor-mapping.component';

describe('SensorMappingComponent', () => {
  let component: SensorMappingComponent;
  let fixture: ComponentFixture<SensorMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
