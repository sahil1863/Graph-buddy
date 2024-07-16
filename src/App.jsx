import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
import { GraphProvider } from "./contexts/GraphProvider";

const App = () => {
  return (
    <div className="canvas min-h-screen">
      <GraphProvider>
      <Home />
      {/* <h1>hello</h1> */}
      </GraphProvider>
      <Toaster />
    </div>
  );
};

export default App;
