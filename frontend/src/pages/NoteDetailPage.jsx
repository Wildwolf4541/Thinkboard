import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b1717] flex items-center justify-center text-green-400">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b1717] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition"
            >
              <ArrowLeftIcon className="size-5" />
              <span>Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 btn btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-black transition"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-black/50 backdrop-blur border border-green-400/30 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold text-green-400 mb-6">
                Edit Note
              </h2>

              <div className="space-y-6">
                {/* Title Field */}
                <div className="form-control flex flex-col gap-2">
                  <label className="label p-0">
                    <span className="label-text text-gray-300">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered bg-black border-green-400/40 text-white focus:border-green-400 focus:outline-none w-full"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                {/* Content Field */}
                <div className="form-control flex flex-col gap-2">
                  <label className="label p-0">
                    <span className="label-text text-gray-300">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-40 bg-black border-green-400/40 text-white focus:border-green-400 focus:outline-none resize-none w-full"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className={`btn bg-green-500 border-none hover:bg-green-400 text-black px-8 ${
                      saving ? "loading" : ""
                    }`}
                    disabled={saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
