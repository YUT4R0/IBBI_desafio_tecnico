import { UsersPage } from "./components/UsersPage";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  if (pathname !== "/users") return <Navigate to={"/users"} replace />;

  return (
    <>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#282828",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
