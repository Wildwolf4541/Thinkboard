import express from 'express';
import { getAllNotes,getSpecificNote,createNote,updateNote,deleteNote } from '../controllers/notesController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router= express.Router();

// router.get("/",(req,res)=>{
//     res.status(200).send("You just fetched the notes.")
// })

// first this will hit and if passed through it, the routers and controllers will hit.
router.use(AuthMiddleware)

router.get("/", getAllNotes);
router.get("/:id", getSpecificNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export  default router;