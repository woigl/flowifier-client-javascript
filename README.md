# Flowifier Client Library for JavaScript

[![npm version](https://img.shields.io/npm/v/@flowifier/flowifier-client?style=flat-square)](https://www.npmjs.org/package/@flowifier/flowifier-client)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@flowifier/flowifier-client&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.com/result?p=@flowifier/flowifier-client)

This library gives you a seemless integration of the [Flowifier application](https://flowifier.com) into your code.

It allows you to:

-   List all workflows
-   Retrieving the workflow details of a specific workflow
-   Executing a workflow by creating a workflow instance
-   Retrieving the workflow instance status
-   Retrieving the workflow instance result if successful finished

## Table of Contents

-   [Usage](#usage)
-   [Installation](#installation)

## Usage

### Retrieving all workflows

This example shows you how to list all workflows.

```javascript
const accessToken = '<YOUR-ACCESS-TOKEN>';

const flowifier = new Flowifier(accessToken);

var workflows = await flowifier.getWorkflows();
console.log(workflows);
```

This example shows you how to list execute a workflow.

```javascript
const accessToken = '<YOUR-ACCESS-TOKEN>';
const workflowId = '<YOUR-WORKFLOW-ID>';

const flowifier = new Flowifier(accessToken);

const context = {
    name: 'John Doe',
    age: 31
}

var workflowInstanceId = await flowifier.executeWorkflow(workflowId, context);
console.log('New Workflow Instance Id:'workflowInstanceId);
```

## Installation

`npm install @flowifier/flowifier-client`
