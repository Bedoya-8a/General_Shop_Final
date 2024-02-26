import express from "express";

//para __dirname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";



//Servidor
const app = express();
app.set ("port",80);
app.listen(app.get("port"));
console.log("Servidor corriendo en el puerto",app.get("port"));  



//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
/*app.use(cookieParser());*/



//Rutas

app.get("/homeI.html",(req,res)=> res.sendFile(__dirname + "/pages/homeI.html"));

app.get("/home",(req,res)=> res.sendFile(__dirname + "/pages/home.html"));

app.get("/hombre.html",(req,res)=> res.sendFile(__dirname + "/pages/hombre.html"));

app.get("/mujer.html",(req,res)=> res.sendFile(__dirname + "/pages/mujer.html"));

app.get("/admin",(req,res)=> res.sendFile(__dirname + "/pages/Admin/admin.html"));

app.get("/login",(req,res)=> res.sendFile(__dirname + "/pages/login.html"));

app.get("/register",(req,res)=> res.sendFile(__dirname + "/pages/register.html"));

app.post("/api/login"),authentication.login;
app.post("/api/register",authentication.register);


/*************CONEXIÓN BD*************/ 



/*************CONEXIÓN BD*************/ 







/*************BUSCADOR*************/ 
/*app.post("/buscar-articulos", (req, res) => {
    const searchTerm = req.body.searchTerm;
  
    const query = "SELECT * FROM articulos WHERE tipo_Articulo LIKE ?";
    connection.query(query, [`%${searchTerm}$%`], (error, results) => {
      if (error) {
        console.error("Error al buscar artículos:", error);
        return res.status(500).json({ error: "Error al buscar artículos" });
      }
   
      res.json(results);
      });
  });




  
  /*************LISTAR PRODUCTOS**************/
