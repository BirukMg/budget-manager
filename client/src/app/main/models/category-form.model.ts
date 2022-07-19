import { BudgetType } from "./budget-type.enum";

export interface CategoryFrom {
    id?: string;
    name: string;
    icon: string;
    type: BudgetType;
}