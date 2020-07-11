publish:
	npm publish --dry-run
link:
	npm link
install i:
	npm build && npm link
uninstall u:
	npm unlink
lint:
	npx eslint .