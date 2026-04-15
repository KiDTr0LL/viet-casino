# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese Card Games 3D Casino. React Native mobile app with React Three Fiber (R3F) 2.5D/3D rendering, hosting traditional Vietnamese card games (Tiến Lên and Mậu Binh). Backend: Node.js + Colyseus + PostgreSQL. Monorepo (npm workspaces).

## Dev Commands

```bash
# Workspace root
npm install          # Install all packages

# Mobile app (Expo Router)
cd apps/mobile-rn
npx expo start       # Dev server
npx expo run:android # Run on Android
npx expo run:ios     # Run on iOS
npx expo build        # Production build

# Run a single test file
npx jest --testPathPattern="auth.test.ts"

# Server
cd server
npx prisma migrate dev
npx prisma studio           # DB browser
npm run dev                 # Colyseus + API

# Game SDK (unit tests)
cd packages/game-sdk
npx jest

# All tests
npm test
```

## Architecture

```
viet-cards-3d-casino/
├── apps/mobile-rn/          # React Native app
│   ├── app/                 # Screens (Expo Router file-based routing)
│   ├── components/          # Reusable 2D UI components
│   ├── 3d/                  # R3F 3D components (Canvas/, Cards/, Tables/, Effects/)
│   ├── hooks/               # Custom hooks
│   ├── contexts/            # Auth, Currency, Game contexts (Zustand)
│   └── services/            # API client + r3fBridge (RN ↔ 3D communication)
├── server/                  # Node.js backend
│   ├── prisma/              # Schema + migrations
│   └── src/
│       ├── api/             # REST endpoints (auth, currency, skins)
│       ├── colyseus/        # GameRoom multiplayer logic
│       └── services/        # UserRepository, SkinService, CurrencyService
├── packages/
│   ├── game-sdk/            # Shared pure-TS game logic (Card, Deck, Rules, AI)
│   └── shared-types/        # TypeScript interfaces (User, Skin, Transaction)
└── docs/                    # PRD.md (source of truth), status docs
```

## Key Technical Decisions

- **Mobile:** React Native 0.73+, Expo Router v4, React Three Fiber (R3F), Zustand for state
- **3D:** `@react-three/drei` + `useGLTF` for GLB models (Kenney.nl CC0 assets), `<Html>` for 2D overlays in 3D canvas, Rapier/Framer Motion for animations
- **Multiplayer:** Colyseus WebSocket rooms; bots auto-fill if slots < 4 after 30s
- **Database:** PostgreSQL + Prisma ORM; server owns game state validation (anti-cheat)
- **RN ↔ 3D Bridge:** `services/r3fBridge.ts` — React Context passed into Canvas; `triggerEffect`, `updateCardHand`, `setGamePhase` go RN→3D; `onCardSelected`, `onGameComplete` go 3D→RN
- **Assets:** Kenney.nl Playing Cards Pack (CC0) for 3D card models; Poly Haven (CC0) for textures; download to `apps/mobile-rn/public/models/`
- **No real gambling:** Gold and Diamonds are separate currencies; gold is game currency only; no conversion between them (complies with Google Play social casino policy)

## Game Rules Reference

**Tiến Lên Miền Nam (TLMN)**
- 2–4 players, 52-card deck, goal: be first to play all cards
- Rank order: 3 < 4 < … < 10 < J < Q < K < A < 2
- Suit order: ♠ < ♣ < ♦ < ♥ (for tiebreaking same-rank cards)
- Valid combos: Single, Pair, Triple, Straight (3+, no 2), 3 Đôi Thông, 4 Đôi Thông
- **Passing locks you out** for the rest of the round (Bỏ Vòng). Round resets when all active players pass or table is clear.
- **2 (Heo) is never in a straight.** No wrap-arounds, no K-A-2, no A-2-3-4-5.
- Instant wins: Sảnh Rồng (12-card 3→A), Tứ Quý Heo, 5 Đôi Thông, 6 Đôi
- Bomb rules: 4 Đôi Thông can be played out of turn to cut a 2

**Mậu Binh (Binh Xập Xám)**
- 2–4 players, arrange 13 cards into 3 rows: Top (3 cards) < Mid (5 cards) < Bottom (5 cards)
- Invalid arrangement = **Binh Lủng** — player loses all 3 rows to every opponent
- Top Row (3 cards) max hand = Three of a Kind. No Straights, Flushes, or Full Houses possible.
- Lowest straight: A-2-3-4-5. Highest: 10-J-Q-K-A.
- Instant wins: Sảnh Rồng (+50 Chi), Dragon Flush (+100 Chi), Lục Phé Bôn (+18 Chi), Ba Cái Thùng (+18 Chi), Ba Cái Sảnh (+18 Chi)
- Scoring: base 1 Chi per row; Sweep (win all 3) = ×2; bonuses: Top trips +3, Mid quads +8, Bottom straight flush +5

## Known Gaps (PRD Status)

- `apps/mobile-rn/`, `server/`, `packages/` are planned but not yet created
- `r3fBridge.ts` interface is defined but not yet implemented
- Bot AI (in `packages/game-sdk/src/tien-len/AI.ts`, `packages/game-sdk/src/mau-binh/AI.ts`) is functional but needs enhancement for Phase 2
- 3D asset download from Kenney.nl is pending

## File Naming Conventions

- R3F 3D components: `PascalCase.tsx` inside `3d/` (e.g., `Card3D.tsx`, `PokerTable3D.tsx`)
- React Native 2D screens: kebab-case Expo Router files (e.g., `lobby.tsx`, `tienlen.tsx`)
- 2D UI components: `PascalCase.tsx` in `components/`
- Game SDK logic: `camelCase.ts` (e.g., `card.ts`, `rules.ts`)
- Services/hooks: `camelCase.ts`

## No Existing Code

This repository contains only `PRD.md`. No actual implementation exists. Before writing features, read the relevant PRD section for requirements and constraints.