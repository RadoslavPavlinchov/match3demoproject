export default class SceneManager {
    constructor(stage) {
        this.stage = stage;
        this.current = null;
    }

    add(name, scene) {
        // Add new scene

        this[name] = scene;

        console.log("SceneManager", this)
    }

    start(name, options) {
        // Start current scene

        // Remove any other active scenes
        if (this.stage.children.length) {
            this.stage.removeChildren();
        }

        // Current scene should extent PIXI.Container
        this.current = new this[name](options);

        // Add the scene/container
        this.stage.addChild(this.current);


        console.log("check stage", this)
    }
}