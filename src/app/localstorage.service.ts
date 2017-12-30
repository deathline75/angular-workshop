import { Injectable } from '@angular/core';
import { BudgetItem } from 'app/budget-item';

@Injectable()
export class LocalstorageService {

  private items: BudgetItem[];
  private _monthlyAmount: number;

  constructor() {
    if (!localStorage.getItem('items')) {
      let presetItems = [
        {date: new Date(), type: 'Food', location: 'SP FC4', item: 'Roasted Chicken Rice', price: 2.5},
        {date: new Date(), type: 'Food', location: 'SP FC4', item: 'Iced Tea', price: 1.4},
        {date: new Date(), type: 'Supplies', location: 'SP FC5', item: 'Pilot G-2 Pen', price: 1.5},
      ];
      localStorage.setItem('items', JSON.stringify(presetItems));
    }
    this.getItems();
    if (!localStorage.getItem('monthlyAmount')) {
      localStorage.setItem('monthlyAmount', '1000');
      this.monthlyAmount = Number(localStorage.getItem('monthlyAmount'));
    }
  }

  getItems(): BudgetItem[] {
    if (!this.items) {
      this.items = JSON.parse(localStorage.getItem('items'));
    }
    return this.items;
  }

  addItem(item: BudgetItem) {
    this.items.push(item);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  removeItem(index) {
    this.items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  get monthlyAmount(): number {
    if (!this._monthlyAmount) {
      this._monthlyAmount = Number(localStorage.getItem('monthlyAmount'));
    }
    return this._monthlyAmount;
  }

  set monthlyAmount(amount: number) {
    this._monthlyAmount = amount;
    localStorage.setItem('monthlyAmount', String(amount));
  }

}
