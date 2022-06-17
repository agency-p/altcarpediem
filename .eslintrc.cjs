/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	env: {
		'vue/setup-compiler-macros': true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	rules: {
		// override/add rules settings here, such as:
		'vue/require-default-prop': 'off',
	},
};
