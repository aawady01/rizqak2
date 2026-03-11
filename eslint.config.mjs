import withNuxt from './.nuxt/eslint.config.mjs'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'

export default withNuxt({
  plugins: {
    'vuejs-accessibility': vuejsAccessibility,
  },
  rules: {
    ...vuejsAccessibility.configs.recommended.rules,
  },
})
