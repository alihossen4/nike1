import mongoose from 'mongoose';
import {MONGO_URI} from '../constants.js';
import ApiError from '../utils/apiError.js';
const MAX_RETRIES = 3;
const MS_Delay = 1000;
let id;
const dbConnection = async (atempt =1) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Database connected `);
    // ${connection.connection.host}
  } catch (error) {
    clearInterval(id);
    if(atempt <= MAX_RETRIES){
      console.log(`Database connection failed`);
      
      let delay = MS_Delay *2 ** (atempt-1);
      console.log(`Retrying in ${delay/1000} seconds`);
      id = setTimeout(()=>{
        dbConnection(atempt+1)
      }, delay)
    }
    else{
      console.error("Maximum atempt reached throwing error");
      throw ApiError.databaseError(error.message);
    }
  }
};

export default dbConnection;