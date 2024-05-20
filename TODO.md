# [healfoodcz/web-next](https://preview.healfood.cz/en)

[**README**](./README.md) **TODO**

---

## Tasks

Priority and sorting system: <kbd>HIGH</kbd>, <kbd>MEDIUM</kbd>, <kbd>LOW</kbd>

- <kbd>HIGH</kbd> Simplify deployment
  - automatically update docker image (healfoodcz/web-next) when master branch gets new commit
    - command `./cli/push`
  - make deployment machine to detect new image and re-run `./cli/up` (how?)
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
