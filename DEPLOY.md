# Phone Demo Deploy

Use this when you want a public URL you can open on your phone before pitching
Mariana's in person.

## Best free option: GitHub Pages

1. Create a new GitHub repo, for example `mariana-taco-shop`.
2. From this folder, push the site:

```bash
git init
git add .
git commit -m "Prepare Mariana demo for GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mariana-taco-shop.git
git push -u origin main
```

3. In GitHub, open the repo settings:
   - Settings
   - Pages
   - Source: GitHub Actions

4. Wait for the `Deploy to GitHub Pages` action to finish.

Your demo URL will usually be:

```text
https://YOUR-USERNAME.github.io/mariana-taco-shop/
```

If you name the repo something else, the URL uses that repo name.

## Local checks

```bash
npm run typecheck
npm run lint
npm run build
npm run build:pages
```

`npm run build:pages` writes the static site to `out/`.
