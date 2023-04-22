import * as PIXI from "pixi.js";

export default class BaseScene extends PIXI.Container {
    constructor() {
        super();

        this.init();
    }

    init() {
        console.log("Base scene init")
    }
}