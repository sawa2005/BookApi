import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBook } from './edit-book';

describe('EditBook', () => {
  let component: EditBook;
  let fixture: ComponentFixture<EditBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
