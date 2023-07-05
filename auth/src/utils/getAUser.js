const mssql = require('mssql');
const config = require('../config/config')

async function getAUser(Username, pool) {

    
    if (pool.connected) {
        let results = await pool.request()
            .input("Username", Username)
            .execute("GetUserByUsername")
        let user = results.recordset[0]
        console.log(results.recordset[0])

        return user
    }

}

module.exports = getAUser;