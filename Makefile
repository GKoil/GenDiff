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
test-coverage:
	yarn test -- --coverage --coverageProvider=v8
test-watch:
	npx -n --experimental-vm-modules jest --watch --no-warnings
