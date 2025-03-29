module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Only enforce rules related to the commit type
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'build',
      'ci',
      'chore',
      'revert'
    ]],
    'type-empty': [2, 'never'],
    
    // Disable other rules to keep the hook lightweight
    'body-leading-blank': [0],
    'body-max-line-length': [0],
    'footer-leading-blank': [0],
    'footer-max-line-length': [0],
    'header-max-length': [0],
    'scope-case': [0],
    'scope-empty': [0],
    'subject-case': [0],
    'subject-empty': [0],
    'subject-full-stop': [0],
    'type-case': [0]
  }
}; 