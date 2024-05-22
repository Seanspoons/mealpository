export class Instruction {
    
    instruction_id: string;
    number: string;
    instruction: string;
    recipe_id: string;
    

    constructor (
        instruction_id: string,
        number: string,
        instruction: string,
        recipe_id: string

    ) {
        this.instruction_id = instruction_id;
        this.number = number;
        this.instruction = instruction;
        this.recipe_id = recipe_id;
    }

}