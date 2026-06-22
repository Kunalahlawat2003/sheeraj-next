# Brand font — Tarzan Pro

The "Sheeraj Projects" wordmark (navbar, preloader, footer) uses **Tarzan Pro**
via the `font-brand` Tailwind utility. The face is declared in
`src/app/globals.css` (`@font-face` → `--font-brand`).

## Drop your file here

Place the licensed font file in **this folder** named exactly one of:

| Format        | Filename            | Notes                          |
| ------------- | ------------------- | ------------------------------ |
| WOFF2 (best)  | `TarzanPro.woff2`   | Smallest, fastest. Preferred.  |
| OpenType      | `TarzanPro.otf`     | Works as-is.                   |
| TrueType      | `TarzanPro.ttf`     | Works as-is.                   |

You only need **one** of these. The `@font-face` lists all three, so whichever
you provide is picked up automatically on the next page reload — no code change.

- For zero console 404s and best performance, provide **`TarzanPro.woff2`**
  (convert an .otf/.ttf at e.g. fontsquirrel.com or `woff2_compress`).
- Until a file is present, the wordmark falls back to the display font (Sora) —
  nothing breaks.
- If your purchase only ships a differently-named file or extra weights (e.g. a
  separate Bold), tell me and I'll adjust the `@font-face` block.

> Note: Tarzan Pro is a commercial font — ensure your license permits web
> embedding before deploying.
