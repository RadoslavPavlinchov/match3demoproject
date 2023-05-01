import * as PIXI from "pixi.js";
import { Grid } from "../components/Grid";
import { CombinationsManager } from "../components/CombinationsManager";
import BaseScene from "../lib/BaseScene";

export class Game extends BaseScene {
    // currentItem = {};
    isDisabled = false
    isSwapping = false;

    constructor(options) {
        super();

        // this.container = new PIXI.Container();
        this.options = options;

        this.grid = this.createGrid();
        this.grid.on("itemClick", this.onItemClick, this);

        this.grid.fields.forEach(field => {
            this.attachEventsTo(field.item);
        })

        this.combinationsManager = new CombinationsManager(this.grid);

        this.directionsMap = {
            "right": () => this.grid.rows[this.startRow][this.startCol + 1].item,
            "left": () => this.grid.rows[this.startRow][this.startCol - 1].item,
            "down": () => this.grid.rows[this.startRow + 1][this.startCol].item,
            "up": () => this.grid.rows[this.startRow - 1][this.startCol].item
        }


        this.destroyInitialCombinations();

    }

    createBackground() {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFEEB77, 1);
        graphics.beginFill("0x650A5A");
        graphics.drawRect(0, 0, 650, 650);
        graphics.endFill();

        this.addChild(graphics);
    }

    createGrid() {
        const grid = new Grid(this.options);
        this.addChild(grid);
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

    // ---------- USED IN SELECT AND SWAP MOVEMENT ----------
    // isAdjacent(item1, item2) {
    //     const xOffset = 50;
    //     const yOffset = 50;

    //     // Replace the 100 with the width of a Field
    //     const item1X = (item1.container.x - xOffset) / 100;
    //     const item1Y = (item1.container.y - yOffset) / 100;

    //     const item2X = (item2.container.x - xOffset) / 100;
    //     const item2Y = (item2.container.y - yOffset) / 100;


    //     if (Math.abs(item1X - item2X) <= 1 && Math.abs(item1Y - item2Y) === 0) {
    //         return true;
    //     }

    //     if (Math.abs(item1Y - item2Y) <= 1 && Math.abs(item1X - item2X) === 0) {
    //         return true;
    //     }

    //     return false;
    // }

    swapItems(currItem, nextItem, isReversed) {
        this.isDisabled = true;

        const x1 = currItem.container.x;
        const y1 = currItem.container.y;

        const x2 = nextItem.container.x;
        const y2 = nextItem.container.y;

        let isComplete1 = false;
        let isComplete2 = false;

        currItem.moveTo(x2, y2, 0.1, "none").then(() => {
            isComplete1 = true
            if (isComplete2) {
                this.currentItem = null;
                this.onSwapCompleteHandler(currItem, nextItem, isReversed)
            }

        });

        nextItem.moveTo(x1, y1, 0.1, "none").then(() => {
            isComplete2 = true
            if (isComplete1) {
                this.currentItem = null;
                this.onSwapCompleteHandler(currItem, nextItem, isReversed)
            }
        });

        currItem.deselect();
        currItem.field.deselect();

        nextItem.deselect();
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
        this.startPos = this.currentItem.container.toLocal(e.data.global.clone());

        this.startRow = this.currentItem.field.row;
        this.startCol = this.currentItem.field.col;
    }


    onPointerUpHandler(e) {
        if (this.currentItem) {
            this.deselectItem();
            this.startPos = null;
        }
    }

    swipeHandler(direction) {
        if (this.isSwapping) {
            return;
        }

        this.isSwapping = true;
        const adjacentItem = this.getAdjacentItem(direction);
        this.swapItems(this.currentItem, adjacentItem);
    }

    getAdjacentItem(direction) {
        return this.directionsMap[direction]();
    }

    // ---------- USED IN SWIPE MOVEMENT ----------
    onItemClick(item) {
        if (this.isDisabled) {
            return;
        }

        this.selectItem(item);
    }

    // ---------- USED IN SELECT AND SWAP MOVEMENT ----------
    // itemPointerUp(item) {
    //     if (this.currentItem === item) {
    //         return;
    //     }

    //     // Check if two Items are neighbors
    //     if (this.currentItem) {
    //         if (!this.isAdjacent(this.currentItem, item)) {
    //             this.deselectItem();
    //             return;
    //         }

    //         this.swapItems(this.currentItem, item);

    //         this.currentItem = null;
    //         return;
    //     }
    // }

    onPointerMoveHandler(e) {

        if (!this.currentItem) {
            return;
        }

        // Calculate the distance between the current position and the start position
        const pos = this.currentItem.container.toLocal(e.data.global.clone());
        const dx = pos.x - this.startPos.x;
        const dy = pos.y - this.startPos.y;

        // Adjust for the radius of the circles
        const r = 45;

        // Check if the user has swiped in a certain direction
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > r) {
                this.swipeHandler("right");
            } else if (dx < -r) {
                this.swipeHandler("left");
            }
        } else {
            if (dy > r) {
                this.swipeHandler("down");
            } else if (dy < -r) {
                this.swipeHandler("up");
            }
        }

    }

    onSwapCompleteHandler(current, next, isReversed) {
        this.grid.swap(current, next);

        if (isReversed) {
            this.isSwapping = false;
            this.isDisabled = false;
            return;
        }

        const combinations = this.combinationsManager.findCombinations();

        if (combinations.length > 0) {
            this.processCombinations(combinations);
        } else {
            this.swapItems(next, current, true)

            this.isSwapping = false;
            this.isDisabled = false;
        }
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
                return this.createNewItems();
            })
            .then(() => {
                return this.onFallDownComplete();
            })
    }

    onFallDownComplete() {
        const combinations = this.combinationsManager.findCombinations();

        if (combinations.length > 0) {
            this.processCombinations(combinations)
        } else {
            // IDLE STATE / WAIT FOR USER INPUT
            this.isSwapping = false;
            this.isDisabled = false;
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

                this.attachEventsTo(item)

                item.fallDownTo(field.position).then(() => {

                    completed += 1;

                    if (completed >= total) {
                        resolve();
                    }
                })
            })
        })
    }

    attachEventsTo(item) {
        item.container.on("pointerdown", this.onPointerDownHandler, this)
        item.container.on("pointerup", this.onPointerUpHandler, this);
        item.container.on("pointermove", this.onPointerMoveHandler, this);
    }

    destroyInitialCombinations() {
        const combinations = this.combinationsManager.findCombinations();

        if (combinations.length === 0) {
            return;
        }

        this.destroyCombinations(combinations);

        const emptyFields = this.grid.fields.filter(field => !field.item);
        emptyFields.forEach(field => {
            const item = this.grid.createItem(field);
            this.attachEventsTo(item)
        })

        this.destroyInitialCombinations();
    }
}