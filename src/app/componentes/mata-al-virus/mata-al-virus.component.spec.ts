import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MataAlVirusComponent } from './mata-al-virus.component';

describe('MataAlVirusComponent', () => {
  let component: MataAlVirusComponent;
  let fixture: ComponentFixture<MataAlVirusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MataAlVirusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MataAlVirusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
