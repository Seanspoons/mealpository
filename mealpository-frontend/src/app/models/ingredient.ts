export class Ingredient {
    
    ingredient_id: string;
    name: string;
    quantity: number;
    unit: string;
    category: string;
    recipe_id: string;
    

    constructor (
        ingredient_id: string,
        name: string,
        quantity: number,
        unit: string,
        category: string,
        recipe_id: string

    ) {
        this.ingredient_id = ingredient_id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.category = category;
        this.recipe_id = recipe_id;
    }

}