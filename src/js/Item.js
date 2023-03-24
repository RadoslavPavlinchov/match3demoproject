import * as PIXI from "pixi.js"
import { gsap } from "gsap";

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


        this.container.on("pointerdown", () => {
            console.log("action 2")
            this.container.scale.set(1.1)

            gsap.to(this.container, {
                // x: "+=10",
                duration: 0.3,
                onComplete: () => {
                    console.log("this thing done")
                }
            })
        })
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