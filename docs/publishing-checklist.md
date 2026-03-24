# Final npm release checklist

Use this checklist for the first public release of `ccip-safety-kit`.

## 1. Preflight

- confirm the repo is pushed to `main`
- confirm `repository`, `bugs`, and `homepage` in `package.json` point to `Mateja3m/ccip-safety-kit`
- confirm `package.json` version is the version you want to publish
- confirm `git status` is clean
- confirm you are logged into the correct npm account with `npm whoami`
- confirm the package name is available or already owned by you:
  - `npm view ccip-safety-kit version`

## 2. Local verification

- install dependencies:
  - `npm install`
- run the release smoke test:
  - `npm test`
- inspect the publish tarball:
  - `npm pack --dry-run --cache /tmp/ccip-safety-kit-npm-cache`
- confirm the tarball contains:
  - `dist/`
  - `README.md`
  - `LICENSE`
  - intended `docs/`
  - intended `examples/`
- confirm the built CLI works locally:
  - `node ./dist/cli.js --help`
  - `node ./dist/cli.js analyze ./examples`

## 3. Optional global install check

- link the package locally:
  - `npm link`
- verify the installed command works:
  - `ccip-safety-kit --help`
  - `ccip-safety-kit analyze ./examples`

## 4. Versioning and publish

- bump the release version:
  - `npm version patch`
  - or `npm version minor`
  - or `npm version major`
- publish publicly:
  - `npm publish --access public`

## 5. Post-publish verification

- verify npm metadata:
  - `npm view ccip-safety-kit name version dist-tags.latest repository.url`
- verify `npx` works:
  - `npx ccip-safety-kit --help`
  - `npx ccip-safety-kit analyze ./examples`
- verify the GitHub repo and npm package page both render the README correctly

## 6. Release wrap-up

- push the version tag and commit:
  - `git push origin main`
  - `git push origin --tags`
- create a GitHub release for the published version
- add short release notes with:
  - initial package purpose
  - supported commands
  - current heuristic limitations

