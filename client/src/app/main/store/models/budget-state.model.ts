import { EntityState } from "@ngrx/entity";
import { Budget } from "../../models/budget.model";

export interface BudgetState extends EntityState<Budget> {
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  deletingIds: string[];
}
