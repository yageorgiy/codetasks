import Input from './Input';

export default class Task {
    public title: string;
    public description: string;
    public difficulty: number;
    public maxMemory: number; //MB
    public maxSeconds: number;
    public language: string;
    public sampleCode: string;
    public completed: boolean;

    public code: string;

    public inputs: Input[];
    public output: string;

    readonly MAX_DIFFICULTY: number = 5;
    readonly MIN_DIFFICULTY: number = 1;

    constructor(title: string, htmlDescription: string, difficulty: number, maxMemory: number, maxSeconds: number, language: string, sampleCode: string, output: string, completed?: boolean) {
        this.title = title;
        this.description = htmlDescription;
        this.difficulty = Math.min(Math.max(difficulty, this.MIN_DIFFICULTY), this.MAX_DIFFICULTY);
        this.maxMemory = maxMemory;
        this.maxSeconds = maxSeconds;
        this.language = language;
        this.sampleCode = sampleCode;

        this.code = "";
        this.output = output;
        this.inputs = [];

        this.completed = completed || false;
    }

    public addInput(...tasks: Input[]): this {
        for(let task of tasks)
            this.inputs.push(task);
        return this;
    }
    public addInputs(tasks: Input[]): this {
        for(let task of tasks)
            this.inputs.push(task);
        return this;
    }
};