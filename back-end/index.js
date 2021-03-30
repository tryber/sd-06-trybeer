require('dotenv/config');
// require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = require('./src/server');

app.listen(PORT, () => console.log(`Running on port ${PORT}`));