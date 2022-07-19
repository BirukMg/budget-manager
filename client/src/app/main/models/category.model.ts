import { BudgetType } from "./budget-type.enum";

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: BudgetType;
  created_at: string;
  updated_at: string;
  user_id: string;
}
