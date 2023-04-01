import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

class Application {
    run(config) {
        this.config = config;
        this.app = new PIXI.Application({ resizeTo: window });

        document.body.appendChild(this.app.view);

        this.start();
    }

    start() {
        this.scene = new this.config["startScene"]();
        this.app.stage.addChild(this.scene.container);
    }
}

export const App = new Application();
globalThis.__PIXI_APP__ = App;