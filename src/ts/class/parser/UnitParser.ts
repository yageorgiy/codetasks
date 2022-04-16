import Parser from "@/ts/class/parser/Parser";
import Unit from "@/ts/class/Unit";
import TaskParser from "@/ts/class/parser/TaskParser";

export default class UnitParser extends Parser<Unit> {
    parse(data: any): Unit {
        const unit = new Unit(data.name || "", "");

        for(let i in data.tasks)
            unit.addTask((new TaskParser()).parse(data.tasks[i]));

        return unit;
    }
};