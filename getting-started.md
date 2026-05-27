# Getting Started

## 1. Get an n8n instance

**n8n Cloud** is the easiest: [start a free trial](https://n8n.partnerlinks.io/n8n-nodes-sharetribe).

Want to self-host? [Render](https://render.com) is a common pick - [Render's n8n deploy doc](https://render.com/docs/deploy-n8n). Other options in [n8n's hosting guides](https://docs.n8n.io/hosting/installation/server-setups/).

## 2. Install the Sharetribe node

Verified community nodes install straight from n8n's node picker.

1. In n8n, open the editor and click **+** to open the **Nodes panel**.
2. Search **Sharetribe**.
3. Pick the result with the verified badge.
4. Click **Install node**.

## 3. Get Integration API credentials

Available on **Build**, **Pro**, and **Extend** (including the free trial).

1. Open [Sharetribe Console → Build → Advanced → Applications](https://console.sharetribe.com/advanced/applications).
2. Add a new application of type **Integration API**.
3. Copy the **Client ID** and **Client secret**.

::: warning
Keep the secret inside n8n's credentials settings. Don't paste it anywhere else.
:::

## 4. Add the credential in n8n

In n8n: **Credentials → New → Sharetribe Integration API**.

**Extend plan (also Build, Trial):**
- Paste your Integration API Client ID and Client Secret.
- **Sharetribe Plan:** Extend.
- **Marketplace API Client ID:** create a second application of type **Marketplace API** in Console and paste its Client ID here.

**Pro plan:**
- Paste your Integration API Client ID and Client Secret.
- **Sharetribe Plan:** Pro.
- **Marketplace URL:** your marketplace URL (e.g. `https://example.com`).

## 5. Build your first workflow

New to n8n? See [n8n's Try it out guide](https://docs.n8n.io/try-it-out/).

## Next

- [Workflow templates](/templates) - copy and paste a ready-made workflow.
- [FAQ](/faq) - common gotchas.
