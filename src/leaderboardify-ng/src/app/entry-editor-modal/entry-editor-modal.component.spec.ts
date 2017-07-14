import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryEditorModalComponent } from './entry-editor-modal.component';

describe('EntryEditorModalComponent', () => {
  let component: EntryEditorModalComponent;
  let fixture: ComponentFixture<EntryEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
