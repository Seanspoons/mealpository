export class RecipeIngredient {
    
    quantity: number;
    unit: string;
    recipe_id: string;
    ingredient_id: string;
    

    constructor (
        quantity: number,
        unit: string,
        recipe_id: string,
        ingredient_id: string,
    ) {
        this.quantity = quantity;
        this.unit = unit;
        this.recipe_id = recipe_id;
        this.ingredient_id = ingredient_id;
    }

}