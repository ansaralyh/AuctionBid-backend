const Contact = require('../models/contactModel')

exports.createContact = async (req, res) => {
    try {
        const {name, email, message} = req.body;
        const newContact = new Contact({name, email, message});
        await newContact.save();
        res.status(201).json(newContact)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.getAllContact = async (req, res) => {
    try {
        const findAll = await Contact.find();
        if(!findAll){
            res.status(404).json({message: 'Query not found'});
        }
        res.status(200).json(findAll)
    } catch (error) {
        res.status(500).json(error)
    }
}