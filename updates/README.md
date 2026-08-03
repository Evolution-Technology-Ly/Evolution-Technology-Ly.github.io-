# Product update manifests

Each EvoTech product publishes **one JSON file in this directory** describing its
current release. Installed copies poll their own file and tell the customer when a
newer version exists.

    https://evotech.ly/updates/<product>.json

| Product     | File                | Consumer                       |
| ----------- | ------------------- | ------------------------------ |
| EvoCommerce | `evocommerce.json`  | the ERP's update-check service |
| _(EvoDMS)_  | `evodms.json`       | _reserved_                     |

## Why one file per product

Not a single combined manifest, deliberately:

- **No write races.** Two products releasing on the same day would otherwise both
  edit one file and conflict.
- **Blast radius.** A malformed edit to one product's file cannot stop another
  product's customers from checking for updates.
- **Smaller payloads** for shops on slow or intermittent connections.

## Publishing is a deliberate, manual step

CI builds and pushes the Docker images. **Editing this file is what releases them
to customers.** The two are kept separate on purpose:

- It is the staged-rollout lever. Push images, sit on them, and update the manifest
  only when you are ready for shops to be told.
- It avoids storing a token with write access to the public company website inside a
  product's CI. A convenience worth a few seconds is not worth that blast radius.

So after every release, edit the `latest`, `releasedAt` and `notes` fields here.
A release whose manifest is never updated is invisible to customers.

## Schema

```jsonc
{
  "schemaVersion": 1,          // bump only on a breaking shape change
  "product": "evocommerce",    // must match the file name
  "latest": "1.4.0",           // semver; what an up-to-date install runs
  "releasedAt": "2026-08-03T17:03:00Z",   // ISO-8601 UTC
  "minSupported": "1.0.0",     // ADVISORY ONLY — see below
  "mandatory": false,          // ADVISORY ONLY — see below
  "notes": {                   // short, customer-facing, both languages
    "ar": "...",
    "en": "..."
  },
  "notesUrl": null             // optional link to fuller release notes
}
```

### `minSupported` and `mandatory` are advisory

They are metadata for display and for the vendor's own reporting. **They must never
gate use of the application.**

A shop that has been offline for a week, or that has a till session someone forgot to
close, must not discover it has been locked out of its own point of sale. Licensing is
already fail-closed; stacking a second fail-closed gate on top of it is how a customer
loses a trading day over a version number.

### Consumer expectations

A client reading this file should:

- **Fail quiet.** These shops are offline-prone by design. A failed fetch is the normal
  case, not an error worth showing anyone.
- **Compare parsed versions, not strings.** `"1.10.0"` is newer than `"1.9.0"`, which
  string comparison gets backwards.
- **Do nothing when its own version is unknown.** A development build with no stamped
  version must not report itself as out of date.
- **Tolerate unknown fields**, so this schema can grow without breaking older installs.
