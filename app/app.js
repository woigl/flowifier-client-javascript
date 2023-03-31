/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const Flowifier = require('../lib');

const main = async () => {
    if (!process.env.ACCESS_TOKEN) {
        console.error('Environment variable ORGANIZATION_TOKEN is not set!');
        return;
    }

    const accessToken = process.env.ACCESS_TOKEN;

    const flowifier = new Flowifier(accessToken, { appUrl: 'http://127.0.0.1:8080' });

    console.log('--- Get Workflows -------------------------------------------------');

    const workflows = await flowifier.getWorkflows();
    console.log('Workflows:', workflows);

    console.log();
    console.log('--- Get Workflow --------------------------------------------------');

    const singleWorkflow = await flowifier.getWorkflow('6421cf880cf9779f8ddf1941');
    console.log(`${singleWorkflow.id}: ${singleWorkflow.name}`);

    console.log();
    console.log('--- Create Workflow Instance --------------------------------------');

    const beginTS = new Date();

    const contextObj = {
        firstname: 'JavaScript',
        lastname: 'Client Library',
    };

    const workflowInstance = await flowifier.executeWorkflow(singleWorkflow.id, contextObj);

    console.log(`New Workflow Instance Id: ${workflowInstance.id}`);
    const workflowInstanceId = workflowInstance.id;

    console.log();
    console.log('--- Get Workflow Instance Status ----------------------------------');

    let workflowInstanceStatus = 'initial';

    do {
        workflowInstanceStatus = await flowifier.getWorkflowInstanceStatus(workflowInstanceId);
        if (workflowInstanceStatus !== 'finished') {
            console.log(`Workflow Instance Status: ${workflowInstanceStatus}`);
        } else {
            console.log(`Workflow Instance Status: ${workflowInstanceStatus} [${(new Date() - beginTS) / 1000} sec.]`);
        }

        // eslint-disable-next-line no-promise-executor-return
        await new Promise((r) => setTimeout(r, 500));
    } while (workflowInstanceStatus !== 'finished' && workflowInstanceStatus !== 'failed');

    if (workflowInstanceStatus === 'finished') {
        console.log();
        console.log('--- Get Workflow Instance Result ----------------------------------');

        const workflowInstanceResult = await flowifier.getWorkflowInstanceResult(workflowInstanceId);
        console.log('Workflow Instance Result:', workflowInstanceResult);
    }

    console.log();
    console.log('--- FINISHED ------------------------------------------------------');
};

main();
