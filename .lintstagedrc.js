module.exports = {
  '*.{js,ts,tsx}': ['prettier --write', 'git add'],
  '*.json': ['prettier --write', 'git add']
}
