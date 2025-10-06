# tp-gestion-article

Frontend

Ce dépôt contient uniquement la partie frontend Angular du projet ApiArticle.

Prise en main rapide

1) Installer les dépendances

```powershell
npm install
```

2) Construire l'application (transformation des templates -> compilation -> restauration des sources)

```powershell
npm run build
```

3) Développement (optionnel)

Si vous voulez utiliser le serveur de développement `ng serve`, lancez d'abord la transformation afin que les templates soient valides pour Angular :

```powershell
node ./scripts/transform-to-angular.js
ng serve
# Quand vous avez terminé, restaurez les fichiers originaux :
node ./scripts/restore-originals.js
```

Licence
- Aucun fichier de licence n'est fourni ici. Ajoutez un fichier LICENSE si nécessaire.

Bonne continuation !
