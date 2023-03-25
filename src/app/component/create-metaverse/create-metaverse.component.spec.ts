import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetaverseComponent } from './create-metaverse.component';

describe('CreateMetaverseComponent', () => {
  let component: CreateMetaverseComponent;
  let fixture: ComponentFixture<CreateMetaverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMetaverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMetaverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
