import prettier from 'eslint-plugin-prettier'

export default [
  {
    plugins: { prettier: prettier },
    rules: {
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      'import/no-anonymous-default-export': 'off',
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid'
        }
      ]
    }
  }
]
