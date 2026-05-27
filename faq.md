# FAQ & Troubleshooting

Common questions and the things that catch people out the first time.

## My Sharetribe credential won't save - "401 unauthorized"

You've used the wrong application type. The node needs an **Integration API** application, not a Marketplace API application. They look almost identical in Console.

1. Open [Sharetribe Console > Build > Advanced > Applications](https://console.sharetribe.com/advanced/applications).
2. Confirm the application's type is **Integration API**.
3. If it's not, create a new one.

On the **Extend** plan, you also enter a separate Marketplace API Client ID. It's used to fetch assets (your marketplace config) and doesn't need a secret.

## My trigger doesn't fire when I create a test record

A few things to check, in order:

1. **Is the workflow published?** Triggers only poll when the workflow is published. The "Execute Workflow" button is a one-off manual test, not a way to keep the trigger running.
2. **Heads up about "Execute Workflow":** when you click it, the trigger returns the most recent events on file (not just brand new ones since you clicked). So an old test event you forgot about can fire downstream nodes. To test against a truly new event, publish the workflow and create the record after.
3. **How long has the workflow been published?** The default poll interval is one minute, so wait at least 60 seconds after publishing.
4. **Are you subscribed to the right event?** `user/created` only fires for genuinely new users. Approving an existing pending user fires `user/updated`.
5. **Check Executions** in n8n to see whether the trigger fired and a downstream node silently filtered the event out.

## I get "rate limit exceeded" errors during heavy traffic

Sharetribe's [Integration API has rate limits](https://www.sharetribe.com/api-reference/integration.html#rate-limits). The node handles transient 429s with backoff, but if you have many triggers polling every minute, or a workflow that loops `Get Many` over thousands of records, you can hit the ceiling.

Practical fixes:

- Stretch low-priority poll intervals to every 5 or 15 minutes.
- Use the **Count Only** toggle on `Get Many` where you only need a number.
- Batch downstream Sharetribe actions instead of one-per-event when possible.
- For very high volume, consider splitting work across multiple Sharetribe applications, each with its own rate-limit bucket.

## Polling vs. webhooks - does Sharetribe support webhooks?

Sharetribe Integration API exposes an **events** endpoint that the trigger polls. There are no push webhooks today. The polling-based trigger is the supported pattern.

## Extended data field changes aren't picked up by `Update`

The node serializes the **mode you choose** on the Update node:

- **Manual Mapping** with `details.size` only touches `details.size`.
- **JSON** with `{ "details": { "size": "small" } }` **replaces** the entire `details` object - any keys you didn't include are deleted.

If a field "disappeared", check whether you used JSON mode and shallow-merged over a nested object. See [Concepts → Updating extended data](/concepts#updating-extended-data) for the full mental model.

## How do I delete a single extended data field?

Use the **Delete Fields** section on the Update node. Enter the dot-path (e.g. `publicData.details.weight`). Only that key is removed; everything else is untouched. This is the surgical alternative to nulling, which deletes a whole top-level field.

## How do I test a workflow without sending real emails?

A few options, from quickest to most thorough:

- **Pin output** on the Sharetribe trigger so you can re-run the workflow against a fixed event without waiting for a real one. Right-click the trigger node → Pin output.
- Replace the email/Slack node with a **NoOp** or a **Set** node while iterating on logic.
- For Stripe workflows, use Stripe's **test mode** keys - test-mode `checkout.session.completed` events fire the trigger just like live mode.

## How do I run this on n8n Cloud?

Community nodes are supported on n8n Cloud on certain plans. See [n8n's community-nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) for the current plan rules. The install steps inside n8n are identical to self-hosted.

## I want a feature that isn't here yet

Two paths:

- **Open a GitHub issue** at [tribebuilder/n8n-nodes-sharetribe](https://github.com/tribebuilder/n8n-nodes-sharetribe/issues) with the marketplace job you're trying to solve. Issues are reviewed weekly.
- **Hire help** - the maintainer, [TribeBuilder](https://tribebuilder.dev), is a verified Sharetribe Expert and takes on custom integration work for marketplaces that need a faster turnaround than the open-source roadmap.
