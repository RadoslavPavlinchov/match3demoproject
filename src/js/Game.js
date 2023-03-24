import * as PIXI from "pixi.js";
import { Grid } from "./Grid";

export class Game {
    currentItem = {};

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
            console.log("already selected")
            return;
        }

        console.log("freshly selected")

        // item.select();

        this.currentItem = item;
    }
}