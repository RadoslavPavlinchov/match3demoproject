export class CombinationsManager {
    constructor(grid) {
        this.grid = grid;

        this.init();
    }

    init() {

        console.log("this.grid", this.grid)
    }

    findCombinations() {
        this.grid.fields.forEach(field => {
            console.log("field", field)
        });
    }
} 