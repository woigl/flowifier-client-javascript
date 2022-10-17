# Flowifier Client Library for JavaScript

This library gives you a seemless integration of the [Flowifier application](http://flowifier.com) into your code.

It allows you to:
- List all workflows for a specific organisation
- Retrieving the workflow details of a specific workflow
- Executing a workflow by creating a workflow instance
- Retrieving the workflow instance status
- Retrieving the workflow instance result if successful finished

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)

## Usage

### Retrieving all workflows

This example shows you how to list all workflows for your organization.

```javascript
const organizationId = '<YOUR-ORGANIZATION-ID>';
const organizationToken = '<YOUR-ORGANIZATION-ACCESS-TOKEN>';

const flowifier = new Flowifier(organizationId, organizationToken);

var workflows = await flowifier.getWorkflows();
console.log(workflows);
```

This example shows you how to list execute a workflow.

```javascript
const organizationId = '<YOUR-ORGANIZATION-ID>';
const organizationToken = '<YOUR-ORGANIZATION-ACCESS-TOKEN>';
const workflowId = '<YOUR-WORKFLOW-ID>';

const flowifier = new Flowifier(organizationId, organizationToken);

const context = {
    name: 'John Doe',
    age: 31
}

var workflowInstanceId = await flowifier.executeWorkflow(workflowId, context);
console.log('New Workflow Instance Id:'workflowInstanceId);
```

## Installation

`npm install @flowifier/flowifier-client`