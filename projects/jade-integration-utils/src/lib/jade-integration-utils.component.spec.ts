import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadeIntegrationUtilsComponent } from './jade-integration-utils.component';

describe('JadeIntegrationUtilsComponent', () => {
  let component: JadeIntegrationUtilsComponent;
  let fixture: ComponentFixture<JadeIntegrationUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadeIntegrationUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadeIntegrationUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
