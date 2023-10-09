import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";

function App() {
  let contentRoutes = useRoutes(appRoutes)

  return (
    <div className="App">
      {contentRoutes}
    </div>
  );
}

export default App;
