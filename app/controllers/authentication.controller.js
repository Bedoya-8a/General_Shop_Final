/* SE IMPORTA LA LIBRERIA PARA ENCRIPTAR LAS CONTRASEÑAS */
import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt";
import mongoose from "mongoose"


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



/****************** FUNCIÓN LOGIN ******************/
// Función para comparar la contraseña ingresada con la contraseña almacenada en la base de datos
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

// Función de inicio de sesión de usuarios
async function login(req, res) {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    // Valida los campos
    if (!email || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Función para verificar si el usuario existe
    async function userExists(email) {
        await connect();
        const user = await db.collection('Usuarios').findOne({ email });
        return user !== null;
    }

    // Verifica si el usuario existe
    if (!(await userExists(email))) {
        return res.status(400).send({ status: "Error", message: "El Usuario no existe" });
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const user = await db.collection('Usuarios').findOne({ email });
    const isPasswordValid = await comparePassword(password, user.password);

    // Si la contraseña es válida, redirige al usuario al home
    if (isPasswordValid) {
        return res.status(200).send({ status: "Ok", message: "Inicio de sesión exitoso", redirect: "./homeI" });
    }

    // Si la contraseña no es válida, arroja un error
    return res.status(400).send({ status: "Error", message: "La contraseña es incorrecta" });

}

/**** LOGIN ****/



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
        return res.status(400).send({ status:"Error", message: "Los campos estan incompletos" });
        return;
      }
      /**********VALIDA LAS CONTRASEÑAS ************/
      if (password !== confirmPassword) {
        return res.status(400).send({ status:"Error", message: "Las contraseñas no coinciden" });
        return;
      }
      /***** VALIDA LA CANTIDAD DE CARACTERES ******/
      if (password.length < 5) {
        return res.status(400).send({ status:"Error", message: "La contraseña debe tener al menos 5 caracteres" });
        return;
    }

    // /***** VALIDA POR EMAIL LOS USUARIOS EXISTENTES ******/ 
        async function userExists(email) {
            await connect();
            const user = await db.collection('Usuarios').findOne({ email });
            return user !== null;
    }

    /********** ENCRIPTA LAS CONTRASEÑAS *********/
    async function hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        return hashedPassword;
      }

    
      try {
        if (await userExists(email)) {
            return res.status(400).send({ status:"Error", message: "El Usuario ya existe" });
        return;
        }
        /********** HASHEA O ENCRIPTA LA CONTRASEÑA *********/
        const hashedPassword = await hashPassword(password);

        await connect();
        const result = await db.collection('Usuarios').insertOne({
            user,
            lastname,
            email,
            select,
            numDoc,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });

// /***** NOS REDIRECCIONA DESPUES DEL REGISTRO ******/ 
        return res.status(201).send({
            status: "Ok",
            message: `Usuario agregado`,
            redirect: "./homeI",
          });

        console.log('Usuario registrado con éxito:', result.insertedId);
    } catch (error) {
        console.error('Error al registrar los datos ');
    }
}


      




export const connection ={
    connect
}

export const methods ={
    login,
    register
}