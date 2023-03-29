# Publishing of Flowifier JavaScript Client Library as NPM package on npmjs.com

1. Edit version in package.json -> [SemVer](https://semver.org/lang/de/)
2. Ensure release notes are documented in CHANGELOG.md
3. Open a terminal and go to the folder in which this file is located in.
4. Execute the following commands:
```console
npm login
npm publish --access public
```
5. Commit all changes and make a version branch if major or minor has changed or a tag if patch has changed