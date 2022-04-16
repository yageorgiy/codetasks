import Parser from "@/ts/class/parser/Parser";
import Input from "@/ts/class/Input";

export default class InputParser extends Parser<Input> {
    parse(data: any): Input {
        let max = 0;
        let min = 0;

        if(data.Range) {
            min = data.range[0];
            max = data.range[1];
        }

        return new Input(
            data.name || "",
            data.type || "",
            max,
            min,
            data.dimensions || []
        );
    }
};