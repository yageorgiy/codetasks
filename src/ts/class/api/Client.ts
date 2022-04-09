import { ApiCall } from './ApiCall';
import {$t} from "@/lang";
import { ApiErrors } from './ApiErrors';
import { Method } from '@/ts/types';

export class Client {
    public mount: string;

    constructor(mount: string) {
        this.mount = mount;
    }

    public request(url: string, data: any, method? : Method): ApiCall {

        // Generating link example.com?p1=v1&p2=v2&p3=v3
        const requestURL = new URL(this.mount + url);
        let customParams = {};

        switch(method){

            case Method.POST: {
                let d = new FormData();

                for (let key in data) {
                    d.append(key, data[key]);
                }

                customParams = {
                    method: "POST",
                    body: d,
                };
                break;
            }

            default:
            case Method.GET: {
                let params = new URLSearchParams(data).toString();
                requestURL.search = new URLSearchParams(params).toString();
            }
        }

        // Fetch request
        const f = fetch(requestURL.toString(), customParams);

        // ApiCall: request data instance
        const request = new ApiCall(f);
        request.isBusy = true;

        // Low-level (transport) error catches
        f.catch((e: Event) => {
            // TODO: js error description?
            request.error = $t("app.errors.anyConnectionError").toString();
            request.onError.call(request, e);
        }).finally(() => {
            request.isBusy = false;
        });

        // JSON parsing & high-level (data) error catches
        f.then((r: Response) => r.json())
            .then((data: any) => {
                if(data.error !== undefined && data.error !== ApiErrors.NoError){
                    request.error = $t(`app.errors.e${data.error}`).toString();
                    request.onError.call(request, data);
                    return;
                }
                request.onSuccess.call(request, data);
            });


        return request;
    }

    public login(email: string, password: string): ApiCall {
        return this.request("login", {
            email: email,
            pass: password
        });
    }

    public register(name: string, email: string, password: string): ApiCall {
        return this.request("register", {
            email: email,
            pass: password,
            name: name
        }, Method.POST);
    }

    public logout(email: string, password: string): ApiCall {
        return this.request("login", {
            email: email,
            password: password
        });
    }
}