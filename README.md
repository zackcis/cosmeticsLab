# Maison Néra

Boutique de démonstration pour une marque de cosmétiques artisanaux. Le site présente la maison, le catalogue et un panier, puis prépare la commande dans WhatsApp. Il n’y a pas de paiement en ligne.

## Lancer le projet

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

## Remplacer l’identité de la marque

Tout le contenu remplaçable est centralisé.

| Élément | Fichier |
| --- | --- |
| Nom de la marque, Instagram, e-mail | `src/config/site.js` |
| Textes français et arabes (navigation, pages, boutons, messages WhatsApp) | `src/i18n/copy.js` |
| Numéro WhatsApp | `.env` (voir ci-dessous) |
| Produits, prix, textes français, traductions arabes | `src/data/products.js` (`arabicCopy`) |
| Photographies | `public/images/` |

1. **Nom de la marque** — modifiez `name` dans `src/config/site.js`. La signature, l’annonce et les textes de page sont dans `src/i18n/copy.js`, en `fr` et en `ar`. Le logo du site est le nom, affiché en typographie. Il n’y a pas de fichier image de logo à remplacer, sauf le favicon `public/favicon.svg`.
2. **Produits** — chaque entrée de `src/data/products.js` a un `id`, un `name`, un `price` en dirhams, une `category` (`visage`, `corps`, `savons` ou `coffrets`), un `image`, un `alt`, un `short`, une `description`, un `size` et, si besoin, des `variants`. La version arabe du même produit est dans `arabicCopy`, avec la même clé `id`.
3. **Images** — déposez les photos de la marque dans `public/images/` et mettez à jour les chemins (`/images/nom-du-fichier.jpg`). Le hero utilise `/images/hero.jpg`. Les autres visuels d’ambiance sont listés dans `src/config/site.js` (`craftStages`) et dans les sections `BrandStory` et `Featured`.
4. **Prix** — champ `price` de chaque produit, en nombre entier de dirhams. L’affichage ajoute `MAD` en français et `درهم` en arabe. Les chiffres restent occidentaux.
5. **Instagram** — `instagramUrl` dans `src/config/site.js`. Laissez une chaîne vide pour masquer le lien.
6. **E-mail** — `email` dans `src/config/site.js`. Laissez une chaîne vide pour masquer le lien.

Les textes actuels et les photographies sont une démonstration. Ils ne décrivent pas le catalogue réel de la marque.

## Numéro WhatsApp

Créez un fichier `.env` à la racine, à partir de `.env.example` :

```bash
VITE_WHATSAPP_NUMBER=212612345678
```

- Format international, sans `+` et sans espaces.
- Un numéro marocain local `06XXXXXXXX` est converti automatiquement en `2126XXXXXXXX`.
- Si la variable est absente ou invalide, le site n’envoie la commande à personne. Il affiche le message prêt à copier.
- Quand le numéro est valide, « Commander via WhatsApp » ouvre WhatsApp dans un nouvel onglet, avec le texte déjà rédigé. Le message est en français ou en arabe, selon la langue choisie sur le site. Le visiteur décide d’envoyer. Le panier n’est pas vidé.

## Langues

Le visiteur bascule entre le français et l’arabe avec **FR | العربية**. Le choix est mémorisé. En arabe, la page passe en lecture de droite à gauche, avec les polices Noto Naskh Arabic et IBM Plex Sans Arabic. Les photos ne sont pas inversées.

Après un changement de `.env`, relancez `npm run dev`. Sur Vercel, ajoutez la variable puis redéployez.

Ne placez pas de secret dans cette variable : un numéro WhatsApp public est visible dans le site une fois construit.

## Déployer sur Vercel

1. Poussez le projet sur GitHub.
2. Sur [Vercel](https://vercel.com), importez le dépôt.
3. Framework : **Vite**. Commande de build : `npm run build`. Dossier de sortie : `dist`.
4. Ajoutez la variable d’environnement `VITE_WHATSAPP_NUMBER`.
5. Déployez.

Le site est entièrement statique. Aucun serveur n’est requis.

Pour l’image de partage (Open Graph), le fichier est `/images/hero.jpg`. Après la mise en ligne, vous pouvez remplacer la balise `og:image` de `index.html` par l’URL absolue du site si vous le souhaitez.
# cosmeticsLab
