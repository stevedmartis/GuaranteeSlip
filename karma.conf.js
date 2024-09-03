/*
  * Archivo de Configuración de Karma Test Runner
  * Por favor, siga las instrucciones descritas en el README.md
*/

module.exports = function (config) {
	config.set({
	  basePath: '',
	  frameworks: ['jasmine', '@angular-devkit/build-angular'],
	  plugins: [
		require('@angular-devkit/build-angular/plugins/karma'),
		require('karma-chrome-launcher'),
		require('karma-coverage-istanbul-reporter'),
		require('karma-html-reporter'),
		require('karma-jasmine'),
		require('karma-jasmine-html-reporter'),
		require('karma-junit-reporter')
	  ],
  
	  // Importaciones de Librerías Externas (JQuery, Bootstrap, Jspdf, etc)
	  files: [
		// Ejemplo: "../node_modules/jquery/dist/jquery.slim.min.js",
	  ],
  
	  client: {
		jasmine: {
		  random: false // Desactiva la ejecución aleatoria
		},
		clearContext: false // Permite la salida de Jasmine Spec Runner en el navegador === false
	  },
  
	  // Reporte de Cobertura Karma HTML y XML para DevOps CI/CD
	  coverageIstanbulReporter: {
		dir: require('path').join(__dirname, 'karma_report/reporte_cobertura'), // Path donde se alojará el reporte cobertura. Debe apuntar a carpeta raíz
		reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
		fixWebpackSourcePaths: true,
  
		// Umbrales de Cobertura(%)
		thresholds: {
		  emitWarning: false,
		  global: {
			statements: 30,
			branches: 30,
			functions: 30,
			lines: 30
		  },
		},
	  },
  
	  // Reporte JUnit XML para DevOps CI/CD
	  junitReporter: {
		outputDir: 'karma_report', // Path donde se alojará el reporte .xml. Debe apuntar a carpeta raíz
		useBrowserName: false, // Agregar nombre del navegador al nombre del reporte === true
		outputFile: 'unit-test-report.xml', // Nombre del reporte que se mostrará en Jenkins
	  },
  
	  // Reporte Karma HTML para DevOps CI/CD
	  htmlReporter: {
		outputDir: 'karma_report', // Path donde se alojará el reporte html. Debe apuntar a carpeta raíz
		focusOnFailures: true,
		urlFriendlyName: false,
		reportName: 'karma_html', // Nombre del reporte que se mostrará en Jenkins
	  },
  
	  reporters: ['progress', 'kjhtml', 'junit', 'html'],
	  autoWatch: true,
	  browsers: ['Chrome'],
	  colors: true,
	  logLevel: config.LOG_INFO,
	  port: 9876,
	  restartOnFileChange: true,
  
	  // Browser para DevOps CI/CD
	  customLaunchers: {
		MyChromeHeadless: {
		  base: 'ChromeHeadless',
		  flags: [
			'--disable-web-security',
			'--no-sandbox',
			'--proxy-auto-detect'
		  ]
		}
	  },
  
	  singleRun: false, // Ejecutar watch mode de Karma
	})
  }
  