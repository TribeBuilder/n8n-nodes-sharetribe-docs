---
title: "Sync New Users to Mailchimp"
description: ""
---
# Sync New Users to Mailchimp

**Category:** [User Onboarding](/templates/user-onboarding/)

<ClientOnly>
  <TemplateActions slug="sync-new-users-to-mailchimp" category="user-onboarding" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/user-onboarding/sync-new-users-to-mailchimp.json" />
</ClientOnly>

## How it works

1. A Sharetribe trigger fires whenever a new user is created on the Sharetribe marketplace platform.
2. The new user's details are automatically sent to Mailchimp, creating a new member in the specified audience list.

## Setup steps

- - [ ] Connect your Sharetribe account credentials to the **Sharetribe Trigger** node and configure the event (e.g., new user created).
- - [ ] Connect your Mailchimp account credentials to the **Create a member** node.
- - [ ] In the **Create a member** node, select the target Mailchimp audience/list and map the relevant user fields (e.g., email, first name, last name).

## Customization

You can extend the Mailchimp member creation with additional field mappings (e.g., tags, merge fields, or marketing preferences) to enrich subscriber data beyond basic contact info.

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

[← Back to User Onboarding](/templates/user-onboarding/) · [All workflow templates](/templates)
