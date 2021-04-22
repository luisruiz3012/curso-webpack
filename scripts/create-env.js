const fs = require('fs');

fs.writeFileSync('./env', `Api=${process.env.API}\n`)