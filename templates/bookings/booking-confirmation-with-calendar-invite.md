---
title: "Untitled workflow"
description: ""
---
# Untitled workflow

**Category:** [Bookings](/templates/bookings/)

<ClientOnly>
  <TemplateActions slug="booking-confirmation-with-calendar-invite" category="bookings" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/bookings/booking-confirmation-with-calendar-invite.json" />
</ClientOnly>

## How it works

1. A Sharetribe trigger fires whenever a booking is updated on the marketplace.
2. The workflow checks if the booking status is 'accepted'; if not, the flow branches and stops early.
3. Marketplace branding assets (URL, primary color, email footer text) are fetched from Sharetribe and merged with the booking event data.
4. The full booking transaction is retrieved and key email fields (listing, customer, timezone) are extracted.
5. A branded HTML email body is constructed with custom code and rendered into final HTML.
6. A calendar invite (.ics) is generated and attached to a booking confirmation email sent via Gmail.

## Setup steps

- - [ ] Connect your Sharetribe credentials to the trigger node and all Sharetribe action nodes.
- - [ ] Set the correct marketplace URL in the **Marketplace Settings** node.
- - [ ] Connect your Gmail account credentials to the **Send Booking Confirmation** node.
- - [ ] Review the **Build Email Body** and **Generate Calendar Invite** code nodes to ensure field names match your Sharetribe data structure.
- - [ ] Verify the booking status value used in **Check Booking Accepted** matches your Sharetribe transaction process state (e.g., `accepted`).

## Customization

You can update the branding color logic in **Get Branding Color** and the footer in **Get Email Footer Text** to pull from different Sharetribe asset keys. The HTML template in **Render Email HTML** can be redesigned to match your marketplace's style.

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

[← Back to Bookings](/templates/bookings/) · [All workflow templates](/templates)
