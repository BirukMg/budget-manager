export interface Bank {
    id: string;
    name: string;
    balance: number;
    last_expense: number;
    last_income: number;
    last_expense_date?: number;
    last_income_date?: number;
    created_at: string;
    updated_at: string;
}