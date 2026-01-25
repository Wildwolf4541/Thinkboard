import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";


const NoteCard = ({ note, setNotes}) => {
  const handleDelete= async (e,id)=>{
    e.preventDefault(); // Prevent navigating to note detail page
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter(note => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.log("Error deleting note:", error);
    }
  }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-black hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-green-400"
    >
      <div className="card-body">
        <h3 className="card-title font-bold text-white">{note.title}</h3>

        <p className="text-white/80 line-clamp-3">
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-gray-400">
            {formatDate(new Date(note.updatedAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 text-green-400" />
            <button className="btn btn-ghost btn-xs text-error" 
            onClick={(e)=> handleDelete(e,note._id)}>
              <Trash2Icon className="size-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
