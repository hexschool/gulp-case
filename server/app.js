const express = require('express');

const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendfile('./public/');
});

app.listen(process.env.PORT || 5000);
