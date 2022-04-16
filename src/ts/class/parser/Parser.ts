export default abstract class Parser<T> {
    abstract parse(data: any): T;
};