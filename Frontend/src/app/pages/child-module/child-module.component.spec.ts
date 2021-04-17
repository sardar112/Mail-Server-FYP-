import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildModuleComponent } from './child-module.component';

describe('ChildModuleComponent', () => {
  let component: ChildModuleComponent;
  let fixture: ComponentFixture<ChildModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
