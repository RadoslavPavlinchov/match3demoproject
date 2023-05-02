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

                if (firstField.item.color !== secondField.item.color) {
                    continue;
                }

                const thirdField = this.grid.rows[row][col + 2];

                if (secondField.item.color !== thirdField.item.color) {
                    continue;
                }

                if (firstField.isMarked || secondField.isMarked || thirdField.isMarked) {
                    continue;
                }

                const fourthField = this.grid.rows[row][col + 3];

                if (!fourthField || (thirdField.item.color !== fourthField.item.color)) {
                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;

                    combinations.push(firstField, secondField, thirdField)
                    continue;
                }

                const fifthField = this.grid.rows[row][col + 4];

                if (!fifthField || (fourthField.item.color !== fifthField.item.color)) {
                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;
                    fourthField.isMarked = true;

                    combinations.push(firstField, secondField, thirdField, fourthField)
                    continue;
                }


                // if (firstField.isMarked || secondField.isMarked || thirdField.isMarked) {
                //     continue;
                // }

                firstField.isMarked = true;
                secondField.isMarked = true;
                thirdField.isMarked = true;
                fourthField.isMarked = true;
                fifthField.isMarked = true;

                combinations.push(firstField, secondField, thirdField, fourthField, fifthField);

            }

        }


        // check the next 3 columns
        for (let row = 0; row < this.grid.rows.length - 2; row++) {

            for (let col = 0; col < this.grid.rows[row].length; col++) {

                // check the next 3 fields 
                const firstField = this.grid.rows[row][col]
                const secondField = this.grid.rows[row + 1][col];




                if (firstField.item.color !== secondField.item.color) {
                    continue;
                }

                const thirdField = this.grid.rows[row + 2][col];

                if (secondField.item.color !== thirdField.item.color) {
                    continue;
                }


                if (firstField.isMarked || secondField.isMarked || thirdField.isMarked) {
                    continue;
                }

                const fourthField = this.grid.rows[row + 3][col];
                if (!fourthField || (thirdField.item.color !== fourthField.item.color)) {
                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;

                    combinations.push(firstField, secondField, thirdField)
                    continue;
                }


                const fifthField = this.grid.rows[row + 4][col];
                if (!fifthField || (fourthField.item.color !== fifthField.item.color)) {
                    firstField.isMarked = true;
                    secondField.isMarked = true;
                    thirdField.isMarked = true;
                    fourthField.isMarked = true;

                    combinations.push(firstField, secondField, thirdField, fourthField)
                    continue;
                }


                firstField.isMarked = true;
                secondField.isMarked = true;
                thirdField.isMarked = true;
                fourthField.isMarked = true;
                fifthField.isMarked = true;

                combinations.push(firstField, secondField, thirdField, fourthField, fifthField);
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