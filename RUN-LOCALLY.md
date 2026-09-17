# Running this birthday website in VS Code

## 1. Install Node.js

You need **Node.js 20.19+ or 22+** (check with `node -v`). Download: https://nodejs.org

## 2. Open the folder in VS Code

`File → Open Folder…` and pick this project folder (the one containing `package.json`).

## 3. Install dependencies

Open a terminal in VS Code (`Ctrl + \``) and run:

```bash
npm install
```

## 4. Start the site

```bash
npm run dev
```

Then open http://localhost:8080 in your browser.

## Other commands

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # check code
```

## Customizing

Everything personal (name, photos, messages, music, reasons) lives in
`src/config/birthday.ts`.

- Photos: drop images in `src/assets/` and import them in that file.
- Music: put an MP3 in `public/music/` and set `musicSrc: "/music/birthday.mp3"`.

## Troubleshooting

- **`npm : command not found`** → Node.js isn't installed or VS Code needs a restart.
- **Errors during `npm install`** → delete `node_modules` and `package-lock.json`, then run `npm install` again.
- **Port 8080 already in use** → run `npm run dev -- --port 3000`.
- **No music plays** → browsers block autoplay; click anywhere / press the music button first.
