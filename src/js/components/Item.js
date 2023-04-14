import * as PIXI from "pixi.js"
import { gsap } from "gsap";

export class Item {
    isMarked = false;

    constructor(color = "#000", x = 0, y = 0) {
        this.color = color;
        this.isSelected = false;

        const graphics = this.createGraphics(this.color);

        this.container = new PIXI.Container();
        this.container.name = "itemContainer";
        this.container.x = x + 50;
        this.container.y = y + 50;

        this.container.interactive = true;
        this.container.cursor = "pointer";

        this.container.addChild(graphics);


        // this.container.on("pointerdown", () => {
        //     gsap.to(this.container, {
        //         pixi: {
        //             scale: 1.1
        //         },
        //         duration: 0.3,
        //         // onComplete: () => {
        //         //     this.container.scale.set(1)
        //         // }
        //     })
        // })
    }

    createGraphics(color) {
        const graphics = new PIXI.Graphics();

        graphics.lineStyle(2, 0x333333, 0.5);
        graphics.beginFill(color, 1);
        graphics.drawCircle(0, 0, 45);
        graphics.endFill();
        graphics.name = "itemGraphics"

        return graphics;
    }

    select() {
        this.isSelected = true;

        gsap.to(this.container, {
            pixi: {
                scale: 1.05
            },
            duration: 0.2,
            // onComplete: () => {
            //     this.container.scale.set(1)
            // }
        })
    }

    deselect() {
        this.isSelected = false;

        // gsap.killTweensOf(this.container)

        gsap.to(this.container, {
            pixi: {
                scale: 1
            },
            duration: 0.1,
            // onComplete: () => {
            //     this.container.scale.set(1)
            // }
        })
    }

    moveTo(x, y, duration, ease) {
        return new Promise(resolve => {
            gsap.to(this.container, {
                pixi: {
                    x: x,
                    y: y
                },
                duration: duration,
                ease: ease,
                onComplete: () => {
                    resolve();
                }
            })
        })
    }

    fallDownTo(pos) {
        return this.moveTo(pos.x + 50, pos.y + 50, 0.6, "bounce.out")
    }

    destroy() {
        this.container.getChildByName("itemGraphics").destroy();

        this.container.destroy();

        if (this.field) {
            this.field.item = null;
            this.field = null
        }
    }
}