import { useState } from "react";
import { Search, Plus, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/ProductTable";
import { useProducts } from "../../context/ProductContext"; // ✅ Import context

export default function Products() {
  const navigate = useNavigate();
  const { products, loading } = useProducts(); // ✅ Use context
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state

  // ✅ Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-[680px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Box size={22} />
          <h2 className="text-[22px] font-medium">Product</h2>
          <div className="relative ml-6">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[36px] w-[520px] pl-9 pr-3 border rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/products/add")}
          className="flex items-center gap-2 bg-[#662671] text-white px-4 h-[36px]
          rounded-md text-sm hover:bg-[#541f5a]"
        >
          <Plus size={16} />
          Add New
        </button>
      </div>
      <ProductTable 
        products={filteredProducts} 
        loading={loading}
      />
    </div>
  );
}