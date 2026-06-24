# Brand font — Trajan Pro Bold

The "Sheeraj Projects" wordmark (navbar, preloader, footer) uses **Trajan Pro Bold**
via the `font-brand` Tailwind utility. The face is declared in
`src/app/globals.css` (`@font-face` → `--font-brand`).

## Drop your file here

Place the licensed font file in **this folder** named exactly one of:

| Format        | Filename                  | Notes                          |
| ------------- | ------------------------- | ------------------------------ |
| WOFF2 (best)  | `TrajanPro-Bold.woff2`    | Smallest, fastest. Preferred.  |
| OpenType      | `TrajanPro-Bold.otf`      | Works as-is.                   |
| TrueType      | `TrajanPro-Bold.ttf`      | Works as-is.                   |

You only need **one** of these. The `@font-face` lists all three, so whichever
you provide is picked up automatically on the next page reload — no code change.

- For zero console 404s and best performance, provide **`TrajanPro-Bold.woff2`**
  (convert an .otf/.ttf at e.g. fontsquirrel.com or `woff2_compress`).
- Until a file is present, the wordmark falls back to the display font (Sora) —
  nothing breaks.

> Note: Trajan Pro is a commercial Adobe font — ensure your license permits web
> embedding before deploying.
