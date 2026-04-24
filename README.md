# Sticker HQ — Unfinity Sticker Manager

A web app for tracking MTG Unfinity sticker sheets during gameplay.

## What it does

Unfinity introduced sticker sheets: each player brings a set of 10 sticker sheets to a game, and 3 are randomly selected for play. Stickers cost tickets (🎟️) to apply and can only be used once per game.

This app helps you:

- **Build stickerboards** — pick 10 sticker sheets from the full Unfinity set to form your board
- **Start a game** — randomly selects 3 sheets from your board for the current game
- **Track sticker usage** — mark stickers as used and track your ticket balance in real time
- **Persist state** — boards and active game are saved to localStorage, so nothing is lost on refresh

## Stack

- React (Vite)
- Inline styles only — no CSS framework
- localStorage for persistence
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

## Data

Contains the complete database of all 48 Unfinity sticker sheets, including name, art, ability, and P/T stickers with their ticket costs.
