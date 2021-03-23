import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDataComponent } from './open-data.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "../shared/material.module";
import { FormsModule } from "@angular/forms";
import {OpenDataService} from "../core/services/open-data.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFileUploaderModule } from 'angular-file-uploader';

describe('OpenDataComponent', () => {
  let component: OpenDataComponent;
  let fixture: ComponentFixture<OpenDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [OpenDataService],
      imports: [
        RouterTestingModule.withRoutes([]),
        MaterialModule,
        FormsModule,
        AngularFileUploaderModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [OpenDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should equal snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
