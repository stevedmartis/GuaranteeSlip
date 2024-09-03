import { OauthToken } from "./OBUser/ob-user.model";

export class SessionOutputModel {
    public state: string;
    public showModalIdle: boolean;
    public showModalToken: boolean;

    constructor(
        idleState = 'Not started.',
        showModalIdle = false,
        showModalToken = false
    ) {
        this.state = idleState;
        this.showModalIdle = showModalIdle;
        this.showModalToken = showModalToken;
    }
}

export class OauthTokenModel implements OauthToken {
    access_token: string;
    refresh_token: string;
    message?: string;

    constructor(
        access_token: string,
        refresh_token: string
    ) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
}