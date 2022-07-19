import { Bank } from "./bank.model";
import { BudgetType } from "./budget-type.enum";
import { Category } from "./category.model";

export interface Budget {
    id: string;
    amount: number;
    remark: string;
    type: BudgetType;
    created_at: string;
    updated_at: string;
    user_id: string;
    bank: Bank;
    category: Category;
    bank_id: string;
    category_id: string; 
}