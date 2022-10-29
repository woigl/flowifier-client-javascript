const axios = require("axios")
const BSON = require('bson')

/**
 * @typedef {Object} FlowifierOptions
 * @property {string} [appUrl] Application URL - If not supplied, then default will be used.
 */

const verifyResponse = (response) => {
    if (response.status != 200 && response.status != 201) {
        throw new Error("Request failed with code ${response.status}.")
    }
}

const deserializeBody = (response) => {
    var content = null

    if (response.headers['content-type'].startsWith('application/json')) {
        content = response.data
    } else if (response.headers['content-type'] === 'application/bson') {
        content = BSON.deserialize(response.data)
    } else {
        throw new Error(`Unhandled content type '${response.headers['content-type']}' received.`)
    }

    if (content.status !== 'success') {
        throw new Error(`Request failed with '${response.data.status} - ${response.data.message}'`)
    }
    
    return response.data
}

const verifyResponseAndDeserializeBody = (response) => {
    verifyResponse(response)
    return deserializeBody(response)
}

/**
 * The Flowifier client class provides you a quick way to interact with the Flowifier API.
 */
class Flowifier {

    /**
     * Constructor for the Flowifier class.
     * @param {string} organizationId the organization identifier.
     * @param {string} organizationToken the organization token.
     * @param {FlowifierOptions} options additonal options to configure the Flowifier client class.
     */
    constructor(organizationId, organizationToken, options = {}) {
        this.organizationId = organizationId
        this.organizationToken = organizationToken
        const { appUrl } = options
        this.appUrl = appUrl ?? "https://app.flowifier.com"
    }

    /**
     * Returns an array of workflows.
     * @returns {object[]} the array containing the workflows.
     * @throws {Error} if the request to the Flowifier API failed.
     */
    async getWorkflows() {
        // 1) Build Uri
        const uri = `${this.appUrl}/api/v1/organizations/${this.organizationId}/workflows`

        // 2) Prepare Request
        const request = axios.get(uri, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${this.organizationToken}`
            },
            params: {
                'fields': 'name'
            }
        })

        // 3) Request
        const response = await request

        // 4) Verify and Extract Data from Response
        const jSend = verifyResponseAndDeserializeBody(response)

        // 5) Return Data
        return jSend.data.data
    }

    /**
     * Returns a workflow for the supplied workflowId.
     * @param {string} workflowId the identifier for the requested workflow.
     * @returns {object} the workflow.
     * @throws {Error} if the request to the Flowifier API failed.
     */
    async getWorkflow(workflowId) {
        // 1) Build Uri
        const uri = `${this.appUrl}/api/v1/organizations/${this.organizationId}/workflows/${workflowId}`

        // 2) Prepare Request
        const request = axios.get(uri, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${this.organizationToken}`
            },
            params: {
                'fields': 'name'
            }
        })

        // 3) Request
        const response = await request

        // 4) Verify and Extract Data from Response
        const jSend = verifyResponseAndDeserializeBody(response)

        // 5) Return Data
        return jSend.data.data
    }

    /**
     * Executes a with the supplied workflowId.
     * @param {string} workflowId the identifier for the requested workflow.
     * @param {object} contextObj the object to be used as the initial context for the new workflow instance.
     * @returns {string} the workflow identifier for the newly created workflow instance.
     * @throws {Error} if the request to the Flowifier API failed.
     */
    async executeWorkflow(workflowId, contextObj) {
        // 1) Build Uri
        const uri = `${this.appUrl}/api/v1/organizations/${this.organizationId}/workflows/${workflowId}/instances`

        // 2) Prepare Request
        const body = {
            createdBy: 'JavaScript Client Library',
            context: contextObj
        }
        const request = axios.post(uri, BSON.serialize(body), {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${this.organizationToken}`,
                //'content-type': 'application/json',
                'content-type': 'application/bson'
            }
            //body: contextObj
        })

        // 3) Request
        const response = await request

        // 4) Verify and Extract Data from Response
        const jSend = verifyResponseAndDeserializeBody(response)

        // 5) Return Data
        return jSend.data.workflowInstance
    }

    /**
     * Get the execution status of the workflow instance.
     * @param {string} workflowInstanceId the workflow instance identifier.
     * @returns {string} the workflow instance status.
     * @throws {Error} if the request to the Flowifier API failed.
     */
    async getWorkflowInstanceStatus(workflowInstanceId) {
        // 1) Build Uri
        const uri = `${this.appUrl}/api/v1/organizations/${this.organizationId}/instances/${workflowInstanceId}`

        // 2) Prepare Request
        const request = axios.get(uri, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${this.organizationToken}`
            },
            params: {
                'fields': 'status'
            }
        })

        // 3) Request
        const response = await request

        // 4) Verify and Extract Data from Response
        const jSend = verifyResponseAndDeserializeBody(response)

        // 5) Return Data
        return jSend.data.workflowInstance.status
    }

    /**
     * Get the result of the workflow instance.
     * @param {string} workflowInstanceId the workflow instance identifier.
     * @returns {object} the workflow instance result.
     * @throws {Error} if the request to the Flowifier API failed.
     */
    async getWorkflowInstanceResult(workflowInstanceId) {
        // 1) Build Uri
        const uri = `${this.appUrl}/api/v1/organizations/${this.organizationId}/instances/${workflowInstanceId}/result`

        // 2) Prepare Request
        const request = axios.get(uri, {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${this.organizationToken}`
            },
            params: {
                'fields': 'status'
            }
        })

        // 3) Request
        const response = await request

        // 4) Verify and Extract Data from Response
        const jSend = verifyResponseAndDeserializeBody(response)

        // 5) Return Data
        return jSend.data.workflowInstanceResult
    }
}

module.exports = Flowifier