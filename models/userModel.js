const db = require('../config/db')

//async - wait
const getAllBooks = async () =>{
    const [rows] = await db.query("SELECT * from buku")
    return rows
}

const getBookByCode = async(code) =>{
    const [row] = await db.query("SELECT * from buku where kode_buku = ?", [code])
    return row[0]
}
module.exports = {getAllBooks, getBookByCode}