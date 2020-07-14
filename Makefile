publish p:
	npm publish --dry-run
link:
	npm link
install i:
	npm build && npm link
uninstall u:
	npm unlink
lint:
	npx eslint .
test-coverage tc:
	yarn test -- --coverage --coverageProvider=v8
test-watch tw:
	npx -n --experimental-vm-modules jest --watch --no-warnings
