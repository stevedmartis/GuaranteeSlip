let HOSTNAME_MOCKS = "http://localhost:3001"
let HOSTNAME_FRAME = "https://apideveloper.santander-homo.cl";

let propertiesFrame = {
    "AMBIENTE": "Homologacion",
    "IS_PRODUCTION": false,
    "API_KEY_SECRET": "",
    "CONTEXT_SERVICE_URL": `${HOSTNAME_FRAME}/sancl/privado/v1/hz_conntext`,
    "INITIAL_CONDITIONS": `${HOSTNAME_MOCKS}/sancl/privado/v1/initialConditions`,
    "ACCEPT_CONDITIONS": `${HOSTNAME_MOCKS}/sancl/privado/v1/acceptConditions`
}