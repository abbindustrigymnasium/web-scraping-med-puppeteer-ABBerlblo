const { execSync } = require('child_process')

const arg = process.argv[2]
const filename = arg ? `${arg}_db.json` : '_db.json'

execSync(`json-server -p 4000 --watch ${filename}`, { stdio: 'inherit' })