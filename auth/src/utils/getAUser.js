const mssql = require('mssql');
const config = require('../config/config')

async function getAUser(Username) {

    let sql = await mssql.connect(config)
    if (sql.connected) {
        let results = await sql.request()
            .input("Username", Username)
            .execute("GetUserByUsername")
        let user = results.recordset[0]
        console.log(results.recordset[0])

        return user
    }

}

module.exports = getAUser;