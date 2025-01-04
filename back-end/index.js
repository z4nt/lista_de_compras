import express from "express";
import cors from "cors";
import router from "./src/routes/Router.js";
import sequelize from "./src/models/model.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
    