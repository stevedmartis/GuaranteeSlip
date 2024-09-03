let HOSTNAME_MOCKS = "http://localhost:3001"
let HOSTNAME_FRAME = "https://apideveloper.santander.cl";

let propertiesFrame = {
    "AMBIENTE": "Produccion",
    "IS_PRODUCTION": true,
    "API_KEY_SECRET": "",
    "CONTEXT_SERVICE_URL": `${HOSTNAME_FRAME}/sancl/privado/v1/hz_conntext`,
    "INITIAL_CONDITIONS": `${HOSTNAME_MOCKS}/sancl/privado/v1/initialConditions`,
    "ACCEPT_CONDITIONS": `${HOSTNAME_MOCKS}/sancl/privado/v1/acceptConditions`
}
