# CONNECTORS.md — da-invest

**Authority:** Dofrane (CEO) · **Custodian:** Mike (CAIO)
**Law:** Six connectors, no exceptions. A project that needs a 7th connector needs written
exception from Dofrane first.

Canonical six: **Railway · Supabase · GitHub · OpenRouter · Notion · Google Drive**

## This project

| Connector | Used | What for |
|---|---|---|
| GitHub | Yes | Source of record, `House-of-Dofrane/da-invest` |
| Supabase | Planned | Auth, only if the gated deal room survives decision D3 at Phase 4 |
| Railway | No | — |
| OpenRouter | Yes | Analysis tooling only, never at runtime |
| Notion | No | Copy is hardcoded per D4 |
| Google Drive | No | — |

## Exception — Vercel (2026-09-09, ruling D7)

| Connector | Used | What for |
|---|---|---|
| **Vercel** (team HOD) | Yes | Hosts the Dofrane Acquisitions investor surface |

The seventh connector is authorised by the Chairman's ruling D7 of 2026-09-09, taken on the Phase 0
audit of the website directive of 2026-09-07. Precedent: the identical exception granted for the
Wholesale Command Center on 2026-09-08, recorded in `HOD_WHOLESALE/CONNECTORS.md`.

**Reasoning of record.** Railway is the connector-law host, and no exception would have been needed
to use it. It was not chosen because every Node and static surface in the estate already runs on
Vercel while every Railway service is Python/uvicorn; because a static marketing surface on Railway
converts a free edge deploy into paid always-on compute; and because the domain flip for this brand
is already staged against Vercel. The one argument for Railway — a private repo carries no premium
there, whereas Vercel forces a $20/mo upgrade — is answered by keeping this repo public, the same
ruling already taken for `da-web`.

Any further connector requires a new written exception before code lands.
