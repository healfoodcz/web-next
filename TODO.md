# [healfoodcz/web-next](https://preview.healfood.cz/en)

[**README**](./README.md) **TODO**

---

## Tasks

Priority and sorting system: <kbd>HIGH</kbd>, <kbd>MEDIUM</kbd>, <kbd>LOW</kbd>

- <kbd>HIGH</kbd> Simplify deployment
  - Create private image on [hub.docker.com](https://hub.docker.com/repository/docker/healfoodcz/)
  - In [dockerfile](./dockerfile), simplify to: `COPY package*.json .next .env`
    (comes from developer's `npm build`), then `RUN npm i `, and `CMD [ "npm", "start" ]`
  - Add a cli script: [deploy](./cli/deploy) (image deployment)
  - Refactor the cli script: [up](./cli/up) (pulling an image from hub.docker.com)
  - GitHub actions (?) for creating container images automatically?
  - GitHub actions (?) for pulling the newest version from GitHub?
  - Refactor the cli script: [down](./cli/down) (remove image afterward)
- <kbd>HIGH</kbd> ? Use GitHub secrets for .env
  - If so, then how to manage GitHub credentials securely? (probably SSH copy)
- <kbd>HIGH</kbd> Eliminate the initial redirect from /en -> /en/catalog
- <kbd>HIGH</kbd> Eliminate the initial redirect from /en/catalog -> /en/catalog/fruits-and-vegetables
- <kbd>MEDIUM</kbd> Create "About Us" page
- <kbd>MEDIUM</kbd> Refactor to keep features in the right directory
  - at `src/app/[locale]/(public)/catalog/[category]/[product]/page.content.tsx`
  - at `src/app/[locale]/(public)/bookmarks/page.content.tsx`
- <kbd>LOW</kbd> Server side logger
- <kbd>LOW</kbd> Emoji-fy md files?
- <kbd>LOW</kbd> Add home page
- <kbd>LOW</kbd> First release
- <kbd>LOW</kbd> External links catcher
- <kbd>LOW</kbd> Make more animations
- <kbd>LOW</kbd> Add CMS
- <kbd>LOW</kbd> [**Make use of NextUI styles**](https://nextui.org/docs/customization/custom-variants)
