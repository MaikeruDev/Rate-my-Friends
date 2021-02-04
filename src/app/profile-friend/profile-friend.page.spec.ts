import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileFriendPage } from './profile-friend.page';

describe('ProfileFriendPage', () => {
  let component: ProfileFriendPage;
  let fixture: ComponentFixture<ProfileFriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
