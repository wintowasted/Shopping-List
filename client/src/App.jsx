import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import ListDetail from "./pages/ListDetail";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";
import Products from "./pages/Products";


function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Layout />}>

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Navigate to={"/lists"} />} />
              <Route path="lists" element={<Home />} />
              <Route path="lists/:id" element={<ListDetail />}></Route>
              <Route path="products" element={<Products/>}></Route>
            </Route>
          {/* 404 Not Found pages */}
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
