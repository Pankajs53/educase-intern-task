const pool = require("../config/dbConnection");
const schema  = require("../utils/validation")
const dotenv = require("dotenv"); 
dotenv.config();
// 1st -> POST API
const tableName = process.env.DBTABLENAME;

const addSchool = async(req,res) =>{
    try{

        // perform validation using joi
        const {error} = schema.validate(req.body);
        if(error){
            console.log("ERROR IN DATA VALIDATION IN ADD SCHOOL API",error);
            return res.status(400).json({
                success:false,
                message:`DATA VALIDATION ERROR, ${error}`,
            })
        }

        // if no data validation error
        const {name,address,latitude,longitude} = req.body;

        // QUERY TO ADD DATA IN MYSQL DATABASE
        const addQuery = `
            INSERT INTO ${tableName} (name,address,latitude,longitude)
            VALUES (?, ?, ?, ?)
        `
        console.log("TABLE NAME IS->",tableName)

        await new Promise((resolve,reject)=>{
            pool.query(addQuery,[name, address, latitude, longitude],(err,result)=>{
                if(err){
                    console.log("ERROR IN ADDING SCHOOL DATA",err)
                    return reject(err);
                }
    
                console.log("DATA ADDED IN DB TABLE",result);
                resolve(result);
            })
        })

        // Send success response after data is added
        return res.status(200).json({
            success: true,
            message: "DATA ADDED SUCCESSFULLY"
        });
        
    }catch(error){
        console.log("Error in ADD SCHOOL API",error);
        return res.status(501).json({
            success:false,
            message:"Some Error in ADD SCHOOL API"
        })
    }
}


const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const toRadians = (degrees) => degrees * (Math.PI / 180);


const getSchools = async () => {
    const fetchAllQuery = `SELECT * FROM ${tableName}`;
    try {
        // Using a Promise to handle the asynchronous query
        const rows = await new Promise((resolve, reject) => {
            pool.query(fetchAllQuery, (err, result) => {
                if (err) {
                    console.log("ERROR IN GET ALL SCHOOLS FUNC", err);
                    return reject(err);
                }
                console.log(result)
                resolve(result);
            });
        });
        console.log(rows.length)
        for(let i=0; i<rows.length; i++){
            console.log(rows[i])
        }
        return rows;
    } catch (err) {
        console.error("Error fetching schools:", err);
        throw err;
    }
};

const getAllSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required",
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latitude or longitude",
            });
        }

        const schools = await getSchools();

        console.log("ALL SCHOOLS LIST",schools)

        // Calculate distance for each school and add it to the result
        schools.forEach(school => {
            school.distance = calculateDistance(
                userLat, userLon,
                parseFloat(school.latitude), parseFloat(school.longitude)
            );
        });

        // Sort schools by distance
        schools.sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            data: schools,
        });

    } catch (error) {
        console.log("Error in GET ALL SCHOOL API", error);
        return res.status(500).json({
            success: false,
            message: "Some Error in GET ALL SCHOOL API",
        });
    }
};

module.exports = { addSchool, getAllSchools };
