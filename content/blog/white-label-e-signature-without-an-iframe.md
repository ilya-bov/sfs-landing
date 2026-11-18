---
title: "White-label e-signature: embedding signing in your SaaS without an iframe"
description: "Most embedded e-signature means a vendor's page in an iframe. Here is what it takes to make signing feel native to your product: your UI, your brand, your domain, and one tenant per customer."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

If your product creates contracts for your customers (a booking platform, a staffing tool, an agency CRM), sooner or later someone asks for signatures inside the product. The usual answer is "embedded signing", and the usual implementation is an iframe that loads the e-signature vendor's signing page on top of your app.

That works, and for many teams it is enough. But it has a ceiling, and our first big customer hit it. Alex, CEO of Maroo, put it this way: the best the incumbents offered was an iframe inside his app, and as a platform he had no control over what happened inside it. What he wanted was for people not to realise they were signing with different software at all.

This post is about that second level: what "white-label" has to mean in practice, and how to build it.

## What iframe embedding looks like today

The big vendors are explicit about how their embedding works:

- **DocuSign** returns a [recipient-view URL](https://docusign.docs.buildwithfern.com/docs/esign-rest-api/esign101/concepts/embedding/embedded-signing.md) for one signer, valid for 5 minutes and usable once. You redirect to it, put it in an iframe, or use the Docusign JS "focused view", which is also an iframe. On the [developer pricing page](https://ecom.docusign.com/plans-and-pricing/developer), embedded signing is listed on the Enhanced plan, sold through sales.
- **Dropbox Sign** opens the signing page in an iframe through the `hellosign-embedded` library, locked to the domain registered for your API app, and production needs [app approval](https://developers.hellosign.com/docs/walkthroughs/embedded-signing.md). Removing "Powered by Dropbox Sign" from the signer page is a [Premium feature](https://help.dropbox.com/integrations/add-branding-api-dropbox-sign).
- **SignWell** uses its JavaScript library to show the document in an [iframe](https://developers.signwell.com/reference/embedded-iframe), or redirects.

None of this is wrong. An iframe is a reasonable boundary: the vendor controls the signing experience, keeps it compliant, and ships updates without you. The trade-off is that the signing step looks and behaves like someone else's product, and you get events about it rather than control over it.

## What white-label actually needs

From building this with platform customers, four things matter more than the logo:

1. **The signing UI lives in your product.** It renders in your page, in your layout, next to your navigation, not in a frame on top of it.
2. **Your brand everywhere the signer looks.** The signing page, the emails, and the link itself, which should be on your domain.
3. **Each of your customers is a tenant.** Their contracts, templates, webhooks and branding are separate, and an integration acting for one customer cannot see another's.
4. **The signer can only do what they should.** Fill their own fields, sign, done. Nothing else in the contract is theirs to change.

## How we built it in Sendforsign

### Signing as a React component

The `sendforsign` npm package has a `RecipientView` component. It renders the contract, the recipient's fields and the signing step directly in your React tree and talks to our API itself. You pass the recipient's key, which you get when you add them to a contract:

```tsx
import { RecipientView } from 'sendforsign';

export function SignContractPage({ recipientKey }: { recipientKey: string }) {
  return (
    <RecipientView
      recipientKey={recipientKey}
      onChange={({ status }) => {
        if (status.toLowerCase() === 'signed') {
          // move your own flow forward: confirmation screen, next step, analytics
        }
      }}
    />
  );
}
```

There is no frame and no redirect, and `onChange` tells your page when the status changes, so the next step of your flow can happen immediately. Your backend still gets the same events through webhooks.

If you are not on React, or you send signing links by email, each recipient also has a plain signing link you can show anywhere.

### Your domain and your brand

Signing links can live on your own subdomain, such as `contract.yourdomain.com`, with a [CNAME record](https://sendforsign.com/docs/usecase/recipientdomain). Your logo goes on the emails and the signing page, and the Sendforsign branding can be switched off on Platform. To a signer, the whole thing is your product.

### A tenant per customer

In Sendforsign, your platform holds the API key, each of your customers is a client (`clientKey`), and the people in that customer's business are users (`userKey`). Contracts, templates and webhooks are scoped accordingly, which is what you need when one customer must never see another's documents. If an AI agent works on a customer's behalf through our MCP server, its connection can be limited to that one tenant too.

### Fields that belong to someone

Every field in a contract has an owner: your side, any recipient, or one specific recipient. Your backend fills your side, for example the price, and each signer fills only their own fields, until they sign. The server enforces it: a recipient cannot change the text of the contract, your fields or anyone else's, and nothing changes after signing.

## When an iframe is still the better choice

Be honest about the cost of owning the experience. If you need advanced or qualified electronic signatures with ID verification, the big vendors do that and we do not; we provide simple electronic signatures under eIDAS, ESIGN and UETA. If your volume is a few contracts a month and nobody minds a vendor's page, an iframe is less work.

But if signing is part of your product, the step where your customer's customer commits to something, it is worth making it feel like your product.

The [embedded signing guide](https://sendforsign.com/docs/usecase/embeddocforplatform) shows the full setup, and the Platform plan includes white-label, tenants and the React components.
