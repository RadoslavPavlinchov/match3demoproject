import * as PIXI from "pixi.js";
import { Grid } from "./Grid";

export class Game {
    // currentItem = {};

    constructor() {
        this.container = new PIXI.Container();
        this.container.x = window.innerWidth / 3;
        this.container.y = 50;

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


        // 1. Mark the Item as selected
        // 2. Visually highlight the selected Item and Field below it

        if (this.currentItem === item) {
            console.log("already selected");

            return;
        }

        // Check if two Items are neighbors
        if (this.currentItem) {

            this.swapItems(this.currentItem, item);
        }

        // console.log("freshly selected")

        // item.select();
        this.currentItem = item;
    }

    swapItems(currItem, nextItem) {
        const x1 = nextItem.container.x;
        const y1 = nextItem.container.y;

        const x2 = currItem.container.x;
        const y2 = currItem.container.y;

        console.log("currItem", currItem);
        console.log("nextItem", nextItem);

        // console.log("x, y", x, y)

        currItem.moveTo(x1, y1);
        nextItem.moveTo(x2, y2);
    }
}