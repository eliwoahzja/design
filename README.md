# Atelier by eli — React visual HTML/CSS/JS studio

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

1. Go to **Layers → body** to select and style the page itself. Blank-space taps leave selection unchanged to prevent accidental changes. All elements in the page are under this root.
2. Go to **Elements → Structure → Box** to add a `div`; select a container before adding other elements to nest them inside it. Use **Content → Wrap in box** to group an existing element.
3. Tap any node in the canvas or Layers to select it. On desktop, drag a palette tile onto a container or drag a node onto another container to reparent it. The floating Move handle lets you reposition a node while preserving normal document flow.
4. Change **Mobile, Tablet, Desktop** viewport sizes. The preview is genuinely constrained to a device-height scrolling pane; swipe or scroll inside it without scrolling the editor. For breakpoint-only CSS edits, toggle **Base** to the active device in the inspector.
5. Use **Design** to edit actual CSS properties, **Content** to edit text, tag, class, ID, and attributes, **Motion** for CSS animations, and **Actions** for generated JavaScript events.
6. Open **Code**, then **Copy full page** to copy a standalone one-file HTML document. Or copy HTML, CSS, and JavaScript separately. **Export code** downloads a ZIP containing `index.html`, `style.css`, `script.js`.
7. Switch **Edit code** on the HTML or CSS tab to import supported source changes into the visual document. The JS tab accepts custom JavaScript executed by the exported website, alongside generated interactions. Unsupported HTML tags are rejected rather than silently deleted.

## Undo, preserved gaps, and Layers

- **Undo / Redo:** The editor keeps up to 90 document revisions and restores the previous selection. Use the Undo / Redo buttons in the canvas footer (also available on phones), or `Ctrl/Cmd+Z` and `Ctrl/Cmd+Shift+Z` / `Ctrl+Y`. Undo after deleting restores the original element and its content.
- **Preserved empty space:** Deleting an element creates a temporary editor-only placeholder with the removed element's measured width and height. Adjacent Flexbox/Grid elements therefore keep their positions while you decide what to insert. Drop a palette item into the placeholder, select it in Layers and choose **Add [tag] here**, or undo the deletion. To intentionally collapse the space, select the placeholder and use **Remove this space**.
- **Layers:** Open **Layers** (bottom navigation on mobile) to select the `body` or any nested element without being sent back to the canvas. Expand and collapse groups, drag nodes into containers, or use the arrows on the selected row to reorder siblings. On mobile, tap **Canvas** when ready to edit visually.
- **Export behavior:** Reserved slots are editor aids, not HTML elements. No placeholder tags or styles are emitted to HTML/CSS/JS exports. Preview reflects the final exported page, which naturally reflows if an element has actually been removed.

## Scope and limitations

Includes nested semantic elements, body selection, boxes, drag/drop, template blocks, mobile-friendly editing tabs, scrolling mobile preview, responsive CSS, CSS property inspector, fonts, animations, click actions, source copy/export, undo/redo, and browser local autosave.

This is not a full Figma/Webflow replacement. It does not include arbitrary plugin execution, collaboration, asset hosting, a custom JavaScript AST inspector, visual animation timelines, or lossless round-tripping of every possible browser HTML/CSS/JavaScript construct. Custom JS is executed by the exported page, not inside the editor. Local autosave is per browser/device.

## Tests

`npm test` runs pure document model and exporter tests. Tests do not imply end-to-end browser coverage.

## Resize, grouping, and canvas-selection behavior

- Click an element to see eight on-canvas resize grips. Drag a grip with a mouse or touch; releasing saves CSS `width` and `height` for the active viewport, and Undo restores the previous size. Hold Shift while dragging a corner to maintain the aspect ratio.
- Open **Layers → Select multiple**, tap sibling layers, then choose **Group**. On desktop, **Shift + right-click** another element to add it to the selection; repeat for more elements, then press **Ctrl/Cmd+G** or **Group**. Shift-click and Ctrl/Cmd-click also work. On mobile, first tap one element, press **Select multiple** above the canvas footer, tap more elements, then press **Group**; use **Done** to leave selection mode. Groups are exported as actual nested HTML `<div class="studio-group">` containers. Choose **Ungroup** or press **Ctrl/Cmd+Shift+G** to unwrap the group without deleting its children.
- To preserve HTML semantics, only layers sharing the same immediate parent can be grouped. The editor displays an explanation for incompatible selections.
- Generated HTML/CSS/JS contains no boilerplate comments; any comments entered intentionally in custom CSS or JavaScript are kept.
- Tapping empty page space does not change the selected element or canvas position. Scroll gestures are excluded from selection, and HTML5 native element dragging is disabled for coarse touch pointers. Select the page `body` explicitly in Layers or via its breadcrumb.

These changes are backed by the document-model and geometry tests in `tests/grouping.test.js` and `tests/resize.test.js`.

## October 2026 — touch and alignment update

- Inlined SVG icons: no reliance on device emoji or icon fonts.
- A larger floating **Move** handle for touch and mouse, plus compact resize handles for short text elements.
- Smart alignment to parent and sibling edges/centers with visible guides.
- Optional grid snapping, container bounds, automatic viewport fit, and opening animation. Toggle in **Editor settings** (gear icon); these preferences save to local storage.
- Water fills the screen from bottom to 100%, then drains to reveal the editor. Reduced-motion preferences bypass the animation.
- Existing HTML/CSS/JS exports, layers, grouping, and undo/redo stay intact.

The drag/alignment engine is tested with node:test. Device-specific touch behavior requires testing on actual browsers.

## October 2026 — selection and animated icon update

- **Desktop multi-select:** Select a first canvas element, then Shift + right-click additional elements (including nested ones) to toggle them into the selection without opening the native context menu. Continue Shift + right-click to select more, then click **Group** or press Ctrl/Cmd+G. Ordinary right-click still opens the native menu.
- **Mobile multi-select:** Tap the first element, select **Select multiple** in the canvas toolbar, tap further elements, then press **Group**. The first element is retained when selection mode begins. Use **Done** to return to normal editing. The same controls are available in Layers.
- **Layer actions:** Search, expand/collapse, move up/down, duplicate, and grouping controls use device-independent SVG instead of text glyphs. Icons have raised surfaces and subtle hover/active animation, with reduced-motion support.
- Selecting/grouping affects only editor UI; generated HTML/CSS/JS stays free of editor-specific selection markup.


## Direct selection and live code preview

- **Tap a real element once** on the canvas to select it. Selection appears with a contextual toolbar; mobile users can immediately choose Design, JavaScript or View code without going through Layers.
- **Live code preview** is available from the canvas (HTML, CSS, JavaScript and a complete single-file page). On desktop the code dock starts open; on mobile the canvas button opens a compact code peek while the Code tab remains a full editor.
- **One-tap copy** is available for each source tab and the full page. Project ZIP export still creates separate `index.html`, `style.css` and `script.js` files.
- **Visual JavaScript** is not limited to buttons: choose `click`, `dblclick`, `input`, `change`, `submit`, `focus`, `blur`, `mouseenter`, `mouseleave` or `keydown`, then a behavior. Supported behaviors include visibility, classes, smooth scrolling, text/value sync, counters, CSS style changes, focusing, form resets and validation, alerts and safe HTTPS links.
- Use **Pick target on canvas** to choose the target element without writing a CSS selector. The chosen element gets a stable generated class selector. The same behavior logic is used in the preview and the exported script.

Generated JavaScript includes only configured behaviors and animation triggers; the app does not invent unnecessary scripts for static elements. Advanced source editing remains optional.
