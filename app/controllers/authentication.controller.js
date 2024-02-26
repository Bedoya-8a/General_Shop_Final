/****************** COENXIÓN BD ******************/

import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/General_Shop";
const client = new MongoClient(uri);

let db;

async function connect() {
    if (client.readyState !== 1) {
        await client.connect();
    }
    db = client.db('General_Shop');
}
/****************** CONEXIÓN BD ******************/


/****************** FUNCIÓN LOGIN ******************/
async function login(req,res){
    

}

/**************** FUNCIÓN REGISTER ****************/
async function register(req,res){
    console.log(req.body)
      const user = req.body.user;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const select = req.body.select;
      const numDoc = req.body.numDoc;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      
      /*************VALIDA LOS CAMPOS **************/
      if (!user ||!lastname ||!email ||!select ||!numDoc ||!password ||!confirmPassword){
        res.status(400).send({ status:"Error", message: "Los campos estan incompletos" });
        return;
      }
      /**********VALIDA LAS CONTRASEÑAS ************/
      if (password !== confirmPassword) {
        res.status(400).send({ status:"Error", message: "Las contraseñas no coinciden" });
        return;
      }
      /***** VALIDA LA CANTIDAD DE CARACTERES ******/
      if (password.length < 5) {
        res.status(400).send({ status:"Error", message: "La contraseña debe tener al menos 5 caracteres" });
        return;
    }

    // /***** VALIDA POR EMAIL LOS USUARIOS EXISTENTES ******/ 
        async function userExists(email) {
            await connect();
            const user = await db.collection('Usuarios').findOne({ email });
            return user !== null;
    }




      /********** REGISRO Y ENVIO DE DATOS *********/
      try {
        // /***** VALIDA POR EMAIL LOS USUARIOS EXISTENTES ******/ 
        if (await userExists(email)) {
            res.status(400).send({ status:"Error", message: "El Usuario ya existe" });
        return;
        }


        await connect();
        const result = await db.collection('Usuarios').insertOne({
            user,
            lastname,
            email,
            select,
            numDoc,
            password
        });

        console.log('Usuario registrado con éxito:', result.insertedId);
    } catch (error) {
        console.error('Error al registrar los datos ');
    }
}


      








export const methods ={
    login,
    register
}