import * as PIXI from "pixi.js";

export class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.width = 100;
        this.height = 100;

        this.container = new PIXI.Container();

        this.createGraphics();
    }

    get position() {
        return {
            x: this.col * this.width,
            y: this.row * this.height
        };
    }

    createGraphics() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.beginFill(0xBDBDBD);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();

        this.container.addChild(graphics);
    }

    setItem(item) {
        this.item = item;
        item.field = this;
    }

    select() {
        const graphics = this.container.getChildAt(0);

        graphics.clear()

        graphics.lineStyle(2, 0xFFBD01, 1);
        graphics.beginFill(0xffffff);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();
    }

    deselect() {
        const graphics = this.container.getChildAt(0);

        graphics.clear()

        graphics.lineStyle(2, 0xffffff, 1);
        graphics.beginFill(0xBDBDBD);
        graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();
    }
}