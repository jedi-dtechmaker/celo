# Vorra — Celo Hackathon Attribution Tag

## Registration Complete ✅

| Detail | Value |
|--------|-------|
| **Project** | Vorra |
| **Hackathon** | Agentic Payments and DeFAI Hackathon |
| **Track** | Most Revenue Generated (Track 1) |
| **Status** | Draft (registered) |
| **Attribution Tag** | `celo_5fdfafd97630` |
| **GitHub** | https://github.com/chidinmaik/vorra-celo |
| **Telegram** | @jedi_dtechmaker |
| **Participant ID** | c2405072-c668-4a62-861f-f9b9fbc8685c |
| **API Key** | sk-celo-hackathon_NTAyw0GXOnuf5YGdAatAm0aE35ZzJjNFg0KCFZwhFR4 |




2d8V6Q2m2coZTOAIVIbOfXXrFQQxpqK8
## How to Use the Attribution Tag

Include this tag in EVERY on-chain transaction your agent sends:

```typescript
import { toDataSuffix } from '@celo/attribution-tags'

// Single tag
await wallet.sendTransaction({ 
  to, 
  value, 
  data: toDataSuffix('celo_5fdfafd97630') 
})

// If you have your own custom tag too, use an array:
await wallet.sendTransaction({ 
  to, 
  value, 
  data: toDataSuffix(['your_existing_code', 'celo_5fdfafd97630']) 
})
```

## Leaderboard

Check your tagged transactions: https://dune.com/celo/agentic-payments-defai-hackathon

## Remaining Submission Requirements

These fields are needed before publishing (not required for tag tracking):
- [ ] Twitter/X registration post link
- [ ] ERC-8004 Agent ID URL
- [ ] Agent Wallet Address (Celo mainnet)
- [ ] Demo URL
- [ ] Video URL (optional)

## Reference

- [Hackathon Submission Doc](../docs/09-hackathon-submission.md)
- [Celo Attribution Tags SDK](https://www.npmjs.com/package/@celo/attribution-tags)

