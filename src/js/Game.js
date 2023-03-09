import * as PIXI from "pixi.js";

export class Game {
    constructor() {
        this.container = new PIXI.Container();

        this.createBackground();
    }

    createBackground() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill("0x650A5A");
        graphics.drawRect(window.innerWidth / 2.66, 100, window.innerWidth / 4, 700);
        graphics.endFill();

        this.container.addChild(graphics);
    }
}