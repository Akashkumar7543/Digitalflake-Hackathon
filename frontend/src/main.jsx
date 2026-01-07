import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* ===== CONTEXT PROVIDERS ===== */

import { CategoryProvider } from "./context/CategoryContext";
import { SubCategoryProvider } from "./context/SubCategoryContext";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <CategoryProvider>
      <SubCategoryProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </SubCategoryProvider>
    </CategoryProvider>

);
