import Note from"../models/Note.js";

const getAllNotes= async (req,res)=>{
    try {
        const notes=await Note.find().sort({createdAt:-1})
        res.status(200).json(notes);

    } catch (error) {
        res.status(500).json({message:`Internal server error -> ${error.message}`});
        console.error("error: ",error);
    }
}
// Note.find().sort({createdAt:-1}) // to sort in descending order of creation time

const getSpecificNote= async(req,res)=>{
    try {
        const id=req.params.id;
        const note = await Note.findById(id);

        if(!note){
            return res.status(404).json({message:`Note with id: ${id} not found`});
        }
        res.status(200).json(note);

    } catch (error) {
        res.status(500).json({message:`Internal server error -> ${error.message}`});res.status(500).json({message:`Internal server error -> ${error.message}`});
        console.error("error: ",error);
    }
}

const createNote= async(req,res)=>{
    try {
        const {title,content}=req.body
        const newNote= new Note({title,content});
        const savedNote=await newNote.save();

        res.status(201).json(savedNote);

    } catch (error) {
        res.status(500).json({message:`Internal server error -> ${error.message}`});
        console.error("error: ",error);
    }
}

const updateNote= async(req,res)=>{
    try {
        const id=req.params.id;
        const {title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(id,{title,content},{new:true});

        if(!updatedNote){
            return res.status(404).json({message:`Note with id: ${id} not found`});
        }
        res.status(200).json(updatedNote);

    } catch (error) {
        res.status(500).json({message:`Internal server error -> ${error.message}`});
        console.error("error: ",error);
    }
}

const deleteNote=async(req,res)=>{
    try {
        const id=req.params.id;
        const deletedNote=await Note.findByIdAndDelete(id);

        if(!deletedNote){
            return res.status(404).json({message:`Note with id: ${id} not found`});
        }
        res.status(200).json({message:`Note with id: ${id} deleted successfully`});

    } catch (error) {
        res.status(500).json({message:`Internal server error -> ${error.message}`});
        console.error("error: ",error);
    }
}

export {getAllNotes,getSpecificNote,createNote,updateNote,deleteNote};