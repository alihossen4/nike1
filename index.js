import {app} from "./src/app.js";
import {PORT} from './src/constants.js';
import dbConnection from "./src/db/index.js";

// const error =  new Error("erorr sosn");
const serverStart = async() =>{
    try {
        await dbConnection();
        app.listen(PORT,()=>{
            console.log(`server is running http://localhost:${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
        console.error('File ` index.js : serverStart ~ error', error);
        process.exit(1);
    }
}

serverStart()
// console.log(error);
