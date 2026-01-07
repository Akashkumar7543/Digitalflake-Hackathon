import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, ChevronDown, Image as ImageIcon, Box } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext"; 

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, updateProduct } = useProducts(); 

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("Active");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const product = await getProductById(id); 

        setName(product.name || "");
        setCategory(product.category?.name || "");
        setSubCategory(product.subCategory?.name || "");
        setStatus(product.status || "Active");
        setPreview(product.image?.url || null);
      } catch (err) {
        console.error("FETCH PRODUCT ERROR:", err);
        toast.error("Failed to load product");
        navigate("/dashboard/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, getProductById]); 

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleSave = async () => {
    if (!name.trim()) return toast.error("Product name required");

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      if (image) formData.append("image", image);

      await updateProduct(id, formData); 
      toast.success("Product Edited successfully");
      navigate("/dashboard/products");
      window.location.href = "/dashboard/subcategory";

    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg p-6 min-h-[700px] flex flex-col justify-between">

        <div>
          <div className="flex items-center gap-3 mb-8">
            <ArrowLeft
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <Box size={20} />
            <h2 className="text-[20px] font-semibold">Edit Product</h2>
          </div>

          <div className="flex gap-8 flex-wrap mb-10">

            <div className="w-[300px]">
              <label className="block text-sm mb-2">Product Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[40px] border rounded-md px-3 text-sm"
              />
            </div>

            <div className="w-[260px]">
              <label className="block text-sm mb-2">Subcategory</label>
              <input
                value={subCategory}
                disabled
                className="w-full h-[40px] border rounded-md px-3 text-sm bg-gray-50"
              />
            </div>

            <div className="w-[260px]">
              <label className="block text-sm mb-2">Category</label>
              <input
                value={category}
                disabled
                className="w-full h-[40px] border rounded-md px-3 text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="flex gap-8 items-end">

            <div className="relative w-[260px]">
              <label className="block text-sm mb-2">Status</label>
              <button
                type="button"
                onClick={() => setShowStatus(!showStatus)}
                className="w-full h-[40px] border rounded-md px-3 text-sm flex justify-between items-center bg-white"
              >
                {status}
                <ChevronDown size={18} />
              </button>

              {showStatus && (
                <div className="absolute w-full bg-white border rounded-md shadow mb-17">
                {["Active", "Inactive"].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setStatus(item);
                      setShowStatus(false);
                    }}
                    className={`px-3 py-2 cursor-pointer flex justify-between ${
                      status === item
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item}
                    {status === item && <span>✓</span>}
                  </div>
                ))}
              </div>
              )}
            </div>

   
            <div>
              <label className="block text-sm mb-2">Image</label>
              <div className="w-[120px] h-[120px] border rounded-md flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </div>
            </div>

            <label className="w-[140px] h-[120px] border-2 border-dashed rounded-md flex flex-col items-center justify-center text-xs cursor-pointer">
              <ImageIcon size={26} />
              Upload
              <p>Max size 10MB</p>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

          </div>
        </div>

    
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-2 border rounded-full"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-10 py-2 bg-[#662671] text-white rounded-full hover:bg-[#541f5a]"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}