# element. â€” React visual website studio

An editor built with **React 19 and Vite 7**, using a real HTML node tree and an inspectable CSS document model. The editor and the exported website are separate: **open the React app**, not an exported `index.html`, to edit elements.

## Start

Requires Node.js 20.19+ and an internet connection for the initial dependency installation.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For production:

```bash
npm run test
npm run build
```

Use **Vite** as the Vercel framework preset, **`npm run build`** as the build command, and **`dist`** as the output folder.

**Do not open `index.html` directly using `file://` or `content://`.** Vite/React source needs the development server or a production build. The original screenshot showed the output website in a mobile file viewer, not the editing application.

## How to use

1. Go to **Layers â†’ body** to select and style the page itself. Clicking the empty page background also selects the body. All elements in the page are under this root.
2. Go to **Elements â†’ Structure â†’ Box** to add a `div`; select a container before adding other elements to nest them inside it. Use **Content â†’ Wrap in box** to group an existing element.
3. Tap any node in the canvas or Layers to select it. On desktop, drag a palette tile onto a container or drag a node onto another container to reparent it. The grip on a selected node allows absolute positioning.
4. Change **Mobile, Tab¶»§q«^