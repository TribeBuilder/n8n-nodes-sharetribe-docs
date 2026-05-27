# How it works

## Search filters and sorting

The node learns about your marketplace's [extended data](https://www.sharetribe.com/docs/references/extended-data/) configuration to determine what extended data fields can be used as filter and sort options for Listings, Users and Transactions.

The node also learns your marketplace Listing types, User types, Listing Categories, Transaction transitions and Transaction Processes. These can then be used as Search filters.

**Note:** Only marketplaces using the 'Extend' plan can define custom fields for search and sort on Transactions and Users, see [Search schema](https://www.sharetribe.com/docs/references/extended-data/#search-schema). Public fields on a Listing can be defined as searchable and sortable in the Sharetribe console on any plan.

## Count Only

Get Many operations for Listings, Transactions, Users, and Stock Adjustments support a **Count Only** option that returns just the total number of matching records instead of the full list - useful for conditional logic without fetching data you don't need.

## Response flattening

API responses are automatically simplified into flat, easy-to-use objects with related data merged in.

## Updating extended data

When creating or updating a Listing, Transaction, or User, extended data fields can be added or updated in two modes:

- **Manual Mapping (Recommended)** - add or update individual fields one by one. Only the fields you specify are changed; everything else is left untouched. Supports [dot-notation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set/#support-dot-notation) for nested values (e.g. `details.size`).
- **JSON** - provide a raw JSON object that is merged at the top level only (**shallow merge**). **Use with caution:** if a field already contains a nested object, it will be **fully replaced**, not merged. Top-level fields set to `null` are deleted entirely.

  Example - if `publicData` is currently:

  ```json
  {
      "color": "red",
      "details": { "size": "large", "weight": 5 }
  }
  ```

  and you provide:

  ```json
  {
      "details": { "size": "small" }
  }
  ```

  the result is:

  ```json
  {
      "color": "red",
      "details": { "size": "small" }
  }
  ```

  `weight` is permanently deleted. Use **Manual Mapping** with `details.size` to avoid this.

**Deleting individual fields:** Update operations include a separate **Delete Fields** section. Enter the field path (dot-notation supported). For example, setting the path to `details.weight` removes only that key while leaving the rest of `details` intact.

## Polling

The trigger checks for new events on a schedule. Default is every minute; the interval is configurable on the trigger node.

## Rate limits

Sharetribe limits how many requests you can make to the [Integration API](https://www.sharetribe.com/api-reference/integration.html#rate-limits) per minute. The node automatically slows down and retries if you bump into the limit, so most workflows are fine without changes. A few tips if your marketplace is busy:

- For triggers you don't need to be instant (e.g. weekly admin reports), set the poll interval to every 5 or 15 minutes instead of every minute.
- On the **Get Many** action, switch on **Count Only** when you only need the number, not the records themselves.
- Avoid workflows that pull thousands of records in a loop one after another - batch them or spread them out.
