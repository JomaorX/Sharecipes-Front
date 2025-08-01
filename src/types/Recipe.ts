import type { User } from "./User";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  recipeImages?: string[];

  user?: User;
}