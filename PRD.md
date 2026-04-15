# Vietnamese Card Games 3D Casino - Product Requirements Document

**Version:** 3.0 (R3F Migration)  
**Last Updated:** 2026-04-13  
**Status:** Final (Ready for Development)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Target Platforms & Users](#3-target-platforms--users)
4. [Feature Specifications](#4-feature-specifications)
5. [Technical Architecture](#5-technical-architecture)
6. [Game Mechanics](#6-game-mechanics)
7. [Monetization Strategy](#7-monetization-strategy)
8. [3D Assets & Resources](#8-3d-assets--resources)
9. [Integration Requirements](#9-integration-requirements)
10. [Testing & QA](#10-testing--qa)
11. [Launch Checklist](#11-launch-checklist)
12. [Future Roadmap](#12-future-roadmap)
13. [Risk Assessment](#13-risk-assessment)
14. [Appendix](#14-appendix)

---

## 1. Executive Summary

### 1.1 Product Overview

**Vietnamese Card Games 3D Casino** is a premium mobile gaming app that brings traditional Vietnamese card games (Tiến Lên and Mậu Binh) to life with a modern 2.5D/3D casino experience. Built entirely in React Native with React Three Fiber for 3D rendering, the app delivers a polished, engaging experience for both Vietnamese diaspora and domestic markets.

### 1.2 Problem Statement

Existing card game apps in Vietnam suffer from:
- Poor visual quality (flat 2D UI)
- Limited monetization options
- Lack of authentic cultural theming
- Unreliable multiplayer matchmaking
- No cross-platform support

### 1.3 Solution

Our app provides:
- **Full 2.5D/3D Experience in React Native**: Both lobby and game tables using React Three Fiber
- **Dual Currency System**: Gold (for bets) + Diamonds (for cosmetics/features)
- **Rich Skin Catalog**: Card backs, card fronts, table skins, profile customization
- **Smart Matchmaking**: Real players first, AI bots fill seamlessly when needed
- **Cross-Platform**: Android (primary), iOS (secondary), Web (testing)
- **Hot Updates**: Code updates via CDN, no Play Store resubmission for minor changes

### 1.4 Key Differentiators

| Feature | Competitors | Our App |
|---------|-------------|---------|
| Visual Quality | 2D flat | Full 2.5D/3D R3F |
| Currency | Single | Dual (Gold + Diamonds) |
| Customization | Limited | 10+ skins, profile themes |
| Bot Support | No | Seamless AI integration |
| Cross-Platform | No | Android + iOS + Web |
| Update Mechanism | Full rebuild | CDN hot updates |

---

## 2. Product Vision

### 2.1 Mission Statement

To create the most engaging and visually stunning Vietnamese card game experience on mobile, combining traditional gameplay with modern 3D casino aesthetics using React ecosystem.

### 2.2 Success Metrics (KPIs)

| Metric | Target (6 months) | Target (12 months) |
|--------|-------------------|--------------------|
| Daily Active Users (DAU) | 1,000 | 10,000 |
| Retention (Day 7) | 25% | 35% |
| Retention (Day 30) | 10% | 15% |
| Average Revenue Per User (ARPU) | $0.50 | $1.50 |
| Play Store Rating | 4.2+ | 4.5+ |
| Crash-Free Sessions | 99.5% | 99.9% |

### 2.3 Long-Term Vision

- **Phase 1 (MVP)**: Single-player + bot games, basic monetization, 2.5D visuals
- **Phase 2**: Real-time multiplayer, social features (friends, chat)
- **Phase 3**: Tournament mode, leaderboards, events
- **Phase 4**: Additional games (Xí Ngầu, Tài Xỉu), advanced 3D features

---

## 3. Target Platforms & Users

### 3.1 Platform Strategy

| Platform | Priority | Timeline | Notes |
|----------|----------|----------|-------|
| **Android** | P0 | MVP | Google Play Store |
| **iOS** | P1 | Post-Android approval | App Store (if Android approved) |
| **Web** | P1 | Concurrent with mobile | Full 3D testing via React Native Web |

### 3.2 Target Audience

**Primary Markets:**
- Vietnam (domestic)
- Vietnamese diaspora (USA, Australia, Canada, Europe)

**Demographics:**
- Age: 18-55 (all casual mobile gamers)
- Tech-savviness: Low to High
- Gaming preference: Traditional card games, social casino

**User Personas:**

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| **Chị Lan (35)** | Busy mom, plays during breaks | Quick games, easy to learn |
| **Anh Minh (28)** | Office worker, tech-savvy | Social features, competition |
| **Bác Hùng (52)** | Retired, traditional player | Authentic rules, familiar UI |
| **Em Trang (22)** | Student, casual gamer | Free content, social sharing |

### 3.3 Accessibility Requirements

- Vietnamese language (primary)
- English language (secondary)
- Large touch targets (48dp minimum)
- Color-blind friendly palettes
- Adjustable text size
- Graphics quality settings (Low/Medium/High)

---

## 4. Feature Specifications

### 4.1 Authentication & User Management

| Feature | Description | Priority |
|---------|-------------|----------|
| **Dev Login** | Quick access for testing (MVP) | P0 |
| **Guest Login** | Anonymous play with local sync | P0 |
| **Google Sign-In** | OAuth via Firebase | P1 |
| **Facebook Login** | OAuth via Firebase | P1 |
| **Apple ID** | OAuth via Firebase (iOS) | P1 |
| **Email/Password** | Traditional registration | P2 |
| **Cloud Sync** | Cross-device progress | P1 |

**User Data Stored:**
- Session token (temporary)
- User profile (persistent)
  - Display name
  - Avatar (default/custom)
  - Gold balance
  - Diamond balance
  - Owned skins (inventory)
  - Equipped skins
  - Game statistics (wins, losses, playtime)
  - Transaction history

### 4.2 Currency System

#### 4.2.1 Gold (Game Currency)

**Purpose:** Used exclusively for game entry fees and bets.

| Source | Amount | Frequency |
|--------|--------|-----------|
| **Welcome Bonus** | +1,000 | First login only |
| **Direct Purchase** | Variable | One-time (real money) |
| Win Game | +50-500 | Per game (based on bet) |

**Usage:**
- Entry fees for games (10-1,000 gold per room)
- Loser pays winner (game mechanics)
- Cannot be converted to diamonds
- Cannot purchase cosmetics

**Gold Purchase Packages:**
| Tier | Amount | Price (USD) | Price (VND) |
|------|--------|-------------|-------------|
| Small | 5,000 | $0.99 | 25,000₫ |
| Medium | 25,000 | $3.99 | 99,000₫ |
| Large | 60,000 | $8.99 | 220,000₫ |
| XL | 150,000 | $19.99 | 490,000₫ |

#### 4.2.2 Diamonds (Premium Currency)

**Purpose:** Used for all cosmetic items and special features.

| Source | Amount | Method |
|--------|--------|--------|
| Direct Purchase | 100-10,000 | In-app purchase (IAP) |
| Special Events | Variable | Tournament rewards |
| Premium Packages | Variable | Bundle deals |

**Usage:**
- Premium card backs/fronts
- Exclusive table skins
- Profile badges/backgrounds
- Auto-play feature (AI assistance)
- Special event entry fees

**Diamond Purchase Packages:**
| Tier | Amount | Bonus | Price (USD) | Price (VND) |
|------|--------|-------|-------------|-------------|
| Starter | 100 | 0% | $0.99 | 25,000₫ |
| Basic | 550 | 10% | $4.99 | 125,000₫ |
| Standard | 1,380 | 15% | $9.99 | 250,000₫ |
| Premium | 3,360 | 20% | $19.99 | 500,000₫ |
| Elite | 8,750 | 25% | $49.99 | 1,200,000₫ |

**Skin Pricing (Diamonds):**
| Rarity | Card Back | Card Front | Table Skin | Profile Badge |
|--------|-----------|------------|------------|---------------|
| Common | 50 | 50 | 100 | 25 |
| Rare | 200 | 200 | 500 | 100 |
| Epic | 500 | 500 | 1,500 | 250 |
| Legendary | 1,000 | 1,000 | 3,000 | 500 |

**Bundle Deals (Limited Time):**
- "New Player Pack": 500 diamonds + 10,000 gold = $4.99
- "Skin Starter": 3 common card backs + 1 table = $2.99
- "VIP Monthly": Unlimited gold + 500 diamonds = $9.99/month

**Important Rules:**
- Gold and diamonds are **separate currencies**
- Gold **cannot** be converted to diamonds
- Diamonds **cannot** be converted to gold
- Both purchased with real money (IAP)

### 4.3 Skin Catalog & Customization

#### 4.3.1 Card Skins

**Card Backs:**
- Traditional Vietnamese patterns (5 designs)
- Modern minimalist (3 designs)
- Premium animated (2 designs)

**Card Fronts:**
- Standard poker (default)
- Vietnamese numerals (5 designs)
- Themed art (dragon, phoenix, lotus)

#### 4.3.2 Table Skins

| Type | Description | Count |
|------|-------------|-------|
| **Green Felt** | Classic casino | 3 variations |
| **Wood** | Premium mahogany | 2 variations |
| **Modern** | Minimalist glass | 2 variations |
| **Traditional** | Vietnamese lacquer | 2 variations |

#### 4.3.3 Profile Customization

- Avatar frames (bronze, silver, gold, diamond)
- Background themes (lobby backdrop)
- Achievement badges (win streaks, tournaments)

#### 4.3.4 Inventory System

**User Skin Collection:**
```typescript
interface UserInventory {
  cardBacks: string[];
  cardFronts: string[];
  tableSkins: string[];
  profileItems: string[];
  equipped: {
    cardBack: string;
    cardFront: string;
    table: string;
    profile: string;
  };
}
```

### 4.4 Game Screens & 3D Architecture

#### 4.4.1 Application Flow

```
┌─────────────────────────────────────┐
│         React Native App             │
│                                      │
│  ┌───────────────────────────────┐  │
│  │    Login/Auth Screens (2D)    │  │
│  └───────────────────────────────┘  │
│              │                        │
│              ▼                        │
│  ┌───────────────────────────────┐  │
│  │    Home/Lobby (2.5D R3F)      │  │
│  │  - 3D game selection cards    │  │
│  │  - Background art + mascot    │  │
│  │  - Top bar (currency)         │  │
│  │  - Bottom nav                 │  │
│  └───────────────────────────────┘  │
│              │                        │
│              ▼                        │
│  ┌───────────────────────────────┐  │
│  │    Game Table (Full 3D R3F)   │  │
│  │  - 3D card models             │  │
│  │  - Table surface              │  │
│  │  - Player avatars             │  │
│  │  - Particle effects           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### 4.4.2 Screen Components

**Login Screen (Pure React Native 2D):**
```tsx
// Standard RN components - no 3D
<View>
  <Text>Logo</Text>
  <Button>Dev Login</Button>
  <Button>Guest Login</Button>
</View>
```

**Lobby Screen (2.5D with R3F):**
```tsx
// Canvas with orthographic camera
<Canvas camera={{ type: 'orthographic', position: [0, 5, 0], zoom: 5 }}>
  {/* 3D Game Cards with hover effects */}
  <GameCard3D position={[-2, 0, 0]} />
  <GameCard3D position={[2, 0, 0]} />
  
  {/* 2D UI Overlay */}
  <Html>
    <TopBar />
    <BottomNav />
  </Html>
</Canvas>
```

**GameTable Screen (Full 3D R3F):**
```tsx
// Perspective camera for gameplay
<Canvas camera={{ position: [0, 8, 0], fov: 45 }}>
  {/* 3D Table */}
  <PokerTable3D position={[0, 0, 0]} />
  
  {/* 3D Card Hands */}
  <CardHand3D position={[0, 0, 3]} cards={playerHand} />
  <CardHand3D position={[0, 0, -3]} cards={opponentHand} faceDown />
  
  {/* 3D Player Avatars */}
  <PlayerAvatar3D position={[-3, 0, 0]} />
  <PlayerAvatar3D position={[3, 0, 0]} />
  
  {/* Particle Effects */}
  <WinEffect3D trigger={gameWon} />
  
  {/* 2D UI Overlay */}
  <Html>
    <GameControls />
    <CurrencyDisplay />
  </Html>
</Canvas>
```

### 4.5 3D Asset Pipeline

#### 4.5.1 Asset Sources (Free & CC0)

**Primary Sources:**
1. **Kenney.nl Playing Cards Pack** (CC0)
   - URL: https://kenney.nl/assets/playing-cards-pack
   - Contains: 3D card models, various suits
   - Format: GLB/GLTF
   - License: CC0 (no attribution required)

2. **Poly Haven** (CC0)
   - URL: https://polyhaven.com/
   - Contains: Textures, HDRIs, some 3D models
   - Format: Various
   - License: CC0

3. **itch.io Free Game Assets**
   - URL: https://itch.io/game-assets/free/tag-3d/tag-glb
   - Contains: Various card/table assets
   - Filter by: CC0 license

**Asset Conversion Workflow:**
```
1. Download GLB/GLTF from source
2. Place in apps/mobile-rn/public/models/
3. Import with @react-three/drei/useGLTF
4. Create React component wrapper
5. Add materials/textures as needed
```

#### 4.5.2 Card Rendering Strategy

**Option A: Full 3D Models (Recommended)**
- Use Kenney's 3D card models
- Each card is a separate mesh
- Apply custom textures for suits/ranks
- Pros: True 3D, realistic flipping
- Cons: More draw calls, higher memory

**Option B: Textured Planes**
- Single plane geometry per card
- Dynamic texture based on card value
- Pros: Better performance
- Cons: Less realistic edges

**Decision:** Start with Option A (Kenney models), optimize to Option B if performance issues.

#### 4.5.3 Table Rendering

**Options:**
1. **Kenney Table Model** (if available)
2. **Custom Plane with Felt Texture**
   - Use Poly Haven felt/cloth textures
   - Apply to flat plane
3. **Low-poly Table from itch.io**

**Decision:** Start with Option 2 (plane + texture), upgrade to Option 1/3 if needed.

### 4.6 Multiplayer & Matchmaking

#### 4.6.1 Room System

**Room Types:**
| Room | Entry Fee (Gold) | Max Players | Game Type |
|------|------------------|-------------|-----------|
| **Free** | 0 | 4 | Practice |
| **Bronze** | 10 | 4 | Beginner |
| **Silver** | 100 | 4 | Intermediate |
| **Gold** | 1,000 | 4 | Advanced |
| **Diamond** | 10,000 | 4 | Expert |

#### 4.6.2 Matchmaking Flow

```
1. Player clicks "PLAY NOW"
2. System searches for available rooms
3. If 4 real players found → Start game immediately
4. If <4 players after 30s → Add AI bots to fill slots
5. Game begins with mixed players + bots
6. Real players can join mid-game (queue system)
7. Players cannot distinguish bots from real players
```

**Key Design Decision**: Bots are **seamless** - players won't know they're playing against bots. This ensures instant gameplay while maintaining the "real player" feel.

#### 4.6.3 Bot Implementation

**Bot AI Levels:**
| Level | Behavior | Difficulty |
|-------|----------|------------|
| **Easy** | Basic pattern recognition | Beginner |
| **Medium** | Standard strategy | Intermediate |
| **Hard** | Advanced game theory | Expert |
| **Pro** | Near-perfect play | Champion |

**Current Status:**
- Bot code exists in `packages/game-sdk` (GamePhase.ts)
- Decision-making logic is functional but needs enhancement
- **Priority**: Improve bot AI for Phase 2

**Bot Integration:**
- Pre-built AI decision tree
- State machine for turn-based logic
- Timer-based turn completion (10-30s per turn)
- Randomized behavior to avoid predictability

### 4.7 Animations & Interactions

#### 4.7.1 Card Animations

**Dealing:**
- Slide from deck to hand (0.3s ease-out)
- Slight rotation for visual interest

**Flipping:**
- Y-axis rotation 180° (0.2s)
- Optional: Scale effect during flip

**Playing:**
- Lift (Z-axis) + slide to center (0.4s)
- Drop animation with bounce

**Collecting:**
- Suck back to winner (0.5s)
- Particle burst on collection

#### 4.7.2 UI Interactions

**Tap/Press:**
- Scale 0.95 → 1.0 (0.1s)
- Subtle glow effect

**Hover (Web):**
- Lift Z-axis (0.1s)
- Shadow increase

**Transitions:**
- Fade + slide (0.3s)
- Cross-fade for screens

### 4.8 Graphics Quality Settings

**Low (2010 tablets):**
- Simplified card models (planes instead of meshes)
- No shadows
- Minimal particles
- 30 FPS target

**Medium (Modern phones):**
- Full card models
- Soft shadows
- Moderate particles
- 60 FPS target

**High (Premium devices):**
- Full models + PBR materials
- Hard + soft shadows
- Full particle effects
- 60+ FPS target

---

## 5. Technical Architecture

### 5.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│              React Native App                            │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────┐   │
│  │  Auth Flow  │  │  IAP        │  │  Analytics    │   │
│  └─────────────┘  └─────────────┘  └───────────────┘   │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────┐   │
│  │  Lobby      │  │  Game Screens│  │  3D Canvas    │   │
│  │  (2.5D R3F) │  │  (2D UI)    │  │  (Full 3D)    │   │
│  └─────────────┘  └─────────────┘  └───────────────┘   │
│                    │      │                              │
│                    ▼      ▼                              │
│              ┌───────────────┐                           │
│              │  Game State   │                           │
│              │  (Zustand)    │                           │
│              └───────┬───────┘                           │
│                      │                                    │
└──────────────────────┼────────────────────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Cloud Server   │
              │  (Node.js +     │
              │   Colyseus)     │
              └─────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  PostgreSQL     │
              │  (Prisma ORM)   │
              └─────────────────┘
```

### 5.2 Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Mobile Framework** | React Native | 0.73+ |
| **Navigation** | Expo Router | v4 |
| **3D Engine** | React Three Fiber | Latest |
| **3D Helpers** | @react-three/drei | Latest |
| **GLTF Loading** | @react-three/drei/useGLTF | - |
| **Animations** | @react-three/rapier / Framer Motion | - |
| **State Mgmt** | Zustand | 4.x |
| **Backend** | Node.js | 18+ |
| **Real-time** | Colyseus | 0.15+ (self-hosted) |
| **Database** | PostgreSQL | 15+ |
| **ORM** | Prisma | 5.x |
| **Auth** | Firebase | Latest |
| **Testing** | Jest | 29+ |
| **CI/CD** | GitHub Actions | - |
| **Analytics** | Firebase Analytics | - |
| **CDN** | Cloudflare / AWS S3 | - |

### 5.3 Project Structure

```
viet-cards-3d-casino/
├── apps/
│   └── mobile-rn/              # React Native app
│       ├── app/                # Screens (Expo Router)
│       │   ├── login.tsx
│       │   ├── lobby.tsx       # 2.5D lobby with R3F
│       │   ├── store.tsx
│       │   ├── profile.tsx
│       │   ├── _layout.tsx
│       │   └── game/
│       │       ├── tienlen.tsx
│       │       ├── maubinh.tsx
│       │       └── _layout.tsx
│       ├── components/         # Reusable UI
│       │   ├── CurrencyDisplay.tsx
│       │   ├── SkinCard.tsx
│       │   └── GameButton.tsx
│       ├── 3d/                 # 3D components
│       │   ├── Canvas/
│       │   │   ├── LobbyCanvas.tsx      # 2.5D lobby
│       │   │   └── GameCanvas.tsx       # Full 3D game
│       │   ├── Cards/
│       │   │   ├── Card3D.tsx
│       │   │   ├── CardHand3D.tsx
│       │   │   └── CardDeck3D.tsx
│       │   ├── Tables/
│       │   │   ├── PokerTable3D.tsx
│       │   │   └── TableSurface.tsx
│       │   ├── Effects/
│       │   │   ├── WinEffect3D.tsx
│       │   │   └── ParticleSystem.tsx
│       │   └── models/         # GLB assets
│       │       ├── cards/
│       │       └── table.glb
│       ├── hooks/
│       │   ├── useGame.ts
│       │   └── useUnityBridge.ts  # Renamed to useR3FBridge
│       ├── contexts/           # State management
│       │   ├── AuthContext.tsx
│       │   ├── CurrencyContext.tsx
│       │   └── GameContext.tsx
│       ├── services/           # API
│       │   ├── api.ts
│       │   └── r3fBridge.ts   # RN ↔ 3D communication
│       └── android/            # Native Android
│           └── app/
├── server/                     # Backend API + Colyseus
│   ├── prisma/                 # Database schema
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── skins.ts
│   │   │   └── currency.ts
│   │   ├── colyseus/
│   │   │   └── GameRoom.ts    # Multiplayer logic
│   │   └── services/
│   │       ├── UserRepository.ts
│   │       ├── SkinService.ts
│   │       └── CurrencyService.ts
│   └── tests/                  # Test suite
│       ├── auth.test.ts
│       ├── skins.test.ts
│       └── currency.test.ts
├── packages/
│   ├── game-sdk/               # Shared game logic
│   │   └── src/
│   │       ├── core/
│   │       │   ├── Card.ts
│   │       │   ├── Deck.ts
│   │       │   └── GamePhase.ts
│   │       ├── tien-len/
│   │       │   ├── Rules.ts
│   │       │   └── AI.ts       # Bot logic (needs improvement)
│   │       └── mau-binh/
│   │           ├── Rules.ts
│   │           └── AI.ts       # Bot logic (needs improvement)
│   └── shared-types/           # Type definitions
│       └── src/
│           └── index.ts        # User, Skin, Transaction, etc.
├── docs/
│   ├── PRD.md                  # This file
│   ├── FINAL_STATUS.md
│   ├── IMPLEMENTATION_STATUS.md
│   ├── UNITY_REFERENCE/        # Archived Unity code
│   │   └── ...
│   └── TESTING_GUIDE.md
├── docker-compose.yml          # Local Postgres + Colyseus
└── package.json               # Workspace config
```

### 5.4 Database Schema

```prisma
// Prisma schema (unchanged from previous version)
model User {
  id           String    @id @default(cuid())
  sessionId    String    @unique
  displayName  String
  avatarUrl    String?
  gold         Int       @default(1000)
  diamonds     Int       @default(0)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  transactions Transaction[]
  userSkins    UserSkin[]
  gameSessions GameSession[]
}

model Skin {
  id          String   @id @default(cuid())
  name        String
  type        SkinType // CARD_BACK, CARD_FRONT, TABLE, PROFILE
  rarity      Rarity   // COMMON, RARE, EPIC, LEGENDARY
  price       Int      // Diamond cost
  imageUrl    String
  users       UserSkin[]
}

model Transaction {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        TransType // PURCHASE_GOLD, PURCHASE_DIAMOND, WIN, LOSS, REFRESH
  amount      Int
  currency    CurrType // GOLD, DIAMOND
  timestamp   DateTime @default(now())
}

model GameSession {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  gameType    GameType // TIENLEN, MAUBINH
  result      Result   // WIN, LOSS, DRAW
  goldChange  Int
  startTime   DateTime
  endTime     DateTime
}
```

### 5.5 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **Authentication** |
| POST | `/api/auth/dev/login` | No | Dev session login |
| POST | `/api/auth/guest/login` | No | Guest login |
| POST | `/api/auth/session/validate` | Yes | Validate session |
| GET | `/api/auth/me/:sessionId` | Yes | Get user profile |
| **Currency** |
| GET | `/api/currency/balance/:sessionId` | Yes | Get gold/diamonds |
| POST | `/api/currency/purchase/gold` | Yes | Buy gold |
| POST | `/api/currency/purchase/diamonds` | Yes | Buy diamonds |
| **Skins** |
| GET | `/api/skins/catalog` | No | List all skins |
| GET | `/api/skins/inventory/:sessionId` | Yes | Get owned skins |
| POST | `/api/skins/purchase` | Yes | Buy a skin |
| POST | `/api/skins/equip` | Yes | Equip a skin |
| POST | `/api/skins/unequip` | Yes | Unequip a skin |
| **Games** |
| POST | `/api/games/create-room` | Yes | Create game room |
| GET | `/api/games/rooms` | Yes | List active rooms |
| POST | `/api/games/join` | Yes | Join a room |
| **Sessions** |
| GET | `/api/sessions/:userId` | Yes | Get session history |

### 5.6 Security Considerations

**Authentication:**
- Session tokens (JWT) with 24-hour expiry
- Firebase OAuth for Google/Facebook/Apple
- Rate limiting on login endpoints (5 req/min)

**Data Protection:**
- HTTPS only (TLS 1.3)
- Encrypted database connections
- Sensitive data (tokens) in secure storage

**Anti-Cheat:**
- Server-side game logic validation
- Bot detection (unusual play patterns)
- Rate limiting on currency updates

**Compliance:**
- Google Play policies (social casino, no real money)
- Apple App Store guidelines
- GDPR/CCPA data privacy

### 5.7 Scalability Strategy

**MVP (Single Server):**
- One cloud instance (AWS/DigitalOcean)
- Colyseus + Node.js + PostgreSQL
- ~1,000 concurrent users max

**Phase 2 (Kubernetes):**
- Container orchestration
- Auto-scaling based on load
- Database replication

**Phase 3 (Regional):**
- Asia server (Singapore)
- Americas server (US East)
- Europe server (Frankfurt)
- CDN for asset delivery

---

## 6. Game Mechanics

### 6.1 Tiến Lên Miền Nam (TLMN)

**Game Overview:**
- 2–4 players, standard 52-card deck (no jokers)
- Goal: Be first to play all cards

**Card Rankings (Low to High):**
```
3 < 4 < 5 < 6 < 7 < 8 < 9 < 10 < J < Q < K < A < 2
```

**Suit Rankings (Low to High) — used for tiebreaking same-rank cards:**
```
Spades (♠) < Clubs (♣) < Diamonds (♦) < Hearts (♥)
```

**Valid Combinations (Bộ):**
| Type | Example | Rules |
|------|---------|-------|
| **Single (Rác)** | 7♠ | Any one card |
| **Pair (Đôi)** | K♣ K♥ | 2 cards, same rank |
| **Triple (Sám cô)** | 5♦ 5♠ 5♣ | 3 cards, same rank |
| **Straight (Sảnh)** | 4-5-6-7-8 | 3+ consecutive ranks; **2 (Heo) is never in a straight** |
| **3 Consecutive Pairs (3 Đôi Thông)** | 3-3, 4-4, 5-5 | 3+ consecutive same-rank pairs |
| **4 Consecutive Pairs (4 Đôi Thông)** | 3-3, 4-4, 5-5, 6-6 | 4 consecutive pairs; **can be played out of turn to cut 2** |

**Turn & Round Mechanics (Vòng Đánh):**
- **First Game:** Player with **3♠** goes first; play must include 3♠
- **Subsequent Games:** Winner of previous game goes first with any valid combination
- **Passing (Bỏ Vòng):** When a player passes they are **locked out** (`hasPassed = true`) for the rest of this round. They cannot play again until the round resets.
- **Round Reset:** When all remaining active players have played and the table is clear, or when 3 of 4 players have passed, the round ends. All `hasPassed` states reset to `false`. The last active player starts the new round.

**Bombing Rules (Chặt Heo):**
- **3 Đôi Thông** — cuts a single 2. Played in normal turn order.
- **Tứ Quý (Four of a Kind)** — cuts a single 2, a Pair of 2s, or 3 Đôi Thông.
- **4 Đôi Thông** — cuts a single 2, Pair of 2s, 3 Đôi Thông, or Tứ Quý. **Can be played out of turn** to cut a 2 that was just played.

**Instant Wins (Tới Trắng) — checked after dealing, before play begins:**
| Type | Description | Payout |
|------|-------------|--------|
| **Sảnh Rồng** | 12 cards 3→A (consecutive) | Win instantly |
| **Tứ Quý Heo** | All four 2s | Win instantly |
| **5 Đôi Thông** | 5 consecutive pairs | Win instantly |
| **6 Đôi** | 6 pairs (not required to be consecutive) | Win instantly |

**Endgame (Thúi Heo / Thúi Hàng):**
- Game ends the moment one player plays their last card
- Remaining players reveal their hands
- Any player holding 2s, Tứ Quý, or Đôi Thông pays a penalty directly to the winner

### 6.2 Mậu Binh (Binh Xập Xám / Chinese Poker)

**Game Overview:**
- 2–4 players, 52-card deck
- Goal: Arrange 13 cards into 3 rows (Chi) and beat opponents row-by-row

**Hand Structure (Chi):**
```
┌────────────────────┐
│  Chi 3 — Top (3 cards)  │ ← Must be the weakest hand
├────────────────────┤
│  Chi 2 — Middle (5 cards)│ ← Must be weaker than Bottom
├────────────────────┤
│  Chi 1 — Bottom (5 cards)│ ← Must be the strongest hand
└────────────────────┘
```

**Binh Lủng (Foul):**
- If Chi 2 outranks Chi 1, or Chi 3 outranks Chi 2 → **Binh Lủng**
- Player instantly loses all 3 rows to every opponent and pays a penalty

**Standard Poker Hand Rankings (Weakest to Strongest):**
| Rank | Hand | Notes |
|------|------|-------|
| 1 | High Card | Highest single card |
| 2 | One Pair | Two cards, same rank |
| 3 | Two Pair | Two different pairs |
| 4 | Three of a Kind | Three cards, same rank |
| 5 | Straight | 5 consecutive ranks; **A-2-3-4-5 is the lowest straight; 10-J-Q-K-A is the highest** |
| 6 | Flush | 5 cards, same suit |
| 7 | Full House | Three of a kind + one pair |
| 8 | Four of a Kind | Four cards, same rank |
| 9 | Straight Flush | 5 consecutive cards, same suit |
| 10 | Royal Flush | A-K-Q-J-10, same suit |

**Top Row (Chi 3) Exception:** Only 3 cards → can be High Card, One Pair, Two Pair, or Three of a Kind. Straights, Flushes, Full Houses, and Quads are **impossible** in 3 cards.

**Instant Wins (Mậu Binh Tới Trắng) — checked before row comparison:**
| Type | Description | Payout |
|------|-------------|--------|
| **Sảnh Rồng** | 13 consecutive cards 2→A (suits don't matter) | +50 Chi per opponent |
| **Sảnh Rồng Đồng Hoa** | All 13 cards same suit AND consecutive | +100 Chi per opponent |
| **Lục Phé Bôn (6 Pairs)** | Exactly 6 pairs in 13 cards | +18 Chi per opponent |
| **Ba Cái Thùng (3 Flushes)** | Flush in Bottom + Middle, 3 same-suit cards in Top | +18 Chi per opponent |
| **Ba Cái Sảnh (3 Straights)** | Straight in Bottom + Middle, 3 consecutive in Top | +18 Chi per opponent |

**Scoring (So Chi):**
- Base: **1 Chi = 1 base bet**
- Each row compared to opponent's row → winner +1 Chi, loser −1 Chi
- **Sập Hầm (Sweep):** Winning all 3 rows against one opponent → winnings × 2

**Bonus Multipliers (Chi Thưởng) — awarded in addition to base Chi:**
| Bonus | Condition | Bonus Chi |
|------|----------|-----------|
| Sám Chi Cuối | Win Top (Chi 3) with Three of a Kind | +3 |
| Cù Lũ Chi Giữa | Win Middle (Chi 2) with Full House | +2 |
| Tứ Quý Chi Đầu | Win Bottom (Chi 1) with Four of a Kind | +4 |
| Tứ Quý Chi Giữa | Win Middle (Chi 2) with Four of a Kind | +8 |
| Thùng Phá Sảnh Chi Đầu | Win Bottom (Chi 1) with Straight Flush | +5 |
| Thùng Phá Sảnh Chi Giữa | Win Middle (Chi 2) with Straight Flush | +10 |

### 6.3 Turn Timer System

**Game Flow:**
```
1. Game starts → All players dealt cards
2. Turn order determined (random or seat position)
3. Active player has 30 seconds to:
   a. Play valid combination
   b. Pass (skip turn)
4. If timeout → Auto-pass
5. Next player's turn
6. Game ends when:
   a. One player empties hand (Tiến Lên)
   b. All rounds complete (Mậu Binh)
```

**Timer UI:**
- Circular progress bar (30s countdown)
- Visual warning at 10s remaining
- Audio cue at 5s, 3s, 1s

---

## 7. Monetization Strategy

### 7.1 Revenue Streams

| Stream | Description | Projected % |
|--------|-------------|-------------|
| **Gold Purchases** | Direct buy for game entry | 40% |
| **Diamond Purchases** | Premium currency for cosmetics | 40% |
| **Bundle Deals** | Combined packages | 15% |
| **VIP Subscriptions** | Monthly premium access | 5% |

**Important**: NO ADVERTISING. Pure IAP monetization.

### 7.2 IAP Pricing Tiers

**Gold Packages:**
- $0.99 → 5,000 gold
- $3.99 → 25,000 gold
- $8.99 → 60,000 gold
- $19.99 → 150,000 gold

**Diamond Packages:**
- $0.99 → 100 diamonds
- $4.99 → 550 diamonds (+10%)
- $9.99 → 1,380 diamonds (+15%)
- $19.99 → 3,360 diamonds (+20%)
- $49.99 → 8,750 diamonds (+25%)

**Special Bundles:**
- "New Player Pack": $4.99 (500 diamonds + 10,000 gold)
- "Skin Starter": $2.99 (3 card backs + 1 table)
- "VIP Monthly": $9.99/month (unlimited gold + 500 diamonds)

### 7.3 Retention Mechanics

**Daily Login Bonus:**
- Day 1: 100 gold
- Day 2: 200 gold
- Day 3: 300 gold
- Day 4: 500 gold
- Day 5: 1,000 gold
- Day 6: 2,000 gold + 10 diamonds
- Day 7: 5,000 gold + 25 diamonds (weekly reset)

**Achievement System:**
| Achievement | Reward |
|-------------|--------|
| First Win | 100 gold |
| 10 Wins | 500 gold |
| 100 Wins | 2,000 gold + 50 diamonds |
| Skin Collector (5 skins) | 100 diamonds |
| VIP Status (30 days) | Exclusive badge |

---

## 8. 3D Assets & Resources

### 8.1 Primary Asset Sources

#### 8.1.1 Kenney.nl Playing Cards Pack (CC0)
**URL:** https://kenney.nl/assets/playing-cards-pack

**Contents:**
- 3D playing card models (all suits)
- Low-poly, game-ready
- Multiple formats (GLB, GLTF)
- **License:** CC0 (no attribution required)

**Usage:**
```bash
# Download and extract to
apps/mobile-rn/public/models/cards/

# Import in R3F component
import { useGLTF } from '@react-three/drei'

function Card3D({ suit, rank }) {
  const { scene } = useGLTF(`/models/cards/card_${suit}_${rank}.glb`)
  return <primitive object={scene} />
}
```

#### 8.1.2 Poly Haven (CC0)
**URL:** https://polyhaven.com/

**Contents:**
- PBR textures (felt, wood, cloth)
- HDRIs for lighting
- Some 3D models

**Usage:**
- Table felt texture from Poly Haven
- Apply to plane geometry
- Use HDRI for environment lighting

#### 8.1.3 itch.io Free Assets
**URL:** https://itch.io/game-assets/free/tag-3d/tag-glb

**Search Filters:**
- Tag: `3D`, `GLB`, `CC0` or `Free`
- Category: `Card Game` or `Board Game`

**Recommended Packs:**
- Low-poly card tables
- Poker chip models
- Casino-themed props

### 8.2 Asset Conversion Workflow

**FBX → GLB Conversion (if needed):**
```bash
# Using Blender (CLI)
blender -b input.fbx -o -P export_glb.py

# export_glb.py script
import bpy
bpy.ops.export_scene.gltf(filepath="output.glb")
```

**Texture Optimization:**
```bash
# Compress textures for mobile
imagemin input.png --out-dir=optimized/
# Or use WebP conversion
cwebp -q 80 input.png -o output.webp
```

### 8.3 Performance Considerations

**Draw Calls:**
- Batch similar materials
- Use instancing for card decks
- Limit real-time shadows

**Memory:**
- Texture atlas for cards
- LOD (Level of Detail) for distant objects
- Lazy load assets as needed

**FPS Targets:**
- Low: 30 FPS
- Medium: 60 FPS
- High: 60+ FPS

---

## 9. Integration Requirements

### 9.1 React Native ↔ 3D Canvas Communication

**Bridge Architecture:**
```typescript
// services/r3fBridge.ts
import { createContext, useContext } from 'react'

interface R3FBridgeContext {
  // RN → 3D
  triggerEffect: (effect: 'WIN' | 'LOSS' | 'PURCHASE') => void
  updateCardHand: (cards: Card[]) => void
  setGamePhase: (phase: GamePhase) => void
  
  // 3D → RN
  onCardSelected: (card: Card) => void
  onGameComplete: (result: GameResult) => void
}

const R3FBridgeContext = createContext<R3FBridgeContext | null>(null)

export function useR3FBridge() {
  const context = useContext(R3FBridgeContext)
  if (!context) throw new Error('useR3FBridge must be inside provider')
  return context
}
```

**Usage in 2D UI:**
```tsx
// apps/mobile-rn/app/game/tienlen.tsx
const bridge = useR3FBridge()

const handlePlayCard = (card: Card) => {
  bridge.updateCardHand([...hand, card])
  // ... rest of logic
}
```

**Usage in 3D Canvas:**
```tsx
// apps/mobile-rn/3d/Canvas/GameCanvas.tsx
import { Html } from '@react-three/drei'

function Card3D({ card, onClick }) {
  return (
    <mesh onClick={onClick}>
      <Html>
        <div className="card-overlay">
          {card.rank}{card.suit}
        </div>
      </Html>
    </mesh>
  )
}
```

### 9.2 Firebase Integration

```typescript
// hooks/useFirebaseAuth.ts
import auth from '@react-native-firebase/auth'

export function useFirebaseAuth() {
  const signInWithGoogle = async () => {
    const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
    await auth().signInWithCredential(credential)
  }
  
  // ... other auth methods
}
```

### 9.3 Colyseus Multiplayer (Self-Hosted)

```typescript
// services/colyseus.ts
import { Client } from 'colyseus.js'

const client = new Client('wss://your-cloud-server.com')

export const Multiplayer = {
  createRoom: async (gameType: 'TIENLEN' | 'MAUBINH') => {
    const room = await client.joinOrCreate('game-room', {
      gameType,
      maxPlayers: 4,
      botsAllowed: true
    })
    return room
  },
  
  // ... other methods
}
```

**Server-Side (Node.js + Colyseus):**
```typescript
// server/src/colyseus/GameRoom.ts
import { Room, Client } from 'colyseus'

export class GameRoom extends Room {
  onCreate(options: any) {
    this.setState({
      players: new Map(),
      gamePhase: 'WAITING',
      cards: [],
      currentTurn: 0
    })
    
    // Auto-fill with bots if <4 players after 30s
    this.setInterval(() => {
      if (this.state.players.size < 4) {
        this.addBot()
      }
    }, 30000)
  }
  
  addBot() {
    const botId = `bot_${Math.random()}`
    this.state.players.set(botId, {
      id: botId,
      isBot: true,
      hand: [],
      score: 0
    })
  }
}
```

### 9.4 In-App Purchase (IAP)

```typescript
// services/iap.ts
import { init, requestPurchase } from 'react-native-iap'

export const IAP = {
  setup: async () => {
    await init()
  },
  
  getProducts: async () => {
    const products = await getProducts({
      skus: [
        'com.vietcasino.gold.small',
        'com.vietcasino.diamonds.basic',
        'com.vietcasino.skin.legendary'
      ]
    })
    return products
  },
  
  purchaseItem: async (sku: string) => {
    try {
      const purchase = await requestPurchase({ sku })
      await acknowledgePurchase(purchase)
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
}
```

### 9.5 Cloud Infrastructure

**MVP Architecture:**
```
┌─────────────────────────────────────┐
│         Single Cloud Server         │
│         (AWS / DigitalOcean)        │
│                                     │
│  ┌─────────────┐ ┌───────────────┐ │
│  │  Colyseus   │ │   PostgreSQL  │ │
│  │  (WebSocket)│ │   (Database)  │ │
│  └─────────────┘ └───────────────┘ │
│  ┌─────────────┐ ┌───────────────┐ │
│  │   Node.js   │ │     Redis     │ │
│  │   (API)     │ │   (Cache)     │ │
│  └─────────────┘ └───────────────┘ │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│           CDN (Assets)              │
│      (Cloudflare / AWS S3)          │
│   - GLB models                      │
│   - Textures                        │
│   - Updates                         │
└─────────────────────────────────────┘
```

**Future Scaling (Kubernetes):**
```
┌─────────────────────────────────────┐
│         Kubernetes Cluster          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Regional Deployments      │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ │   │
│  │  │ Asia │ │  US  │ │ EU   │ │   │
│  │  └──────┘ └──────┘ └──────┘ │   │
│  └─────────────────────────────┘   │
│                                     │
│  Auto-scaling based on load         │
│  Database replication               │
│  Global CDN for assets              │
└─────────────────────────────────────┘
```

---

## 10. Testing & QA

### 10.1 Test Strategy

| Test Type | Scope | Tools | Frequency |
|-----------|-------|-------|-----------|
| **Unit Tests** | Backend APIs, Game Logic | Jest | Every commit |
| **Integration Tests** | API + Database | Jest + Supertest | Every commit |
| **E2E Tests** | User Flows | Detox | Daily |
| **UI Tests** | Screen Rendering | React Native Testing Library | Every commit |
| **3D Tests** | Canvas Rendering, Models | R3F Test Utils | Every commit |
| **Performance Tests** | Load Times, Memory, FPS | Chrome DevTools, React Native Profiler | Weekly |
| **Device Tests** | Real Devices | Firebase Test Lab | Before release |

### 10.2 Test Coverage Requirements

| Module | Target Coverage |
|--------|-----------------|
| Backend APIs | 90%+ |
| Game SDK (Rules/AI) | 95%+ |
| React Native Components | 80%+ |
| 3D Components | 70%+ |

### 10.3 Device Compatibility

**Android:**
- Minimum API: 21 (Android 5.0)
- Recommended: API 24+ (Android 7.0)
- Screen sizes: 5" to 6.7"
- RAM: 2GB minimum, 4GB+ recommended
- GPU: OpenGL ES 3.0+

**iOS:**
- Minimum: iOS 12.0
- Recommended: iOS 14.0+
- Devices: iPhone 8 and newer

**Web (Testing):**
- Chrome, Firefox, Safari, Edge
- Desktop + Mobile browsers
- WebGL 2.0 support required

### 10.4 Testing Checklist

**Pre-Release:**
- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] E2E flows tested (login → play → purchase)
- [ ] Memory leak check (3D canvas + RN)
- [ ] Crash reporting verified (Firebase Crashlytics)
- [ ] Network error handling tested
- [ ] Offline mode tested
- [ ] Device rotation tested
- [ ] Accessibility audit (font sizes, contrast)
- [ ] Bot behavior validation (seamless integration)
- [ ] IAP flow tested (gold + diamonds)
- [ ] Asset CDN updates tested
- [ ] 3D performance on low-end devices (2010 tablets)

**Play Store Submission:**
- [ ] Privacy policy URL
- [ ] Content rating completed
- [ ] IAP products registered
- [ ] APK signed with release key
- [ ] Internal testing track (100 users)
- [ ] Closed testing track (500 users)
- [ ] Open testing track (public beta)

---

## 11. Launch Checklist

### 11.1 Pre-Launch (4 Weeks Before)

- [ ] Finalize all game rules and AI
- [ ] Complete skin catalog (10+ designs)
- [ ] Set up 3D assets (Kenney cards, table textures)
- [ ] Implement LobbyCanvas and GameCanvas
- [ ] Implement analytics tracking
- [ ] Set up crash reporting
- [ ] Configure IAP products
- [ ] Create marketing assets (screenshots, video)
- [ ] Test bot integration (seamless experience)
- [ ] Verify CDN asset updates
- [ ] Performance testing on 2010 tablets

### 11.2 Launch Week

- [ ] Internal testing (team + friends)
- [ ] Closed beta (100 users, feedback collection)
- [ ] Fix critical bugs
- [ ] Performance optimization
- [ ] Submit to Play Store
- [ ] Prepare support documentation

### 11.3 Post-Launch (Week 1-4)

- [ ] Monitor crash reports
- [ ] Track retention metrics
- [ ] Collect user feedback
- [ ] Release hotfixes (if needed)
- [ ] Plan v1.1 features

---

## 12. Future Roadmap

### Phase 1: MVP (Current)
- ✅ Single-player + bot games
- ✅ Basic monetization (IAP for gold + diamonds)
- ✅ Two games (Tiến Lên, Mậu Binh)
- ✅ Skin system (10 skins)
- ✅ React Three Fiber integration (Lobby + GameTable)
- ⏳ Cloud server setup (Colyseus + PostgreSQL)
- ⏳ Bot AI enhancement
- ⏳ 3D asset integration (Kenney models)

### Phase 2: Social (3-6 months)
- [ ] Real-time multiplayer (Colyseus)
- [ ] Friend system
- [ ] Chat functionality
- [ ] Gift sending
- [ ] Leaderboards
- [ ] Improved bot AI (more realistic behavior)

### Phase 3: Engagement (6-12 months)
- [ ] Tournament mode
- [ ] Daily challenges
- [ ] Seasonal events
- [ ] Achievement system
- [ ] More game types (Xí Ngầu, Tài Xỉu)
- [ ] Regional servers

### Phase 4: Scale (12+ months)
- [ ] Live dealer integration
- [ ] Social casino features
- [ ] Cross-platform sync
- [ ] White-label licensing
- [ ] Advanced analytics

---

## 13. Risk Assessment

### 13.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **R3F Performance on Low-End Devices** | High | High | Graphics quality settings, asset optimization |
| **3D Asset Loading Failures** | Medium | Medium | Fallback to placeholder geometry, CDN caching |
| **Multiplayer Latency** | High | Medium | Regional servers, bot fallback |
| **IAP Rejection (Play Store)** | Medium | High | Follow guidelines, pre-approval testing |
| **Bot AI Too Obvious** | Medium | Medium | Enhance AI, randomize behavior |
| **CDN Asset Updates Fail** | Low | Medium | Fallback to bundled assets |

### 13.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Google Play Gambling Policy** | High | Critical | Position as "social casino" (no real money) |
| **Vietnam Market Restrictions** | Medium | High | Local legal counsel, regional variations |
| **Competition (ZingPlay, etc.)** | High | Medium | Superior UX, unique features |
| **Low Retention** | Medium | High | Daily bonuses, engagement mechanics |
| **IAP Revenue Insufficient** | Medium | Medium | Premium skins, bundle deals |

### 13.3 Legal/Compliance

- [ ] Gambling license (if real money involved - NOT in scope)
- [ ] Age restrictions (18+ or 21+)
- [ ] Privacy policy (GDPR, CCPA)
- [ ] Terms of service
- [ ] IAP compliance (Google/Apple guidelines)
- [ ] Social casino classification (no real-money gambling)

---

## 14. Appendix

### 14.1 Glossary

| Term | Definition |
|------|------------|
| **Tiến Lên** | Vietnamese climbing card game (similar to Big Two) |
| **Mậu Binh** | Vietnamese poker hand arrangement game |
| **Gold** | Game currency for entry fees/bets (purchased with real money) |
| **Diamonds** | Premium currency for cosmetics/features (purchased with real money) |
| **Skin** | Cosmetic customization (cards, tables, profiles) |
| **Bot** | AI-controlled player (seamless fallback for empty slots) |
| **R3F** | React Three Fiber - 3D rendering in React Native |
| **CDN** | Content Delivery Network for hot asset updates |
| **Colyseus** | WebSocket-based multiplayer game server |
| **GLB** | Binary glTF format - 3D model file format |
| **CC0** | Creative Commons Zero - Public domain license |

### 14.2 Asset Migration Notes

**From Unity to R3F:**
- Unity `CardTable.fbx` → Kenney GLB models (replace)
- Unity `UnityBridge.cs` → `r3fBridge.ts` (rename)
- Unity scenes → R3F Canvas components
- Unity particle systems → R3F effects + Framer Motion

**Kept Intact:**
- Backend API (Node.js + Prisma)
- Game SDK logic (Card, Deck, GamePhase)
- Bot AI (needs enhancement, but functional)
- Authentication flow
- Currency system
- Skin catalog

### 14.3 Reference Documents

- [Implementation Status](./IMPLEMENTATION_STATUS.md)
- [Final Status](./FINAL_STATUS.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [README](./README.md)
- [Unity Reference](./UNITY_REFERENCE/) (archived)

### 14.4 Migration Checklist

**Completed:**
- [x] PRD updated for R3F
- [x] Asset sources identified (Kenney, Poly Haven, itch.io)
- [x] Technology stack confirmed
- [x] Project structure planned

**Pending:**
- [ ] Install R3F dependencies
- [ ] Download 3D assets
- [ ] Create LobbyCanvas component
- [ ] Create GameCanvas component
- [ ] Implement Card3D component
- [ ] Implement Table3D component
- [ ] Set up CDN for asset delivery
- [ ] Test on 2010 tablets
- [ ] Performance optimization

---

**Document Version History:**
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-13 | AI Assistant | Initial PRD (Unity) |
| 2.0 | 2026-04-13 | AI Assistant | Unity updates with user feedback |
| 3.0 | 2026-04-13 | AI Assistant | **R3F Migration** - Complete rewrite |

Key changes in v3.0:
- **Removed Unity entirely** - Full R3F implementation
- **New 3D asset sources** - Kenney.nl (CC0), Poly Haven, itch.io
- **Updated project structure** - `apps/mobile-rn/3d/` folder
- **Graphics quality settings** - Low/Medium/High for device compatibility
- **Performance targets** - 30/60 FPS based on device class
- **Migration checklist** - Clear path from Unity to R3F
- **Kept all backend logic** - Game SDK, bots, API unchanged

---

**Next Steps:**
1. Run `/prd-to-issues` to generate GitHub issues
2. Install R3F dependencies
3. Download 3D assets from Kenney.nl
4. Create base Canvas components
5. Test on target devices
