import { UsersPage } from "./components/UsersPage";
import "./index.css";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <UsersPage />
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
