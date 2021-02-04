import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateFriendPage } from './rate-friend.page';

describe('RateFriendPage', () => {
  let component: RateFriendPage;
  let fixture: ComponentFixture<RateFriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateFriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
