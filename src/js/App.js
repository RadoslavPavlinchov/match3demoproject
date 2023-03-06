import * as PIXI from "pixi.js";

class Application {
    run(config) {
        this.config = config;
        this.app = new PIXI.Application({ resizeTo: window });

        document.body.appendChild(this.app.view);
    }
}

export const App = new Application();