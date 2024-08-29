const pool = require('./dbConnection')
const dotenv = require("dotenv"); 
dotenv.config();

const createTableQuery = `
CREATE TABLE IF NOT EXISTS ${process.env.DBTABLENAME} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
)
`;

const createdb = () =>{
    try{
        pool.query(createTableQuery,(err,result)=>{
            if(err){
                console.log('Error:', err.message);
                return;
            }
        
            console.log('Table `schools` created successfully')
        })
    }catch(error){
        console.log("Error in create db",error)
    }
}

module.exports = {createdb};


