import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMetaverseComponent } from './view-metaverse.component';

describe('ViewMetaverseComponent', () => {
  let component: ViewMetaverseComponent;
  let fixture: ComponentFixture<ViewMetaverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMetaverseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMetaverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
