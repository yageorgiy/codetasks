import Parser from "@/ts/class/parser/Parser";
import Input from "@/ts/class/Input";
import Task from "@/ts/class/Task";
import Unit from "@/ts/class/Unit";
import InputParser from "@/ts/class/parser/InputParser";

export default class TaskParser extends Parser<Task> {
    parse(data: any): Task {
        const task = new Task(
            data.id || 0,
            data.name || "",
            data.desc || "",
            data.score || -1,
            0.5,
            "",
            data.output || "",
            data.completion || false
        );

        for(let i in data.input)
            task.addInput((new InputParser()).parse(data.input[i]));

        return task;
    }
};