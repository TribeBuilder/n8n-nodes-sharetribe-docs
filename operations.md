# What the node does

Two building blocks: a **trigger** that fires when something happens on your marketplace, and an **action** that does something to your marketplace.

## Sharetribe Trigger

Polls for events from your marketplace.

| Event Type             | Events                                    |
| ---------------------- | ----------------------------------------- |
| Availability Exception | Created, Updated, Deleted                 |
| Booking                | Created, Updated, Deleted                 |
| Listing                | Created, Updated, Deleted                 |
| Message                | Created, Updated, Deleted                 |
| Review                 | Created, Updated, Deleted                 |
| Stock Adjustment       | Created, Updated, Deleted                 |
| Stock Reservation      | Created, Updated, Deleted                 |
| Transaction            | Initiated, Transitioned, Updated, Deleted |
| User                   | Created, Updated, Deleted                 |

## Sharetribe Node

| Resource               | Operations                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Asset                  | Get (translations, email texts, branding, listing fields, listing types, user fields, content pages) |
| Availability Exception | Create, Delete, Get Many                                                                             |
| Image                  | Upload (from file or URL)                                                                            |
| Listing                | Approve, Close, Create, Get, Get Availability, Get Many, Open, Update                                |
| Marketplace            | Get Name                                                                                             |
| Stock                  | Get Adjustments, Get Reservation, Update Quantity                                                    |
| Transaction            | Get, Get Many, Transition, Transition Speculative, Update                                            |
| User                   | Approve, Get, Get Many, Update, Update Permissions, Verify Email                                     |

Assets are marketplace configuration files stored on Sharetribe's CDN, fetchable by alias (`latest`) or specific version ID.
