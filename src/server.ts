import express = require('express');
import * as dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Not implemented yet...');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Started at ::${PORT}`);
});
