import * as PIXI from "pixi.js";
import { Grid } from "./Grid";

export class Game {
    // currentItem = {};

    constructor() {
        this.container = new PIXI.Container();
        // this.container.x = window.innerWidth / 3;
        // this.container.y = 50;

        // this.createBackground();

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
            console.log("already selected");

            return;
        }

        // Check if two Items are neighbors
        if (this.currentItem) {

            if (!this.isAdjacent(this.currentItem, item)) {

                this.currentItem.deselect();

                this.currentItem = item;
                return;
            }

            console.log("SWAP")

            this.swapItems(this.currentItem, item);
            this.currentItem = null;
            return;
        }

        console.log("freshly selected")

        this.currentItem = item;
        this.currentItem.select();
    }

    isAdjacent(item1, item2) {
        console.log(this)

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
        const x1 = nextItem.container.x;
        const y1 = nextItem.container.y;

        const x2 = currItem.container.x;
        const y2 = currItem.container.y;


        currItem.moveTo(x1, y1);
        nextItem.moveTo(x2, y2);

        currItem.deselect();
        nextItem.deselect();

        currItem = null;
        nextItem = null;

        console.log(currItem, nextItem)
    }
}