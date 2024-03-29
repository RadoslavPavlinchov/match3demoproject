import * as PIXI from "pixi.js";
import { App } from "../App";
import { Field } from "./Field";
import { Item } from "./Item";
import { Utils } from "../Utils";

export class Grid extends PIXI.Container {
    rows = [];
    columns = [];

    fields = [];

    rowsCount = App.config.board.rows;
    colsCount = App.config.board.cols;

    constructor(options) {
        super();

        this.options = options;

        this.create();

        this.alignPosition();
    }

    create() {
        this.createFields();
        this.createItems();
    }

    createFields() {
        for (let row = 0; row < this.colsCount; row++) {
            const rowItems = [];
            for (let col = 0; col < this.rowsCount; col++) {
                const field = this.createField(row, col)
                rowItems.push(field);
            }
            this.rows.push(rowItems);
        }


        for (let row = 0; row < this.rows.length; row++) {
            const colItems = [];
            for (let col = 0; col < this.colsCount; col++) {
                const field = this.rows[col][row];
                colItems.push(field);
            }
            this.columns.push(colItems);
        }

    }

    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.addChild(field.container);

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
            this.emit("itemClick", item)
        })

        field.setItem(item);

        this.addChild(item.container);

        return item;
    }

    alignPosition() {
        const { width, height } = App.config.field;

        const { appWidth, appHeight } = this.options;

        const gridWidth = width * this.colsCount;
        const gridHeight = height * this.rowsCount;

        this.x = (appWidth - gridWidth) / 2
        this.y = (appHeight - gridHeight) / 2
    }

    swap(currItem, nextItem) {
        const currField = currItem.field;
        const nextField = nextItem.field;

        currField.item = nextItem;
        nextItem.field = currField;

        nextField.item = currItem;
        currItem.field = nextField;

        currItem = null;
        nextItem = null;
    }

    getField(row, col) {
        return this.fields.find(field => field.row === row && field.col === col);
    }
}