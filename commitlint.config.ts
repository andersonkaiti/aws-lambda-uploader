import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional', 'gitmoji'],
  rules: {
    'body-empty': [2, 'always'],
    'footer-empty': [2, 'always'],
  },
}

export default Configuration
