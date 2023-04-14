import * as PIXI from "pixi.js";
import { Grid } from "../components/Grid";
import { CombinationsManager } from "../components/CombinationsManager";

export class Game {
    // currentItem = {};
    isSwapping = false;

    constructor() {
        this.directionsMap = {
            "up": (adjacentItem) => {
                console.log("up")


                this.swapItems(this.currentItem, adjacentItem.item);
                this.isSwapping = true;
            },
            "right": (adjacentItem) => {
                console.log("right")
                this.swapItems(this.currentItem, adjacentItem.item);
                this.isSwapping = true;
            },
            "down": (adjacentItem) => {
                console.log("down")
                this.swapItems(this.currentItem, adjacentItem.item);
                this.isSwapping = true;
            },
            "left": (adjacentItem) => {
                console.log("left")
                this.swapItems(this.currentItem, adjacentItem.item);
                this.isSwapping = true;
            }
        }



        this.container = new PIXI.Container();

        this.grid = this.createGrid();
        this.grid.container.on("itemClick", this.onItemClick, this);
        // this.grid.container.on("itemPointerUp", this.itemPointerUp, this);


        this.grid.fields.forEach(field => {
            field.item.container.on("pointerdown", this.onPointerDownHandler, this)
            field.item.container.on("pointerup", this.onPointerUpHandler, this)
            field.item.container.on("pointermove", this.onPointerMoveHandler, this)
        })

        this.combinationsManager = new CombinationsManager(this.grid);

    }

    createBackground() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill("0x650A5A");
        graphics.drawRect(0, 0, 650, 650);
        graphics.endFill();

