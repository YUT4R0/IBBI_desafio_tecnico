import { UsersPage } from "./components/UsersPage";
import "./index.css";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  if (pathname !== "/users") return <Navigate to={"/users"} replace />;

  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
    </Routes>
  );
}

export default App;
