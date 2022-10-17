require('dotenv').config()
const Flowifier = require('../lib')

const main = async () => {
    if (!process.env.ORGANIZATION_ID) {
        console.error('Environment variable ORGANIZATION_ID is not set!')
        return
    }

    if (!process.env.ORGANIZATION_TOKEN) {
        console.error('Environment variable ORGANIZATION_TOKEN is not set!')
        return
    }

    const organizationId = process.env.ORGANIZATION_ID
    const organizationToken = process.env.ORGANIZATION_TOKEN

    const flowifier = new Flowifier(organizationId, organizationToken, { appUrl: "http://127.0.0.1:8080" })

    console.log("--- Get Workflows -------------------------------------------------")

    var workflows = await flowifier.getWorkflows()
    console.log(workflows)

    console.log()
    console.log("--- Get Workflow --------------------------------------------------")

    var singleWorkflow = await flowifier.getWorkflow('62fb457b198284c3c5009001')
    console.log(`${singleWorkflow.id}: ${singleWorkflow.name}`)

    console.log();
    console.log("--- Create Workflow Instance --------------------------------------");

    const beginTS = new Date()

    const contextObj = {
        'firstname': 'JavaScript',
        'lastname': 'Client Library'
    }

    const workflowInstance = await flowifier.executeWorkflow("62fb457b198284c3c5009001", contextObj);

    console.log(`New Workflow Instance Id: ${workflowInstance.id}`);
    var workflowInstanceId = workflowInstance.id;

    console.log();
    console.log("--- Get Workflow Instance Status ----------------------------------");

    var workflowInstanceStatus = "initial";

    do {
        workflowInstanceStatus = await flowifier.getWorkflowInstanceStatus(`62fb457b198284c3c5009001`, workflowInstanceId)
        if (workflowInstanceStatus != "finished") {
            console.log(`Workflow Instance Status: ${workflowInstanceStatus}`)
        } else {
            console.log(`Workflow Instance Status: ${workflowInstanceStatus} [${(new Date() - beginTS)/1000} sec.]`)
        }

        await new Promise(r => setTimeout(r, 500));
    } while (workflowInstanceStatus != "finished" && workflowInstanceStatus != "failed");

    if (workflowInstanceStatus == "finished") {

        console.log();
        console.log("--- Get Workflow Instance Status ----------------------------------");

        var workflowInstanceResult = await flowifier.getWorkflowInstanceResult("62fb457b198284c3c5009001", workflowInstanceId)
        console.log('Workflow Instance Status:', workflowInstanceResult)
    }

    console.log();
    console.log("--- FINISHED ------------------------------------------------------")
}

main()