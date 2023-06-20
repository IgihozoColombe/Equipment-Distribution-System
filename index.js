    //to load env varibales from .env to process.env
    require('dotenv').config()
    var bodyParser = require('body-parser')
    const express = require('express')
    var app = express();
    const cors = require('cors')
    const authenticateToken = require('./utils/authToken');
    const user=require('./routes/userRoutes')
    const employeeLaptop=require('./routes/employeeRoutes')
    const swaggerUi= require('swagger-ui-express')
    const swaggerDocument=require('./swagger.json')


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors())

    app.use('/',user)
    app.use('/api',employeeLaptop)
    app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // app.use('/', auth)
    // app.use('/students', authenticateToken, apiRoutes)



    const port = process.env.PORT
    app.listen(port, () => console.log(`listening on port ${port}....`));