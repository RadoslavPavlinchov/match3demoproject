import * as PIXI from "pixi.js";
import { App } from "../App";

export default class StartButton extends PIXI.Container {
    constructor(options) {
        super();

        this.options = options;
        this.interactive = true;
        this.cursor = "pointer";

        this.init();
    }

    init() {
        this.createButton();
        this.createText();

        this.on("pointerdown", this.onClick, this.parent);
    }

    onClick() {
        App.scenes.start("Game", this.options)
    }

    createButton() {
        const { appWidth, appHeight } = this.options;

        const graphics = new PIXI.Graphics();

        const width = 200;
        const height = 100;
        const x = appWidth / 2 - width / 2;
        const y = appHeight / 2 - height / 2;
        const radius = 20;

        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xAA4F08);
        graphics.drawRoundedRect(x, y, width, height, radius);
        graphics.endFill();

        this.addChild(graphics)
    }

    createText() {
        const { appWidth, appHeight } = this.options;
        const text = new PIXI.Text('START');

        text.anchor.set(0.5)
        text.x = appWidth / 2;
        text.y = appHeight / 2;

        this.addChild(text)
    }
}