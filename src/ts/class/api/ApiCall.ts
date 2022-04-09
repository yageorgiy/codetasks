export class ApiCall {
    public json: any;                                       // Autofilled by Promise<Response> (in Client)
    public error: string;                                   // Autofilled by Promise<Response> (in Client)
    public isBusy: boolean;                                 // Autofilled by Promise<Response> (in Client)
    public promise: Promise<Response>;

    public onError: (e: Event | any) => void;              // Low-level (with Event) & high-level (with data: any) error caught
    public onSuccess: (data: any) => void;                  // Request completed (with error = 0, meaning no errors)

    constructor(promise: Promise<Response> | null) {
        this.promise = promise || new Promise<Response>(() => {});
        this.json = {};
        this.error = "";
        this.isBusy = false;

        this.onSuccess = () => {};
        this.onError = () => {};
    }
}