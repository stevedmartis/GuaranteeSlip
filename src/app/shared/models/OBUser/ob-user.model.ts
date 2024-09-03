export interface ObUser {
    userId: string;
    userName: string;
    contratoId: string;
    empresaId: string;
    servicioId: string;
    rolI: string;
    empresaRut: string;
    presonaNombre: string;
    subsegmento: string;
}

export interface PE68Response {
    DATA: PE68DATA;
    METADATA: METADATA;
}

export interface PE68DATA {
    rolCode?: string;
    rolName?: string;
    rut: string;
    numper: string;
    email: string;
    name: string;
    paternalLastName?: string;
    maternalLastName?: string;
    address: string;
    phoneNumber?: string;
}
export interface METADATA {
    STATUS: string;
    DESCRIPTION: string;
}

export interface ContextData {
    clientId: string,
    grantType: string,
    introspect: InstrospectData,
    ldap: LDAPData,
    listUserInfo: Userinfo[],
    login: LoginData,
    oauth: OauthToken,
    username: string
}

export interface InstrospectData {
    active: boolean,
    client_id: string,
    exp: number,
    iss: string,
    local_realm: string,
    local_uid: string,
    scope: string[],
    sub: string,
    token_type: string,
    username: string
}

export interface LDAPData {
    cn: string,
    createtimestamp: string,
    givenname: string,
    modifierspasswordname: string,
    sn: string,
    uid: string
}

export interface Userinfo {
    codHalfSafety: string,
    codKindAuthorization: string,
    flgSexMale: string,
    glsMailOb: string,
    glsNameUserEx: string,
    glsSurMatUserExt: string,
    glsSurPatUserExt: string,
    namUserEtcdo: string,
    numUserExtOb: string
}

export interface LoginData {
    accept: string[],
    assertion: string,
    channel: string[],
    clientAddress: string[],
    client_id: string,
    guid: string[],
    is2xx: boolean,
    oauth_type: string,
    refresh_token: string,
    scope: string,
    userAgent: string[],
    username: string,
}

export interface OauthToken {
    access_token: string,
    refresh_token: string
}
