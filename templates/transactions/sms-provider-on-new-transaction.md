---
title: "SMS the provider when a new transaction is initiated"
description: ""
---
# SMS the provider when a new transaction is initiated

**Category:** [Transactions](/templates/transactions/)

<ClientOnly>
  <TemplateActions slug="sms-provider-on-new-transaction" category="transactions" source-url="https://github.com/tribebuilder/n8n-nodes-sharetribe/blob/main/workflows/public-templates/published/transactions/sms-provider-on-new-transaction.json" />
</ClientOnly>

## How it works

1. A Sharetribe trigger fires whenever a new transaction is initiated on the marketplace.
2. The marketplace name is fetched from Sharetribe and merged with the transaction event.
3. The full transaction is retrieved with `provider`, `customer`, `listing`, `booking`, `payinTotal`, and `payoutTotal`.
4. **Prepare Provider SMS Fields** flattens and formats everything the SMS needs: listing title, customer name, provider phone, booking times in the listing's timezone, payin/payout as money strings, and the `transactionProcessName`.
5. **Provider Has Phone Number?** drops transactions where the provider has no phone on file.
6. **Route By Process Name** Switch sends each item to the matching **Build * SMS** Set node, which sets `smsBody`.
7. Twilio sends `smsBody` to the provider's phone.

## Setup steps

- - [ ] Connect your Sharetribe credentials to the trigger and all Sharetribe action nodes.
- - [ ] Connect your Twilio account credentials to the **Send SMS To Provider** node and set the `From` number.
- - [ ] Confirm your provider profiles store phone numbers at `profile.protectedData.phoneNumber`. If not, update the `to` expression on the Twilio node.
- - [ ] Configure an error workflow under this workflow's Settings so failed runs alert you instead of silently dropping notifications.
- - [ ] Open each **Build * SMS** Set node and tweak the `smsBody` template to taste.

## Requirements

* Sharetribe marketplace with Integration API credentials
* Twilio account with an SMS-capable phone number
* Provider phone numbers stored on the user profile (typically `protectedData.phoneNumber`)

## Customization

Swap Twilio for MessageBird, Vonage, or another SMS provider supported by n8n. Edit **Prepare Provider SMS Fields** to add fields or change how money and dates are formatted. Edit any of the four **Build * SMS** Set nodes to change wording or rearrange lines for that process type. Add a second SMS node to also notify the customer.

Need help? Visit the [n8n Community](https://community.n8n.io/) or [Sharetribe Docs](https://www.sharetribe.com/docs/).

::: tip Recommended
Set up an [error workflow](https://docs.n8n.io/flow-logic/error-handling/) so you're notified if anything goes wrong - the same step applies to any n8n workflow you run in production.
:::

[← Back to Transactions](/templates/transactions/) · [All workflow templates](/templates)
