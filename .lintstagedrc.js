module.exports = {
  '*.{js,ts,tsx}': ['prettier --write', 'git add'],
  '*.json': ['prettier --write', 'git add'],
  'package-lock.json': ['git rm --cached']
}
