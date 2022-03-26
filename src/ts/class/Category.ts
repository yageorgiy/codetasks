import Task from "@/ts/class/Task";

export default class Category {
    public name: string;
    public description: string;
    public tasks: Array<Task>;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.tasks = new Array<Task>();
    }
    public addTask(...tasks: Task[]): this {
        for(let task of tasks)
            this.tasks.push(task);
        return this;
    }
    public addTasks(tasks: Task[]): this {
        for(let task of tasks)
            this.tasks.push(task);
        return this;
    }
};