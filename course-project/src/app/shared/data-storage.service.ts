import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private readonly baseUrl =
    'https://ng-course-recipe-book-pf-default-rtdb.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.baseUrl + 'recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.baseUrl + 'recipes.json', {
          params: new HttpParams().set('auth', user?.token!),
        });
      }),
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
