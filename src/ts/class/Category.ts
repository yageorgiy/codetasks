import Unit from "@/ts/class/Unit";

export default class Category {
    public name: string;
    public units: Array<Unit>;
    constructor(name: string) {
        this.name = name;
        this.units = new Array<Unit>();
    }
    public addUnit(...units: Unit[]): this {
        for(let task of units)
            this.units.push(task);
        return this;
    }
    public addUnits(units: Unit[]): this {
        for(let task of units)
            this.units.push(task);
        return this;
    }
};