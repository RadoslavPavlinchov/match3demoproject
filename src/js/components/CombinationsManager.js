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

        this.grid.gridRows.forEach(row => {


            for (let i = 0; i < row.length; i++) {

                // check the next 3 fields 
                const firstField = row[i];
                const secondField = row[i + 1];
                const thirdField = row[i + 2];

                // check if the next item is valid
                if (!secondField || !thirdField) {
                    console.log("NO MORE ITEMS")
                    continue;
                }


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

            // check the next 3 columns
        });

        // reset the isMarked prop
        for (let i = 0; i < this.grid.items.length; i++) {
            const item = this.grid.items[i];
            if (item.isMarked) item.isMarked = false;
        }

        return combinations
    }
} 