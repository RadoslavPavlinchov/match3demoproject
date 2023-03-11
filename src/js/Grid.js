import * as PIXI from "pixi.js";
import { App } from "./App";
import { Field } from "./Field";

export class Grid {
    constructor() {
        this.container = new PIXI.Container();
        this.fields = [];
        this.rows = App.config.board.rows;
        this.cols = App.config.board.cols;

        this.create();
    }

    create() {
        this.createFields()
    }

    createFields() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.createField(i, j)
            }
        }
    }

    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.container.addChild(field.container);
    }
}