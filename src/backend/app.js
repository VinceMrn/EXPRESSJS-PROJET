const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/auth'); 
const routes = require('./routes/routes'); 
const secureRoutes = require('./routes/secure-routes'); 
const sequelize = require('./config/database'); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', routes); 
app.use('/', secureRoutes); 

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
