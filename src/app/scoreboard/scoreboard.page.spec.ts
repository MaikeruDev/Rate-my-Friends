import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScoreboardPage } from './scoreboard.page';

describe('ScoreboardPage', () => {
  let component: ScoreboardPage;
  let fixture: ComponentFixture<ScoreboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
