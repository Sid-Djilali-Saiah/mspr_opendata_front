import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePageComponent } from './recipe-page.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../shared/material.module";
import { FormsModule } from "@angular/forms";
import {RecipeApiService} from "../core/services/recipe-api.service";

describe('RecipePageComponent', () => {
  let component: RecipePageComponent;
  let fixture: ComponentFixture<RecipePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RecipeApiService],
      imports: [
        RouterTestingModule.withRoutes([]),
        MaterialModule,
        FormsModule,
      ],
      declarations: [RecipePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
