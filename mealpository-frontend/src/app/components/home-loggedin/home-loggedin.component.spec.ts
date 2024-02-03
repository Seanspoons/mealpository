import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoggedinComponent } from './home-loggedin.component';

describe('HomeLoggedinComponent', () => {
  let component: HomeLoggedinComponent;
  let fixture: ComponentFixture<HomeLoggedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLoggedinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
