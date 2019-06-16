module.exports = {
  hooks: {
    // 'prepare-commit-msg': 'exec < /dev/tty && npx commit --hook',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged'
  }
}
