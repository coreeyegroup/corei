return {

  json: {

    summary,

    workflow_id:
      "WF-XX",

    workflow_name:
      "WORKFLOW_NAME",

    processing_context: {

      workflow_id:
        "WF-XX",

      workflow_name:
        "WORKFLOW_NAME",

      node_name:
        "NODE_NAME",

      generated_at:
        new Date().toISOString()

    },

    lineage: {

      source_workflow:
        "WF-XX",

      source_node:
        "PREVIOUS_NODE"

    },

    audit: {

      previous_audit:
        $json.audit || null,

      node:
        "NODE_NAME",

      payload_type:
        "PAYLOAD_TYPE",

      summary,

      record_counts: {

      },

      contains: [

      ]

    },

    /*
    ==========================
    BUSINESS PAYLOAD
    ==========================
    */

  }

};
