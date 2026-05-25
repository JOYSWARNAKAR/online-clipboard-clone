# Online Clipboard Clone

A full-stack online clipboard app inspired by [GoOnlineTools Online Clipboard](https://goonlinetools.com/online-clipboard/). Share text across devices using a 6-digit PIN, shareable link, or QR code—with optional self-destruct and live WebSocket sync.

## Project structure

```
online-clipboard-clone/
├── Backend/          # Express API + WebSocket server
│   └── src/
│       ├── config/       # Environment & app settings
│       ├── constants/    # Shared constants
│       ├── controllers/  # Request handlers
│       ├── middleware/   # Validation & error handling
│       ├── routes/       # API route definitions
│       ├── services/     # Business logic
│       ├── store/        # In-memory data layer
│       ├── utils/        # Helpers & custom errors
│       └── websocket/    # Real-time sync
├── Frontend/         # React + Vite + Tailwind
│   └── src/
│       ├── api/          # HTTP client & API calls
│       ├── components/   # UI (common, layout, share, retrieve)
│       ├── constants/
│       ├── hooks/
│       └── utils/
└── package.json      # Root scripts (run both apps)
```

## Features

- **Share** — Paste text, optional self-destruct (one view), get PIN + URL + QR code
- **Retrieve** — Enter 6-digit ID or open `?id=123456` link
- **Live sync** — WebSocket updates content across connected clients
- **Auto expiry** — Clipboards expire after 24 hours

## Quick start

```bash
# Install all dependencies
npm run install:all

# Run Backend (port 3001) + Frontend (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Run separately

```bash
npm run dev:backend   # http://localhost:3001
npm run dev:frontend  # http://localhost:5173 (proxies /api and /ws)
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/clipboard` | Create clipboard `{ content, selfDestruct }` |
| GET | `/api/clipboard/:id` | Retrieve (deletes if self-destruct) |
| PATCH | `/api/clipboard/:id` | Update content |
| WS | `/ws?room=:id` | Live sync (`sync` / `update` messages) |

## Environment (Backend)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | Server port |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed frontend origin |
| `MAX_CONTENT_LENGTH` | `50000` | Max characters per clipboard |

## Tech stack

- **Backend:** Node.js, Express 5, WebSocket (`ws`)
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, qrcode.react
