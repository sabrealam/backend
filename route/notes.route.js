const noteRoute = require("express").Router();
const  Notes   = require("../models/notesModel");
const auth = require("../middleweres/auth");


noteRoute.get("/", auth, async(req, res) => { 
    try {
        let notes = await Notes.find({userID : req.body.userID});
        if(notes.length == 0) return res.status(400).send({message : "No Notes Found"})
        res.status(200).send({data : notes})        
    } catch (error) {
        res.status(400).send({message : error.message})
    }
})

noteRoute.post(`/create` , auth , async(req, res) => {
    let {title, description} = req.body;

        try {
            let newNote = new Notes({title, description, userID : req.body.userID})
            await newNote.save();
            res.status(200).send({message : "Note Created"})
        } catch (error) {
            res.status(400).send({message : error.message})
        }
    })
    
noteRoute.patch(`/update/:id` , auth , async(req, res) => {
    let {title, description} = req.body;
    try {
            let note = await Notes.findByIdAndUpdate(req.params.id, {title, description,  userID : req.body.userID})
            await note.save();
            res.status(200).send({message : "Note Updated"})        
    } catch (error) {
        res.status(400).send({message : error.message})
    }
})
 

noteRoute.delete(`/delete/:id` , auth , async(req, res) => {
    // console.log(req.body.userID)
    // console.log(req.params.id)
    try {
        // if(req.body.userID != req.params.id) return res.status(400).send({message : "Access Denied"})

            await Notes.findByIdAndDelete(req.params.id)
            res.status(200).send({message : "Note Deleted"})        
    } catch (error) {
        res.status(400).send({message : error.message})
    }
})

module.exports = noteRoute
