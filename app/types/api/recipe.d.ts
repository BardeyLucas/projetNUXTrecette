type Recipe = {
  recipe_id: number;
  title: string;
  description: string;
  image_url: string;
  cuisine_name: Cuisine['name'];
  goal_name: string;
  diet_name: string;
  allergy_name: string;
}

type FullRecipe = Recipe & {
  instructions: {
    instruction_id: number;
    step_number: number;
    description: string;
  }[];
  ingredients: {
    ingredient_id: number;
    name: string;
    unit: string;
    quantity: string;
  }[];
}