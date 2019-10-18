const connection = require("../db");

module.exports = {
    getKnowAbouts: async () => {
        return await connection.promise().query(`SELECT COUNT(intent) as ic, added from uc_data where intent='KnowAbout' group by added order by added DESC limit 5;`)
        
    },
    putKnowAbouts: () => { }
}