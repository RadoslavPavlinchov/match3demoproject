import * as PIXI from "pixi.js"

export class Item {
    constructor(color = "#000", x = 0, y = 0) {
        this.color = color;

        const graphics = this.createGraphics(this.color);

        this.container = new PIXI.Container();
        this.container.name = "Item"
        this.container.x = x + 50;
        this.container.y = y + 50;

        this.container.interactive = true;
        this.container.cursor = "pointer";

        this.container.addChild(graphics);
    }

    createGraphics(color) {
        const graphics = new PIXI.Graphics();

        graphics.lineStyle(0);
        graphics.beginFill(color, 1);
        graphics.drawCircle(0, 0, 45);
        graphics.endFill();

        return graphics;
    }
}