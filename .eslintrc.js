module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [
      'warn',
      120,
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'operator-linebreak': [
      'error',
      'before',
    ],
    'one-var': [
      'error',
      {
        var: 'never',
        let: 'never',
        const: 'never',
      },
    ],
    'no-unreachable': 'error',
    semi: [
      'error',
      'always',
    ],
    'no-use-before-define': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'quote-props': ['error', 'as-needed'],
    // https://eslint.vuejs.org/rules/html-indent.html
    'vue/html-indent': ['error', 2, {
      alignAttributesVertically: false,
    }],
    // https://eslint.vuejs.org/rules/html-self-closing.html
    'vue/html-self-closing': ['error', {
      html: {
        normal: 'any',
      },
    }],
    // https://eslint.vuejs.org/rules/no-unused-components.html
    'vue/no-unused-components': 'off',
    // 'vue/return-in-computed-property': 'off',
    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: [],
    }],
  },
};
