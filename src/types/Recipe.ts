export interface Recipe {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  recipeImages?: string[];
}