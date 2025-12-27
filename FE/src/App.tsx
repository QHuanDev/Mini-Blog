import { Toaster } from "react-hot-toast";
import AppRouter from "./routes";
import Snowfall from "react-snowfall";
function App() {
  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
