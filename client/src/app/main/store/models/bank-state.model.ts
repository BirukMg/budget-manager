import { EntityState } from "@ngrx/entity";
import { Bank } from "../../models/bank.model";

export interface BankState extends EntityState<Bank> {
  loading: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  deletingIds: string[];
}
