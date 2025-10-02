import prettier from 'eslint-plugin-prettier'

export default [
  {
    plugins: { prettier: prettier },
    rules: {
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
