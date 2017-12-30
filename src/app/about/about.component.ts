/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { DadJokeService, DadJoke } from 'app/dad-joke.service';

@Component({
    styleUrls: ['./about.component.scss'],
    templateUrl: './about.component.html'
})
export class AboutComponent {
    open: Boolean = false;
    dadJoke: DadJoke;
    loading: boolean = false;

    constructor(private djs: DadJokeService) {}

    updateDadJoke() {
        this.loading = true;
        this.djs.getDadJoke().subscribe(res => {
            this.dadJoke = res;
            this.loading = false;
        }, err => {
            console.log(err);
            this.loading = false;
        });
    }
}
