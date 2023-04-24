import * as PIXI from "pixi.js";
import { App } from "../App";

export default class StartButton extends PIXI.Container {
    constructor() {
        super();

        this.interactive = true;
        this.cursor = "pointer";

        this.init();
    }

    init() {
        this.createButton();
        this.createText();

        this.on("pointerdown", this.onClick, this);
    }

    onClick() {
        App.scenes.start("Game")
    }

    createButton() {
        const graphics = new PIXI.Graphics();

        const width = 200;
        const height = 100;
        const x = window.innerWidth / 2 - width / 2;
        const y = window.innerHeight / 2 - height / 2;
        const radius = 20;

        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xAA4F08);
        graphics.drawRoundedRect(x, y, width, height, radius);
        graphics.endFill();

        this.addChild(graphics)
    }

    createText() {
        const text = new PIXI.Text('START');

        text.anchor.set(0.5)
        text.x = window.innerWidth / 2;
        text.y = window.innerHeight / 2;

        this.addChild(text)
    }
}