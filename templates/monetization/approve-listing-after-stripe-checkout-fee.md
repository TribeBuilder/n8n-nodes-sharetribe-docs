---
title: "Approve Listing After Stripe Checkout Fee Paid"
description: ""
---
# Approve Listing After Stripe Checkout Fee Paid

**Category:** [Monetization](/templates/monetization/)

<ClientOnly>
  <TemplateActions slug="approve-listing-after-stripe-checkout-fee" category="monetization" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/monetization/approve-listing-after-stripe-checkout-fee.json" screenshot="/img/templates/approve-listing-after-stripe-checkout-fee.png" />
</ClientOnly>

## How it works

1. The workflow is triggered when a Stripe Checkout session completes.
2. A conditional check verifies whether the payment came from the expected payment link.
3. If the check passes, the corresponding Sharetribe listing is approved.

## Setup steps

- - [ ] Connect your Stripe account and configure the Stripe Trigger to listen for `checkout.session.completed` events.
- - [ ] In the 'Check Is Expected Payment Link' node, set the condition to match your specific Stripe Payment Link ID or URL.
- - [ ] Connect your Sharetribe account and configure the 'Approve Sharetribe Listing' node with the correct listing ID mapping from the Stripe payload.

## Customization

You can extend the workflow by adding a branch for failed checks (e.g., sending an alert or logging unexpected payments). You could also add a notification step after the Sharetribe listing is approved.

::: tip Recommended
Set up an [error workflow](https://docs.n8n.io/flow-logic/error-handling/) so you're notified if anything goes wrong - the same step applies to any n8n workflow you run in production.
:::

[← Back to Monetization](/templates/monetization/) · [All workflow templates](/templates)
