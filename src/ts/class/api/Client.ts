import { ApiCall } from './ApiCall';
import {$t} from "@/lang";
import { ApiErrors } from './ApiErrors';
import { Method } from '@/ts/types';

export class Client {
    public mount: string;
    public token: string;

    public userInfoApiCall: ApiCall;
    public email: string;
    public fullName: string;


    constructor(mount: string) {
        // Api mount stuff
        this.mount = mount;
        this.token = "";

        // Cross-application data
        this.email = "";
        this.fullName = "";

        // Profile info ApiCall
        this.userInfoApiCall = new ApiCall(null);
    }

    public request(url: string, data: any, method? : Method): ApiCall {
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
                // Generating link example.com?p1=v1&p2=v2&p3=v3
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

    /** Session methods **/

    /**
     * Verify token, start session and get profile info
     * (Used after reopening page; with localStorage.token validation)
     * @param token
     * @param onError
     */
    public sessionAuthorizeVerified(token: string, onError? : () => void){
        const _this = this;
        const sessionVerify = this.verify(token);

        sessionVerify.onSuccess = () => {
            _this.sessionAuthorize(token);
        };

        sessionVerify.onError = () => {
            _this.sessionForget();
            if(onError != undefined)
                onError();
        };
    }

    /**
     * Session start and get profile info
     * (Used after register/login action; no need to validate token)
     * @param token
     */
    public sessionAuthorize(token: string){
        this.sessionStart(token);
        this.sessionProfileInfo();
    }

    /**
     * Session checkup with no sync
     */
    public sessionIsStarted(): boolean {
        return this.token !== "";
    }

    /**
     * Session verification of current token
     */
    public sessionVerify(): ApiCall {
        if(!this.sessionIsStarted())
            return new ApiCall(null);

        return this.verify(this.token);
    }

    /**
     * Full session removal with server sync
     */
    public sessionLogout(): ApiCall {
        if(!this.sessionIsStarted())
            return new ApiCall(null);

        const call = this.logout(this.token);
        this.sessionForget();
        return call;
    }

    /**
     * Fill the fullName and email fields with no ApiCall returned
     */
    public sessionProfileInfo() {
        if(!this.sessionIsStarted()) return;

        this.userInfoApiCall = this.profile(this.token);
        this.userInfoApiCall.onSuccess = (data: any) => {
            this.fullName = data.name || "";
            this.email = data.email || "";
        };
    }

    /**
     * Remove session credentials with no sync (no /logout)
     */
    public sessionForget(){
        this.token = "";
        localStorage.token = "";

        // Forget user data
        this.fullName = "";
        this.email = "";
    }

    /**
     * Start session with no sync
     * @param token
     */
    public sessionStart(token: string){
        this.token = token;
        localStorage.token = token;
    }

    /** Methods **/

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

    public logout(token: string): ApiCall {
        return this.request("logout", {
            token: token
        });
    }

    public verify(token: string): ApiCall {
        return this.request("verify", {
            token: token
        });
    }

    public profile(token: string): ApiCall {
        return this.request("profile", {
            token: token
        });
    }
}