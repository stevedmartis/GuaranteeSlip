#!groovy
@Library(['jobs-libraries@master','deploy-libraries@master']) _

runPipelineWithParams (
    [
        PPM: 'INI-000',
        PROJECT_CODE: 'FOB',
        PROJECT_MODULE: 'BoletaGarantia',
        PROJECT_TYPE: 'azure/webapp/angular',
        AZURE_RESTART_WEBAPP_POST_INSTALLATION: true,
        // configuracion de despliegue a azure
        NPM_BUILD_COMMAND: 'ng build --base-href=/BoletaGarantia/ --deploy-url=/BoletaGarantia/',
        AZURE_DEPLOY_TARGET_PATH: '/BoletaGarantia',
        AZURE_PARAMETERS_FILE: 'properties.js',
        //Solo para secretos desde el Vault externo a Jenkins
        INJECT_VAULT_SECRETS: true,
        // Configutacion de Angular y Analisis de codigo
        NPM_INSTALL_COMMAND: 'npm i --verbose',
        ANGULAR_OUTPUT_PATH: 'dist/BoletaGarantia',
        SKIP_KIUWAN_CODE_ANALYSIS: true,
        SECURITY_TOOL: 'FORTIFYSSC',
        FUNCTIONAL_TEST: 'false',
        //Parámetros para la publicación de reportes UNIT TEST en Jira® Software
		ID_PROJECT: '',
		ID_TEST_PLAN: '',
		ID_TEST: '',
		CORREOS: ''
    ]
)