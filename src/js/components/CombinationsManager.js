export class CombinationsManager {
    constructor(grid) {
        this.grid = grid;

        this.init();
    }

    init() {
        // console.log("this.grid", this.grid)
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

                    if (firstField.isMarked || secondField.isMarked || thirdField.isMarked) {
                        continue;
                    }

                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;

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

                    if (firstField.isMarked || secondField.isMarked || thirdField.isMarked) {
                        continue;
                    }

                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;

                    combinations.push(firstField, secondField, thirdField)
                }
            }
        }

        // reset the isMarked prop
        for (let i = 0; i < this.grid.fields.length; i++) {
            const field = this.grid.fields[i];
            if (field.isMarked) field.isMarked = false;
        }

        return combinations
    }
} 