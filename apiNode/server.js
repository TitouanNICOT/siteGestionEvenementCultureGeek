import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app = express();
dotenv.config();
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");

const port = process.env.PORT;
import users from './routes/user.router.js';

import AppDAO from "./dao.js";
//const UserRepository = require("./repositories/user.repository")
import UserRepository  from  "./repositories/user.repository.js" ;
global.dao = new AppDAO();
global.userRepo = new UserRepository(dao);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// /** Swagger Initialization - START */
// const swaggerOption = {
//     swaggerDefinition: (swaggerJsdoc.Options = {
//         info: {
//             title: "my-notes app",
//             description: "API documentation",
//             servers: ["http://localhost:3000/"],
//         },
//     }),
//     apis: ["server.js", "./routes/*.js"],
// };
// const swaggerDocs = swaggerJsdoc(swaggerOption);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //?

app.use("/users",users);

app.get("/",(req, res)=>{
    res.status(200).send("salut");
})

app.listen(port,()=>{
    console.log("Le serveur ecoute sur port " + port);
    userRepo.createTable()
        .then(()=>{
            return userRepo.count()
        })
        .then((numrows)=>{
            console.log("num row nin employe "+numrows)
            if (numrows==0){
                return userRepo.initTable()
            }
        })
        .catch((err)=>{
            console.error(err)
        })
});