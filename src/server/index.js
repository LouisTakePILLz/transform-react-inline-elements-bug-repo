var express = require('express')
var app = express()

app.use('/assets', express.static('./dist'))

app.get('/', (req, res) => res.sendFile('index.html', {root: './public'}))

app.listen(8181, () => {
  console.log('Listening on port 8181')
})
