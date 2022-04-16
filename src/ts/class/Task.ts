import Input from './Input';
import { TaskErrorType } from '../types';

export default class Task {
    public title: string;
    public description: string;
    public score: number;
    public maxSeconds: number;
    public id: number;
    // public language: string;
    public sampleCode: string;
    public completed: number;

    public code: string;

    public inputs: Input[];
    public output: string;

    public lastError: TaskErrorType;

    // readonly MAX_DIFFICULTY: number = 5;
    // readonly MIN_DIFFICULTY: number = 1;

    constructor(id: number, title: string, htmlDescription: string, score: number, maxSeconds: number, sampleCode: string, output: string, completed?: number) {
        this.id = id;
        this.title = title;
        this.description = htmlDescription;
        // this.score = Math.min(Math.max(difficulty, this.MIN_DIFFICULTY), this.MAX_DIFFICULTY);
        this.score = score;
        // this.maxMemory = maxMemory;
        this.maxSeconds = maxSeconds;
        // this.language = language;
        this.sampleCode = sampleCode;

        this.code = "";
        this.output = output;
        this.inputs = [];

        this.completed = completed || 0;
        this.lastError = {} as TaskErrorType;
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