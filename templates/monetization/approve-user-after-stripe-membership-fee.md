---
title: "Approve user after Stripe membership fee"
description: ""
---
# Approve user after Stripe membership fee

**Category:** [Monetization](/templates/monetization/)

<ClientOnly>
  <TemplateActions slug="approve-user-after-stripe-membership-fee" category="monetization" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/monetization/approve-user-after-stripe-membership-fee.json" />
</ClientOnly>

## How it works

1. A Stripe Checkout completion event triggers the workflow when a customer finishes a payment session.
2. A conditional check verifies that the payment originated from the expected payment link before proceeding.
3. If the condition is met, the workflow approves the corresponding user on the Sharetribe marketplace platform.

## Setup steps

- - [ ] Connect your **Stripe** account and configure the trigger to listen for `checkout.session.completed` events.
- - [ ] Set the condition in **If Expected Payment Link** to match the specific Stripe payment link URL or ID you expect.
- - [ ] Connect your **Sharetribe** account and map the correct user identifier from the Stripe event payload to the approval action.

## Customization

You can extend the workflow by adding a failure branch on the 'If' node (e.g., send a Slack alert or log unexpected payments) when the payment link does not match.

::: tip Recommended
Set up an [error workflow](https://docs.n8n.io/flow-logic/error-handling/) so you're notified if anything goes wrong - the same step applies to any n8n workflow you run in production.
:::

[← Back to Monetization](/templates/monetization/) · [All workflow templates](/templates)
