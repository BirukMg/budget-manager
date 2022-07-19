import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BankForm } from '../models/bank-form.mode';
import { Bank } from '../models/bank.model';
import { BudgetForm } from '../models/budget-form.model';
import { Budget } from '../models/budget.model';
import { CategoryFrom } from '../models/category-form.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  url(suffix: string) {
    const baseUrl: string = environment.apiHost;
    return `${baseUrl}/${suffix}${suffix ? '/' : ''}`;
  }

  createBank(data: BankForm) {
    return this.http.post<Bank>(this.url('bank/create'), data);
  }

  createBudget(data: BudgetForm) {
    return this.http.post<Budget>(this.url('budget/create'), data);
  }
  createCategory(data: CategoryFrom) {
    return this.http.post<Category>(this.url('category/create'), data);
  }

  updateBank(data: BankForm) {
    console.log(data);
    
    return this.http.post<Bank>(this.url(`bank/update/${data.id}`), data);
  }
  updateBudget(data: BudgetForm) {
    return this.http.post<Budget>(this.url(`budget/update/${data.id}`), data);
  }
  getBanks() {
    return this.http.get<Bank[]>(this.url('bank'));
  }
  getCategories() {
    return this.http.get<Category[]>(this.url('category'));
  }

  getBudgets() {
    return this.http.get<Budget[]>(this.url('budget'));
  }

  deleteBank(id: string) {
    return this.http.get(this.url(`bank/delete/${id}`));
  }

  deleteBudget(id: string) {
    return this.http.get(this.url(`budget/delete/${id}`));
  }

  deleteCategory(id: string) {
    return this.http.get(this.url(`category/delete/${id}`));
  }

}
