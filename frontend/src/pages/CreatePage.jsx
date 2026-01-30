import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create notes");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#1b1717] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <Link
            to={"/"}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-6"
          >
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>

          <div className="card bg-black/50 backdrop-blur border border-green-400/30 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold text-green-400 mb-6">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="form-control flex flex-col gap-2">
                  <label className="label p-0">
                    <span className="label-text text-gray-300">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered bg-black border-green-400/40 text-white focus:border-green-400 focus:outline-none w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className={`btn btn-primary bg-green-500 border-none hover:bg-green-400 text-black px-8 ${loading ? "loading" : ""
                      }`}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
