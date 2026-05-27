---
title: "Admin Email on New Paid Transaction"
description: ""
---
# Admin Email on New Paid Transaction

**Category:** [Admin Notifications](/templates/admin-notifications/)

<ClientOnly>
  <TemplateActions slug="admin-email-on-new-paid-transaction" category="admin-notifications" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/admin-notifications/admin-email-on-new-paid-transaction.json" />
</ClientOnly>

## How it works

This workflow monitors Sharetribe transaction events and filters for transactions that have just moved from pre-payment into a confirmed paid state. When a qualifying transaction is found, it gathers the transaction details and marketplace name, formats the relevant fields, and sends an admin email notification through Gmail.

## Setup steps

- Configure the Sharetribe Trigger with the correct Sharetribe credentials and event subscription for transaction transitions.
- Configure the Sharetribe action nodes to use the same marketplace credentials and ensure they can read transactions, transitions, and marketplace metadata.
- Set up the Gmail credential for the admin email sender account.
- Review the IF node conditions so they match the exact Sharetribe transition names used by the marketplace.
- Update the Gmail node recipient, subject, and message body for the admin notification.
- Review Gmail's sending limits ([free Gmail](https://support.google.com/mail/answer/22839) or [Google Workspace](https://support.google.com/a/answer/166852)) to make sure they cover your marketplace's expected volume.

## Customization

You can adjust the fields collected in the Set node, change the paid-transition conditions, or modify the email template and recipients to match the marketplace’s operational process.

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
