const connection = require("../db");

module.exports = {
    getKnowAbouts: async ()=>{
        connection.query(`select * from uc_data where intent='KnowAbout' group by added LIMIT 5`,(err,results,fields)=>{
            console.log("query response:" , results)
            return results;
        })
    },
    putKnowAbouts:()=>{}
}