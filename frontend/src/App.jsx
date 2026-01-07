import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard";
import Home from "./pages/Home";
import Category from "./pages/Category/Category";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import SubCategory from "./pages/SubCategory/Subcategory";
import AddSubCategory from "./pages/SubCategory/AddSubCategory";
import EditSubCategory from "./pages/SubCategory/EditSubCategory";
import Products from "./pages/Product/Products";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";

/* 🔥 SEPARATE ROUTES COMPONENT */
function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PROTECTED DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* HOME */}
        <Route index element={<Home />} />

        {/* CATEGORY */}
        <Route path="category" element={<Category />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/edit/:id" element={<EditCategory />} />

        {/* SUBCATEGORY */}
        <Route path="subcategory" element={<SubCategory />} />
        <Route path="subcategory/add" element={<AddSubCategory />} />
        <Route path="subcategory/edit/:id" element={<EditSubCategory />} />

        {/* PRODUCTS */}
        <Route path="products" element={<Products />} />

        {/* 🔥 FORCE REMOUNT HERE */}
        <Route
          path="products/add"
          element={<AddProduct key={location.pathname} />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct key={location.pathname} />}
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

