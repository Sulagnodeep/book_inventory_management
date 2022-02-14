const express = require('express')
const axios = require('axios')
const auth = require('../middleware/auth')
const Store = require('../models/store')
const Book = require('../models/book')
const User = require('../models/user')
const router = new express.Router()

router.post('/store', auth, async(req,res) => {
    const store = new Store({
        ...req.body,
        owner: req.user._id
    })

    try{
        await store.save()
        res.status(201).send(store)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/store', auth, async(req,res) => {
    try{
        await req.user.populate('stores')
        res.send(req.user.stores)

    } catch(e) {
        res.status(500).send()
    }
})

//listing all the books in that store inventory
router.get('/store/:id', auth, async(req,res) => {
    const store_id = req.params.id
    
    try{
        const checkStore = await Store.findOne({_id:store_id, owner:req.user._id})
        if(!checkStore)
        {
            res.status(400).send()
        }

        const books = await Book.find({store: store_id, })
        res.send(books)
    }catch(e) {
        res.status(500).send()
    }
})

//adding book to a store
router.post('/store/:id', auth, async(req,res) => {
    const name = req.body.name
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q='+name)
    const googleApiId = response.data.items[0].id // Assuming google books always gives right book at first option.
    const book = new Book({
        ...req.body,
        google_id: googleApiId,
        store: req.params.id
    })

    try{
        const checkStore = await Store.findOne({_id:req.params.id, owner:req.user._id})
        if(!checkStore)
        {
            res.status(400).send()
        }
        await book.save()
        res.status(201).send(book)
    }catch(e){
        res.status(400).send(e)
    }
})

//deleating book from store
router.delete('/store/:id/:book', auth, async(req,res) => {
    try{
        const checkStore = await Store.findOne({_id:req.params.id, owner:req.user._id})
        if(!checkStore)
        {
            res.status(400).send()
        }

        const book = await Book.findByIdAndDelete({_id: req.params.book})
        res.send(book)
    }catch(e) {
        res.status(500).send()
    }
})

//updating book
router.patch('/store/:id/:book', auth, async(req,res) => {
    try{
        const checkStore = await Store.findOne({_id:store_id, owner:req.user._id})
        if(!checkStore)
        {
            res.status(400).send()
        }

        const book = await Book.findByIdAndUpdate(req.params.book, req.body, {
            new: true,
            runValidators: true
        })

        res.send(book)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router