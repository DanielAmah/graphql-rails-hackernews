const express = require('express');
const path = require('path');

// Set up the express app
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.all('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => console.log('server started'));
