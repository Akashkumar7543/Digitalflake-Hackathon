import { useState } from "react";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../context/CategoryContext";
import toast from "react-hot-toast";

export default function AddCategory() {
  const navigate = useNavigate();
  const { addCategory } = useCategories(); 

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSave = async () => {
    setError("");

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("status", "Active");
      formData.append("image", image); 

      await addCategory(formData); 
      toast.success("Category added successfully.");

      navigate("/dashboard/category");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[680px] flex flex-col justify-between">


        <div>
          <div className="flex items-center gap-3 mb-6">
            <ArrowLeft
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-[20px] font-semibold">Add Category</h2>
          </div>


          <div className="flex gap-10 flex-wrap">

     
            <div className="w-[320px]">
              <label className="block text-sm text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full h-[42px] border rounded-md px-3 text-sm focus:outline-none"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Image Preview
              </label>
              <div className="w-[120px] h-[120px] border rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
            </div>


            <div className="flex items-end">
              <label className="w-[140px] h-[120px] border-2 border-dashed rounded-md
                flex flex-col items-center justify-center text-center
                text-gray-500 text-xs cursor-pointer hover:bg-gray-50">

                <ImageIcon size={28} className="mb-2" />
                <p>Upload</p>
                <p>Max size 10MB</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-2 border rounded-full text-gray-600 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-2 bg-[#662671] text-white rounded-full
              hover:bg-[#541f5a] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}