        this.container.addChild(graphics);
    }

    createGrid() {
        const grid = new Grid();
        this.container.addChild(grid.container);
        return grid;
    }

    // ---------- USED IN SELECT AND SWAP MOVEMENT ----------
    // onItemClick(item) {
    //     // Add a different type of movement:
    //     //  - slide/swipe 

    //     // 1. Mark the Item as selected
    //     // 2. Visually highlight the selected Item and Field below it

    //     if (this.currentItem === item) {
    //         return;
    //     }


    //     // Check if two Items are neighbors
    //     if (this.currentItem) {

    //         if (!this.isAdjacent(this.currentItem, item)) {
    //             this.deselectItem();
    //             this.selectItem(item);
    //             return;
    //         }

    //         this.swapItems(this.currentItem, item);
    //         this.currentItem = null;
    //         return;
    //     }


    //     this.selectItem(item);
    // }

    isAdjacent(item1, item2) {
        const xOffset = 50;
        const yOffset = 50;

        // Replace the 100 with the width of a Field
        const item1X = (item1.container.x - xOffset) / 100;
        const item1Y = (item1.container.y - yOffset) / 100;

        const item2X = (item2.container.x - xOffset) / 100;
        const item2Y = (item2.container.y - yOffset) / 100;


        if (Math.abs(item1X - item2X) <= 1 && Math.abs(item1Y - item2Y) === 0) {
            return true;
        }

        if (Math.abs(item1Y - item2Y) <= 1 && Math.abs(item1X - item2X) === 0) {
            return true;
        }

        return false;
    }

    swapItems(currItem, nextItem) {
        const x1 = currItem.container.x;
        const y1 = currItem.container.y;

        const x2 = nextItem.container.x;
        const y2 = nextItem.container.y;

        let isComplete1 = false;
        let isComplete2 = false;

        currItem.moveTo(x2, y2, 0.1, "none").then(() => {
            isComplete1 = true
            if (isComplete2) {
                this.onSwapCompleteHandler(currItem, nextItem)
            }

        });

        nextItem.moveTo(x1, y1, 0.1, "none").then(() => {
            isComplete2 = true
            if (isComplete1) {
                this.onSwapCompleteHandler(currItem, nextItem)
            }
        });

        currItem.deselect();
        currItem.field.deselect();

        nextItem.deselect();

        // const currField = currItem.field;
        // const nextField = nextItem.field;

        // currField.item = nextItem;
        // nextItem.field = currField;

        // nextField.item = currItem;
        // currItem.field = nextField;

        // currItem = null;
        // nextItem = null;
    }

    selectItem(item) {
        this.currentItem = item;
        this.currentItem.select();
        this.currentItem.field.select();
    }

    deselectItem() {
        this.currentItem.deselect();
        this.currentItem.field.deselect();

        this.currentItem = null;
    }

    onPointerDownHandler(e) {
        // this.startX = e.global.x;
        // this.startY = e.global.y;

        this.startPos = this.currentItem.container.toLocal(e.data.global.clone());

        this.startRow = this.currentItem.field.row;
        this.startCol = this.currentItem.field.col;

        // const { x, y } = this.currentItem.container;
        // const col = (x - 50) / 100;
        // const row = (y - 50) / 100;
        // const selectedCircle = this.grid[row][col];

        // this.grid.fields[this.currentItem.field.col]
    }


    onPointerUpHandler(e) {
        // this.endX = e.global.x;
        // this.endY = e.global.y;

        // // console.log("event up ---->", this.endX, this.endY)

        // const diffX = this.startX - this.endX;
        // const diffY = this.startY - this.endY;

        // // console.log("diffs", diffX, diffY)

        // if (Math.abs(diffX) > Math.abs(diffY)) {
        //     // HORIZONTAL SWIPE
        //     console.log("HORIZONTAL SWIPE")

        //     if (diffX > 0) {

        //         this.swipeHandler("left");

        //     } else {

        //         this.swipeHandler("right");
        //     }

        // } else {
        //     // VERTICAL SWIPE
        //     console.log("VERTICAL SWIPE")

        //     if (diffY > 0) {

        //         this.swipeHandler("top");
        //     } else {

        //         this.swipeHandler("bottom");
        //     }
        // }





        // Check if two Items are neighbors
        if (this.currentItem) {


            this.deselectItem();
            // this.selectItem(item);



        }




        this.currentItem = null;
        // this.startX = null;
        // this.startY = null;
        this.startPos = null;

        console.log("action 3", this.currentItem)
    }

    swipeHandler(direction, adjacentItem) {

        if (this.isSwapping) {
            console.log("you shall not pass")
            return;
        }

        console.log("you pass")

        this.directionsMap[direction](adjacentItem);
    }

    // ---------- USED IN SWIPE MOVEMENT ----------
    onItemClick(item) {

        // if (this.currentItem === item) {
        //     return;
        // }


        // // Check if two Items are neighbors
        // if (this.currentItem) {


        //     if (this.currentItem !== item) {
        //         this.deselectItem();
        //         this.selectItem(item);
        //         return;
        //     }

        //     // this.swapItems(this.currentItem, item);
        //     // this.currentItem = null;
        //     // return;
        // }


        this.selectItem(item);
    }

    itemPointerUp(item) {

        if (this.currentItem === item) {
            return;
        }


        // Check if two Items are neighbors
        if (this.currentItem) {

            if (!this.isAdjacent(this.currentItem, item)) {
                this.deselectItem();
                console.log("next item", item)
                // this.selectItem(item);
                return;
            }

            this.swapItems(this.currentItem, item);
            this.currentItem = null;


            console.log("FINAL CURR ITEM", this.currentItem)
            return;
        }

    }

    onPointerMoveHandler(e) {

        if (this.currentItem) {

            // console.log("how to find neighbor", this.currentItem)


            // Calculate the distance between the current position and the start position
            const pos = this.currentItem.container.toLocal(e.data.global.clone());
            const dx = pos.x - this.startPos.x;
            const dy = pos.y - this.startPos.y;

            // Adjust for the radius of the circles
            const r = 45;
            const w = 100;
            const h = 100;

            // Check if the user has swiped in a certain direction
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > r) {
                    const adjacentItem = this.grid.rows[this.startRow][this.startCol + 1];

                    if (!adjacentItem) {
                        return;
                    }

                    this.swipeHandler("right", adjacentItem)
                    return;
                } else if (dx < -r) {
                    const adjacentItem = this.grid.rows[this.startRow][this.startCol - 1];

                    if (!adjacentItem) {
                        return;
                    }

                    this.swipeHandler("left", adjacentItem)
                    return;
                }
            } else {
                if (dy > r) {
                    const adjacentItem = this.grid.rows[this.startRow + 1][this.startCol];

                    if (!adjacentItem) {
                        return;
                    }

                    this.swipeHandler("down", adjacentItem)
                    return;
                } else if (dy < -r) {
                    const adjacentItem = this.grid.rows[this.startRow - 1][this.startCol];

                    if (!adjacentItem) {
                        return;
                    }

                    this.swipeHandler("up", adjacentItem)
                    return;
                }
            }
        }
    }

    onSwapCompleteHandler(current, next) {
        this.grid.swap(current, next)

        const combinations = this.combinationsManager.findCombinations();
        this.processCombinations(combinations);

        this.isSwapping = false;
        this.currentItem = null;
    }

    destroyCombinations(combinations) {
        combinations.forEach(field => {
            field.item.destroy();
        })
    }

    processCombinations(combinations) {
        this.destroyCombinations(combinations);

        this.processFallDownOfItems()
            .then(() => {
                this.createNewItems()
            })
            .then(() => {
                this.onFallDownComplete();
            })
    }

    onFallDownComplete() {
        const combinations = this.combinationsManager.findCombinations();

        if (combinations.length > 0) {
            this.processCombinations(combinations)
        } else {

            // IDLE STATE / WAIT FOR USER INPUT

        }
    }

    processFallDownOfItems() {
        return new Promise(resolve => {
            let itemsStarted = 0;
            let itemsCompleted = 0;

            // start with the rows in reverse order - from bottom to top
            for (let i = this.grid.rows.length - 1; i >= 0; i--) {

                const row = this.grid.rows[i];

                // start with each column in normal order - from left to right
                for (let j = 0; j < row.length; j++) {
                    const field = row[j];

                    // Skip an iteration if the Field has Item
                    if (field.item) {
                        continue;
                    }

                    itemsStarted += 1;

                    // Process an empty Field
                    this.fallTo(field).then(() => {
                        itemsCompleted += 1;

                        if (itemsCompleted >= itemsStarted) {
                            resolve();
                        }
                    })
                }
            }
        })

    }

    fallTo(emptyField) {
        // Search in each row above the one that we found the empty Field
        for (let row = emptyField.row - 1; row >= 0; row--) {

            // Find a Field with Item inside
            const fieldWithItem = this.grid.getField(row, emptyField.col);

            if (fieldWithItem.item) {
                // Swap the Items inside of both fields
                const fieldItem = fieldWithItem.item;

                fieldItem.field = emptyField;
                emptyField.item = fieldItem;

                fieldWithItem.item = null;


                // Process the fall down animation for the Item
                return fieldItem.fallDownTo(emptyField.position);
            }
        }


        return Promise.resolve();
    }

    createNewItems() {
        return new Promise(resolve => {
            const emptyFields = this.grid.fields.filter(field => !field.item);

            const total = emptyFields.length;
            let completed = 0;

            emptyFields.forEach(field => {
                const item = this.grid.createItem(field);

                item.container.y = -200;

                item.fallDownTo(field.position).then(() => {

                    completed += 1;

                    if (completed >= total) {
                        console.log("completed, total", completed, total)
                        resolve();
                    }
                })
            })
        })
    }
}