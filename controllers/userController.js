const userModel = require ('../models/userModel')

const getAllBooks = async(req, res) =>{
    try{
        const books = await userModel.getAllBooks()
        res.json(books)
    }
    catch (error){
        res.status(500).json(
            {
                message : "error get all book",
                status : 500
            }
        )
    }
}

const getBookByCode = async (req, res) =>{
    try{
        const book = await userModel.getBookByCode(req.params.code);

        if(!book){
            return res.status(404).json(
            {
                message :  "data not found"
            });
        }

        res.json(book);
        
    }catch (error) {
        res.status(500).json({message : error})
    }
}

const addBook = async(req, res) =>{
    const {kode, judul, pengarang, penerbit} = req.body;
    let isKode = true
    let isJudul = true
    let msg = ""

    if(!kode){
        msg = msg + "kode wajib diisi\n"
        isKode = false
    }

    if(!judul){
        msg = msg + "judul wajib diisi\n"
        isJudul = false
    }

    if(isKode && isJudul){
        try{
            const affected = await userModel.addBook(req.body);

            if(affected == 1){
                res.status(200).json({
                    msg : "insert successful",
                    data : {...req.body}
                })
            }
        } catch (error) {
            res.status(400).json({
                message : error
            });
        }
    }
    else{
        res.status(400).json({msg : msg})
    }
}

const delBook = async(req, res)=>{
    try{
        const result = await userModel.delBook(req.params.code)

        if(result == 1){
            res.status(200).json({msg : "delete is successful"})
        }
        
        else (
            res.status(400).json({msg : "failed"})
        )
    }
    catch(error){
        res.status(400).json({msg : error})
    }
}

const updateBook = async (req, res) =>{
    const code = req.params.code
    const {judul, pengarang, penerbit} = req.body

    try {
        const affected = await userModel.updateBook(code, req.body)

        if (affected == 1){
            return res.status(200).json({
                msg : "book updated successfully",
                updated_code : code
            })
        }
        res.status(400).json({
            msg : "no book was updated."
        })
    }
    catch (error){
        res.status(400).json({
            msg : "an error occured during update."
        })
    }
}
module.exports = {getAllBooks, getBookByCode, addBook, delBook, updateBook}