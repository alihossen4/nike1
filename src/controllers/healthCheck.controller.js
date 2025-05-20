import ApiError from "../utils/apiError.js";
import apiSuccess from "../utils/apiSuccess.js";

const HealthCheck = async(_,res) =>{
    try{
        const uptimeSecond = process.uptime();
        const uptimeFormatted = formatUptime(uptimeSecond);
        return res
           .status(200)
           .json(apiSuccess.ok(
                { timeStamp: new Date().toLocaleString(), uptime: uptimeFormatted},
                'Server is running',
                console.log(uptimeFormatted)
           ));
           
    }
    catch(error){
        throw ApiError.serverError(error.message);
    }
}

function formatUptime (seconds){
    const days = Math.floor(seconds / (3600* 24));
    const hours = Math.floor((seconds % (3600*24)) /3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days} day${days !== 1? '': 's' }, ${hours} hour${hours !== 1? '': 's'}, ${minutes} minute${minutes !==1? '': 's'}
    }`
}
export {HealthCheck}