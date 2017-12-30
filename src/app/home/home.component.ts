/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetItem } from '../budget-item';
import { LocalstorageService } from "app/localstorage.service";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    addItemForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private _fb: FormBuilder, public ls: LocalstorageService) {
        this.addItemForm = this._fb.group({
            date: [(new Date()).toISOString(), Validators.required],
            type: ['', Validators.required],
            location: ['', Validators.required],
            item: ['', Validators.required],
            price: ['0.0', Validators.required]
        });
    }

    get items(): BudgetItem[] {
        return this.ls.getItems();
    }

    addItem() {
        this.errorMessage = '';
        this.successMessage = '';
        if (this.addItemForm.valid) {
            this.ls.addItem(this.addItemForm.value);
            this.successMessage = 'Added item!';
            this.addItemForm.reset();
        } else {
            this.errorMessage = 'Some fields are invalid!';
        }
    }

    deleteItem(index: number) {
        this.successMessage = 'Deleted item!';
        this.ls.removeItem(index);
    }

    getTotalCost(): number {
        return this.items.length ? this.items.map(val => val.price).reduce((prev, cur) => prev + cur) : 0;
    }

    getExpensePercentage(): number {
        if (this.ls.monthlyAmount === 0 || this.ls.monthlyAmount === NaN) {
            return 0;
        } else {
            return Math.round(this.items.filter(val => new Date(val.date).getMonth() === new Date().getMonth())
                .reduce((prev, cur) => prev + cur.price, 0) / this.ls.monthlyAmount * 100);
        }
    }
}
