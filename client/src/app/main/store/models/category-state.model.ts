import { EntityState } from "@ngrx/entity";
import { Category } from "../../models/category.model";

export interface CategoryState extends EntityState<Category> {
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  deletingIds: string[];
}
