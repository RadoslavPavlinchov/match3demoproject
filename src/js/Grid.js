import * as PIXI from "pixi.js";
import { App } from "./App";
import { Field } from "./Field";
import { Item } from "./Item";
import { Utils } from "./Utils";

export class Grid {
    constructor() {
        this.container = new PIXI.Container();

        this.fields = [];
        this.items = [];

        this.rows = App.config.board.rows;
        this.cols = App.config.board.cols;

        this.create();
    }

    create() {
        this.createFields();
        this.createItems();
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

    createItems() {
        this.fields.forEach(field => {
            this.createItem(field);
        })
    }

    createItem(field) {
        const randomColor = App.config.itemsColors[Utils.getRandomInt(0, App.config.itemsColors.length - 1)];
        const { x, y } = field.position;

        const item = new Item(randomColor, x, y);

        item.container.on("pointerdown", () => {
            this.container.emit("itemClick", item)
        })

        this.items.push(item);
        this.container.addChild(item.container);
    }
}