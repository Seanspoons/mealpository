export class Ingredient {
    
    ingredient_id: string;
    name: string;
    category: string;
    

    constructor (
        ingredient_id: string,
        name: string,
        category: string

    ) {
        this.ingredient_id = ingredient_id;
        this.name = name;
        this.category = category;
    }

}