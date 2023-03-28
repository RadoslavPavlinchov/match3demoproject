import { Game } from "./Game";

export const Config = {
    itemsColors: [
        "0xff0000",
        "0x00ff00",
        "0x0000ff",
        "0xffff00",
        "0xffa500",
        "0x800080"
    ],
    board: {
        rows: 6,
        cols: 6
    },
    field: {
        width: 100,
        height: 100
    },

    startScene: Game,
}