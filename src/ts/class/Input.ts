export default class Input {
    public name: string;
    public type: string;
    public max: number;
    public min: number;
    public dimensions: number[];

    constructor(name: string, type: string, max: number, min: number, dimensions: number[]) {
        this.name = name;
        this.type = type;
        this.max = max;
        this.min = min;
        this.dimensions = dimensions;
    }
};