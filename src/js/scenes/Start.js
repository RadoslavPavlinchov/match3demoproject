import StartButton from "../buttons/startButton"
import BaseScene from "../lib/BaseScene"

export default class Start extends BaseScene {
    // constructor() {
    //     super();
    //     this.init();
    // }

    init() {
        this.createStartButton();
    }

    createStartButton() {
        this.addChild(new StartButton())
    }
}