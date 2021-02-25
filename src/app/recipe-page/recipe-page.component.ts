import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from '../core/services/recipe-api.service';
import { Observable } from 'rxjs';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  recipes$: Observable<any>;
  selectedOptions = [];

  constructor(private recipeService: RecipeApiService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.list();
  }

  downloadRecipes(): void {
    if (this.selectedOptions.length > 0) {
      this.recipeService.download(this.selectedOptions).pipe(
        untilDestroyed(this),
      ).subscribe(data => {
        const fileURL = window.URL.createObjectURL(data);
        window.open(fileURL);
      });
    }
  }
}
