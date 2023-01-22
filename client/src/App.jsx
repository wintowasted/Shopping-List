import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import ListDetail from "./pages/ListDetail";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import PersistLogin from "./components/PersistLogin";


function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Layout />}>

            {/* Protected routes */}
          <Route element={<PersistLogin/>}>
            <Route element={<RequireAuth allowedRoles={["User", "Admin"]}/>}>
              <Route path="/" element={<Navigate to={"/lists"} />} />
              <Route path="lists" element={<Home />} />
              <Route path="lists/:id" element={<ListDetail />}></Route>
             
            </Route>
            <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
              <Route path="products" element={<Products/>}></Route>
            </Route>
       
          </Route>
        </Route>
        {/* 404 Not Found pages */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
