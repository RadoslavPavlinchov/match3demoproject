import StartButton from "../buttons/startButton"
import BaseScene from "../lib/BaseScene"

export default class Start extends BaseScene {
    constructor(options) {
        super();

        this.options = options;

        this.init();
    }

    init() {
        this.createStartButton();
    }

    createStartButton() {
        this.addChild(new StartButton(this.options))
    }
}