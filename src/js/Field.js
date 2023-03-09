import * as PIXI from "pixi.js";

export class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.width = 100;
        this.height = 100;

        this.container = new PIXI.Container();

        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(10, 0xFFBD01, 1);
        this.graphics.beginFill(0xC34288);
        this.graphics.drawRect(this.position.x, this.position.y, this.width, this.height);
        this.graphics.endFill();


        this.container.addChild(this.graphics)
    }


    get position() {
        return {
            x: this.col * this.width,
            y: this.row * this.height
        };
    }

}