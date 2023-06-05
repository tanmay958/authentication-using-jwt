const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


const { PORT } = require('./config/serverConfig');
const {DB_SYNC} =  require("./config/serverConfig");
const db =  require("./models/index");
// const {User,Role} =  require("./models/index") // this model.index returns the each object 

const apiRoutes = require('./routes/index');
const app = express();

const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {

        if(DB_SYNC)
        {
            db.sequelize.sync({alter :  true});
        }


    



        console.log(`Server Started on Port: ${PORT}`);
  

    });
}   

prepareAndStartServer();