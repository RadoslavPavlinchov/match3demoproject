import * as PIXI from "pixi.js";
import { App } from "./App";
import { Field } from "./Field";
import { Item } from "./Item";
import { Utils } from "./Utils";

export class Grid {
    constructor() {
        this.container = new PIXI.Container();

        this.gridRows = [];

        this.fields = [];
        this.items = [];

        this.rows = App.config.board.rows;
        this.cols = App.config.board.cols;

        this.create();

        this.alignPosition();
    }

    create() {
        this.createFields();
        this.createItems();

        // console.log("this should be", this.gridRows)
    }

    createFields() {
        for (let row = 0; row < this.cols; row++) {

            const gridRow = [];

            for (let col = 0; col < this.rows; col++) {

                const field = this.createField(row, col)

                gridRow.push(field);
            }

            this.gridRows.push(gridRow);
        }
    }

    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.container.addChild(field.container);

        return field;
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

        // Move those two event handlers to the Item class
        item.container.on("pointerdown", () => {
            this.container.emit("itemClick", item)
        })
        // item.container.on("pointerup", () => {
        //     this.container.emit("itemPointerUp", item)
        // })


        field.setItem(item);

        this.items.push(item);
        this.container.addChild(item.container);
    }

    alignPosition() {
        const { width, height } = App.config.field;

        const gridWidth = width * this.cols;
        const gridHeight = height * this.rows;

        this.container.x = (window.innerWidth - gridWidth) / 2
        this.container.y = (window.innerHeight - gridHeight) / 2
    }
}