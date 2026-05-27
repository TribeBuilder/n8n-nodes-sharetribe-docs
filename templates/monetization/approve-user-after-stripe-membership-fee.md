---
title: "Approve User After Stripe Membership Fee"
description: ""
---
# Approve User After Stripe Membership Fee

**Category:** [Monetization](/templates/monetization/)

<ClientOnly>
  <TemplateActions slug="approve-user-after-stripe-membership-fee" category="monetization" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/monetization/approve-user-after-stripe-membership-fee.json" />
</ClientOnly>

## How it works

1. The Stripe trigger fires when a Stripe Checkout session is completed.
2. The Sharetribe action reads the Sharetribe user id from the checkout session's `client_reference_id` and approves the user.
3. The user's state moves from `pendingApproval` to `active`. If you have enabled the "User approved" notification in Sharetribe Console, Sharetribe sends the welcome email automatically.

## Setup steps

- Connect a Stripe credential.
- Connect a Sharetribe credential using your Integration API Client ID and Client Secret from [Console > Build > Applications](https://console.sharetribe.com/advanced/applications).
- In Sharetribe Console > Build > General, turn on "Require user approval" so new users start in `pendingApproval`.
- In Sharetribe Console > Build > Content > Email notifications, enable the "User approved" notification so members receive the welcome email when this workflow approves them.
- Create the Stripe Checkout product or price you sell as the membership fee.
- When you create the Stripe Checkout session from your frontend or backend, pass the Sharetribe user id as `client_reference_id`. That is the field this workflow reads to know which user to approve.
- Start the trigger in **Test** mode to validate against a Stripe test checkout, then switch to **Live** when you're ready to publish.

## Customization

- Add a Sharetribe action after approval to tag the member, grant permissions, or move them into a specific user type so they land in the right experience.
- Filter for a specific Stripe product or price id with an IF node if you sell more than one item through Stripe Checkout and only the membership purchase should trigger approval.
- Author your own welcome email in Sharetribe Console under Build > Content > Email texts and reference it from a custom email step instead of relying on the built-in notification.

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

[← Back to Monetization](/templates/monetization/) · [All workflow templates](/templates)
