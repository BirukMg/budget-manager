import { BudgetType } from "./budget-type.enum";

export interface BudgetForm {
    id?: string;
    category_id: string;
    bank_id: string;
    amount: string;
    remark: string;
    type: BudgetType;
}