import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private readonly baseUrl =
    'https://ng-course-recipe-book-pf-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.baseUrl + 'recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json').pipe(
      map((recipes) =>
        recipes.map((r) => ({
          ...r,
          ingredients: r.ingredients ? r.ingredients : [],
        }))
      ),
      tap((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
