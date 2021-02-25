import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from '../core/services/recipe-api.service';
import { Observable } from 'rxjs';

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
}
