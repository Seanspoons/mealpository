import { IDGenerator } from './id_generator';

class Recipe {
    
    recipe_id: string;
    title: string;
    description: string;
    servings: string;
    prep_time: string;
    cook_time: string;
    total_time: string;
    image_url: string;
    recipe_pdf_url: string;
    user_id: string;
    idGenerator: IDGenerator = new IDGenerator();

    constructor (
        title: string,
        description: string,
        servings: string,
        prep_time: string,
        cook_time: string,
        total_time: string,
        image_url: string,
        recipe_pdf_url: string,
        user_id: string
    ) {
        this.recipe_id = this.idGenerator.generateId();
        this.title = title;
        this.description = description;
        this.servings = servings;
        this.prep_time = prep_time;
        this.cook_time = cook_time;
        this.total_time = total_time;
        this.image_url = image_url;
        this.recipe_pdf_url = recipe_pdf_url;
        this.user_id = user_id;
    }

}