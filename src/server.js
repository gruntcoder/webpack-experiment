const express = require('express');
const app = express();

function main() {

  app.use('/', express.static('dist/'));

  app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
  });

}

main();
