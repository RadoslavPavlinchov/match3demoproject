import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import SceneManager from "./lib/SceneManager";
import { Game } from "./scenes/Game";
import Start from "./scenes/Start";

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

class Application {
    run(config) {
        this.config = config;
        this.app = new PIXI.Application({
            autoDensity: true,
            width: 720,
            height: 1280,
            // resizeTo: window,
            background: "0x123456"
        });

        this.scenes = new SceneManager(this.app.stage);
        this.scenes.add("Start", Start);
        this.scenes.add("Game", Game);

        document.body.appendChild(this.app.view);

        window.addEventListener('resize', () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const scaleFactor = Math.min(screenWidth / 720, screenHeight / 1280);

            this.app.stage.scale.set(scaleFactor);

            this.centerStage();
        });

        this.start();
        this.centerStage();
    }

    start() {
        // this.scenes.start("Start");
        this.scenes.start("Game");
    }

    centerStage() {
        const x = (this.app.screen.width / 2) - (this.app.stage.width / 2);
        const y = (this.app.screen.height / 2) - (this.app.stage.height / 2);

        this.app.stage.position.set(x, y)
    }
}

export const App = new Application();
globalThis.__PIXI_APP__ = App;