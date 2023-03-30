import * as PIXI from "pixi.js";
import { Grid } from "./Grid";

export class Game {
    // currentItem = {};

    constructor() {
        this.container = new PIXI.Container();

        this.grid = this.createGrid();
        this.grid.container.on("itemClick", this.onItemClick, this);
    }

    createBackground() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill("0x650A5A");
        graphics.drawRect(0, 0, 650, 650);
        graphics.endFill();

        this.container.addChild(graphics);
    }

    createGrid() {
        const grid = new Grid();
        this.container.addChild(grid.container);
        return grid;
    }

    onItemClick(item) {
        // Add a different type of movement:
        //  - slide/swipe 

        // 1. Mark the Item as selected
        // 2. Visually highlight the selected Item and Field below it

        if (this.currentItem === item) {
            return;
        }


        // Check if two Items are neighbors
        if (this.currentItem) {

            if (!this.isAdjacent(this.currentItem, item)) {
                this.deselectItem();
                this.selectItem(item);
                return;
            }

            this.swapItems(this.currentItem, item);
            this.currentItem = null;
            return;
        }


        this.selectItem(item);
    }

    isAdjacent(item1, item2) {
        const xOffset = 50;
        const yOffset = 50;

        // Replace the 100 with the width of a Field
        const item1X = (item1.container.x - xOffset) / 100;
        const item1Y = (item1.container.y - yOffset) / 100;

        const item2X = (item2.container.x - xOffset) / 100;
        const item2Y = (item2.container.y - yOffset) / 100;


        if (Math.abs(item1X - item2X) <= 1 && Math.abs(item1Y - item2Y) === 0) {
            return true;
        }

        if (Math.abs(item1Y - item2Y) <= 1 && Math.abs(item1X - item2X) === 0) {
            return true;
        }

        return false;
    }

    swapItems(currItem, nextItem) {
        const x1 = currItem.container.x;
        const y1 = currItem.container.y;

        const x2 = nextItem.container.x;
        const y2 = nextItem.container.y;

        currItem.moveTo(x2, y2);
        nextItem.moveTo(x1, y1);

        currItem.deselect();
        currItem.field.deselect();

        nextItem.deselect();

        const currField = currItem.field;
        const nextField = nextItem.field;

        currField.item = nextItem;
        nextItem.field = currField;

        nextField.item = currItem;
        currItem.field = nextField;

        currItem = null;
        nextItem = null;
    }

    selectItem(item) {
        this.currentItem = item;
        this.currentItem.select();
        this.currentItem.field.select();
    }

    deselectItem() {
        this.currentItem.deselect();
        this.currentItem.field.deselect();

        this.currentItem = null;
    }
}