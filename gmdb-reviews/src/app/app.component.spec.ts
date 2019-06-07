    import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
      ],
      providers: [HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movies'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Movies');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Movies');
  });

  it('should have a search form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should require query to submit form', () => {
    const searchForm = component.searchForm.controls;
    searchForm.query.setValue('Avengers');
    expect(searchForm.query.value).toEqual('Avengers');
  });

  it('should validate form to be false', () => {
    const searchForm = component.searchForm;
    expect(searchForm.valid).toBeFalsy();
  });

  it('should validate form to be true', () => {
    const searchForm = component.searchForm;
    searchForm.controls.query.setValue('Avengers')
    expect(searchForm.valid).toBeTruthy();
  });
});
