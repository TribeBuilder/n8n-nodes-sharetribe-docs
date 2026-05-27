---
title: "Admin Email on New Dispute"
description: ""
---
# Admin Email on New Dispute

**Category:** [Admin Notifications](/templates/admin-notifications/)

<ClientOnly>
  <TemplateActions slug="admin-email-on-new-dispute" category="admin-notifications" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/admin-notifications/admin-email-on-new-dispute.json" />
</ClientOnly>

## How it works

1. A Sharetribe trigger fires whenever a new transaction transition occurs on the platform.
2. A conditional check filters transitions to only proceed when the transition represents a dispute.
3. Full dispute details are fetched from Sharetribe using the transaction ID.
4. Key fields (transaction ID, last transition, timestamp, listing title) are extracted and prepared for the email.
5. A Gmail alert is sent to the admin summarising the new dispute.

## Setup steps

- - [ ] Connect your Sharetribe account credentials to the trigger and fetch nodes.
- - [ ] Configure the trigger to listen on the correct Sharetribe marketplace environment.
- - [ ] Update the 'Check Dispute Transition' IF node with the exact transition name(s) that represent a dispute in your process.
- - [ ] Connect your Gmail account credentials to the 'Send Dispute Alert' node.
- - [ ] Set the recipient admin email address and customise the email subject/body in the Gmail node.

## Customization

You can extend the 'Prepare Email Fields' Set node to include additional fields (e.g. customer name, disputed amount) or swap the Gmail node for another email/notification provider such as SendGrid or Slack.

## Import this workflow

The fastest way: click **Copy template JSON** above, then paste it onto your n8n workflow canvas.

Step by step:

1. Click **Copy template JSON** above (or **Download JSON** to save the file).
2. In n8n, open a new workflow.
3. Paste with **Ctrl/Cmd+V** directly on the canvas. n8n imports every node, sticky note, and connection.
4. Reconnect the credentials called out in the setup steps above.
5. Click **Publish** in the top-right to turn the workflow on.

::: tip Recommended
Set up an [error workflow](https://docs.n8n.io/flow-logic/error-handling/) so you're notified if anything goes wrong - the same step applies to any n8n workflow you run in production.
:::

[← Back to Admin Notifications](/templates/admin-notifications/) · [All workflow templates](/templates)
