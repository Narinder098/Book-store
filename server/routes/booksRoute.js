import express from 'express';
import Book from "../models/bookModel.js";

const router = express.Router();

//add books
router.post('/', async (request, res) => {
    try {
        if (! request.body.title || ! request.body.author || ! request.body.publishYear) {
            return res.status(404).send({
                message: "All fiels are required",
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(404).send({ message: error.message });
    }
});

//find books
router.get('/', async ( req ,res)=> {
    try{
        const books = await Book.find({});
        return res.status(200).send({
            count:books.length,
            data:books
        })
    } catch(error){
        res.status(404).send({message: error.message});
    } 
})

//find books by id
router.get('/:id', async ( req ,res)=> {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).send({book})
    } catch(error){
        res.status(404).send({message: error.message});
    } 
})

//update book
router.put('/:id',async(req,res)=>{
    try{
        if (! req.body.title || ! req.body.author || ! req.body.publishYear) {
            return res.status(404).send({
                message: "All fiels are required",
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id , req.body);

        if(!result){
           return res.status(404).send({message: "Book not found"});
        }

        return res.status(200).send({message : "Book succesfully updated"});
    } catch(error){
        res.status(404).send({message: error.message});
    } 
})

// delete book 
router.delete('/:id',async(req,res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            res.status(404).send({message:"book not found"})
        }
        return res.status(200).send({message:"Book deleted succesfully"});
    }catch(error){
        res.status(404).send({message : error.message});
    }
})

export default router;  