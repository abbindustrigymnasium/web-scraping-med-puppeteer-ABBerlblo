const { execSync } = require('child_process')

const arg = process.argv[2]
const filename = arg ? `Data/${arg}_db.json` : 'Data/_db.json'

execSync(`json-server -p 4000 --watch ${filename}`, { stdio: 'inherit' })