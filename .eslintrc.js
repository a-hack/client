module.exports = {
	"extends": "airbnb",
	"parser": "babel-eslint",
	"globals": {
		"__DEV__": true
	},
	"env": {
		"browser": true
	},
	"rules": {
		"max-len": [
			"error",
			120
		],
		"indent": [
			"error",
			"tab",
		],
		"no-tabs": "off",
		"quotes": [
			"error",
			"double",
			{
				"allowTemplateLiterals": true
			}
		],
		"no-prototype-builtins": "off",
		"no-useless-constructor": "off",
		"arrow-parens": "off",
		"generator-star-spacing": "off",
		"no-confusing-arrow": [
			"error",
			{
				"allowParens": true
			}
		],
		"no-nested-ternary": "off",
		"import/extensions": "off",
		"import/no-extraneous-dependencies": "off",
		"react/forbid-prop-types": "off",
		"react/jsx-no-bind": "off",
		"react/jsx-filename-extension": "off",
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/no-danger": "off",
		"react/no-unused-prop-types": "off"
	}
};
