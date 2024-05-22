class Instruction:
    def __init__(self, 
                 instruction_id, number, instruction, recipe_id
                ):
        self.instruction_id = instruction_id
        self.number = number
        self.instruction = instruction
        self.recipe_id = recipe_id

    def serialize_self(self):
        return {
            'instruction_id': self.instruction_id,
            'number': self.number,
            'instruction': self.instruction,
            'recipe_id': self.recipe_id

        }