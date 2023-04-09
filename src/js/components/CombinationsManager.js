export class CombinationsManager {
    constructor(grid) {
        this.grid = grid;

        this.init();
    }

    init() {
        console.log("this.grid", this.grid)
    }

    findCombinations() {
        const combinations = [];

        for (let row = 0; row < this.grid.rows.length; row++) {

            for (let col = 0; col < this.grid.rows[row].length - 2; col++) {

                // check the next 3 fields 
                const firstField = this.grid.rows[row][col];
                const secondField = this.grid.rows[row][col + 1];
                const thirdField = this.grid.rows[row][col + 2];


                if ((firstField.item.color === secondField.item.color) && (secondField.item.color === thirdField.item.color)) {

                    console.log("MATCH")

                    if (firstField.item.isMarked || secondField.item.isMarked || thirdField.item.isMarked) {
                        console.log("ALREADY MARKED")
                        continue;
                    }

                    firstField.item.isMarked = true;
                    secondField.item.isMarked = true;
                    thirdField.item.isMarked = true;

                    combinations.push(firstField, secondField, thirdField)
                }

            }

        }


        // check the next 3 columns
        for (let row = 0; row < this.grid.rows.length - 2; row++) {

            for (let col = 0; col < this.grid.rows[row].length; col++) {

                // check the next 3 fields 
                const firstField = this.grid.rows[row][col]
                const secondField = this.grid.rows[row + 1][col];
                const thirdField = this.grid.rows[row + 2][col];


                if ((firstField.item.color === secondField.item.color) && (secondField.item.color === thirdField.item.color)) {

                    console.log("MATCH")

                    if (firstField.item.isMarked || secondField.item.isMarked || thirdField.item.isMarked) {
                        console.log("ALREADY MARKED")
                        continue;
                    }

                    firstField.item.isMarked = true;
                    secondField.item.isMarked = true;
                    thirdField.item.isMarked = true;

                    combinations.push(firstField, secondField, thirdField)
                }
            }
        }

        // reset the isMarked prop
        for (let i = 0; i < this.grid.items.length; i++) {
            const item = this.grid.items[i];
            if (item.isMarked) item.isMarked = false;
        }

        return combinations
    }
} 