import * as PIXI from "pixi.js";
import { Field } from "./Field";

export class Game {
    constructor() {
        this.container = new PIXI.Container();

        this.createBackground();

        const field = new Field(1, 1);
        this.container.addChild(field.container)
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