# Publishing checklist

- confirm `repository`, `bugs`, and `homepage` URLs point to `Mateja3m/ccip-safety-kit`
- run `npm install`
- run `npm test`
- review package contents with `npm pack --dry-run`
- log in with `npm login`
- bump the version with `npm version <patch|minor|major>`
- publish with `npm publish --access public`
- verify `npx ccip-safety-kit --help`
- verify `npx ccip-safety-kit analyze ./examples`
- create a GitHub release and tag
