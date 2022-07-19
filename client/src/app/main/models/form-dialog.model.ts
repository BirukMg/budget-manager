import { BudgetType } from "./budget-type.enum";

export interface FormDialogModel {
    type: BudgetType,
    data: any //TODO add type with pipe
}