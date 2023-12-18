import type { Options } from '@wdio/types';
import AllureReporter from '@wdio/allure-reporter';
import * as fs from 'fs';
import RerunService from 'wdio-rerun-service';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [['./features/worker1/*.feature'], ['./features/worker2/*.feature']],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome'
        }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://www.google.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [
            RerunService,
            {
                rerunDataDir: './reRun',
                rerunScriptPath: './reRun/rerun.bat',
                customParameters: './wdio.conf.ts'
            }
        ]
    ],
    framework: 'cucumber',
    reporters: ['spec', ['allure', { outputDir: 'out/allure-result', useCucumberStepReporter: true }]],
    cucumberOpts: {
        require: ['./features/step-definitions/steps.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
        retry: 1
    },
    afterScenario: function (world, result, context) {},

    after: function (result, capabilities, specs) {}
};

// Function to update a node in a JSON file
function updateNode(jsonPath: string, nodeName: string, newValue: any): void {
    // Read the JSON file
    const jsonString = fs.readFileSync(jsonPath, 'utf-8');

    // Parse JSON
    const jsonObject = JSON.parse(jsonString);
    console.log('parseo-->', jsonObject);

    // Update the node
    function update(obj: any, targetNode: string): void {
        for (const prop in obj) {
            // console.log('prop -->', obj);
            // console.log('obj.hasOwnProperty(prop)-->', obj.hasOwnProperty(prop));
            if (obj.hasOwnProperty(prop)) {
                if (prop === targetNode) {
                    console.log('entro');
                    obj[prop] = newValue;
                    return;
                } else if (typeof obj[prop] === 'object') {
                    update(obj[prop], targetNode);
                }
            }
        }
    }
    console.log('nodeName -->', nodeName);
    // Start the update
    update(jsonObject, nodeName);

    // Convert the updated object back to JSON
    const updatedJsonString = JSON.stringify(jsonObject, null, 2);

    // Write back to the file
    fs.writeFileSync(jsonPath, updatedJsonString, 'utf-8');
    console.log('escribo-->', updatedJsonString);
}
