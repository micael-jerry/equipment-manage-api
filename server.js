const app = require('./app');
const { connectAppToDatabase } = require('./src/conf/db.conf');

require('dotenv').config();

connectAppToDatabase();

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Serveur démarré sur le port ${port}`);
});
