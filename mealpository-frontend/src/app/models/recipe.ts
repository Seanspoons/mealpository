import { Ingredient } from "./ingredient";
import { Instruction } from "./instruction";

export class Recipe {
    
    recipe_id: string;
    title: string;
    description: string;
    servings: string;
    prep_time: string;
    cook_time: string;
    total_time: string;
    image_url: string;
    user_id: string;
    ingredients: Ingredient[];
    instructions: Instruction[];

    constructor (
        recipe_id: string,
        title: string,
        description: string,
        servings: string,
        prep_time: string,
        cook_time: string,
        total_time: string,
        image_url: string,
        user_id: string,
        ingredients: Ingredient[],
        instructions: Instruction[]
    ) {
        this.recipe_id = recipe_id;
        this.title = title;
        this.description = description;
        this.servings = servings;
        this.prep_time = prep_time;
        this.cook_time = cook_time;
        this.total_time = total_time;
        this.image_url = image_url;
        this.user_id = user_id;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }

}