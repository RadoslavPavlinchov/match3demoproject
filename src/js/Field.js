import * as PIXI from "pixi.js";
import { App } from "./App";
import { Item } from "./Item";
import { Utils } from "./Utils";

export class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.width = 100;
        this.height = 100;

        this.container = new PIXI.Container();

        this.createGraphics();



        this.createItem();
    }

    get position() {
        return {
            x: this.col * this.width,
            y: this.row * this.height
        };
    }

    createGraphics() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(5, 0xFFBD01, 1);
        graphics.beginFill(0xC34288);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();

        this.container.addChild(graphics);
    }

    createItem() {
        const randomColor = App.config.itemsColors[Utils.getRandomInt(0, App.config.itemsColors.length - 1)];
        const item = new Item(randomColor, this.position.x, this.position.y);
        this.container.addChild(item.container);
    }

}