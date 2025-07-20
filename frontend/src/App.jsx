import Homepage from "./pages/Homepage";

import NavbarCompo from "./components/NavbarCompo";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
      {/* <Recommendation /> */}
    </div>
  );
}

export default App;
