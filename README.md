# tp-gestion-article

Frontend (student-friendly)

Simple Angular frontend for the ApiArticle project.

Notes for students:
- Source templates in `src/app` use `@if` / `@for` markers (this is an educational convenience).
- The build process temporarily converts `@if/@for` back to Angular `*ngIf/*ngFor` before compiling, then restores the originals. Use `npm run build` to run this whole workflow.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Build the app (transforms templates -> builds -> restores originals):

```powershell
npm run build
```

3. (Optional) Serve during development:

If you prefer `ng serve`, run the transform first so templates are valid for the dev server:

```powershell
node ./scripts/transform-to-angular.js
ng serve
# when done, restore originals:
node ./scripts/restore-originals.js
```

That's it — commit and push to your remote repo when ready.
