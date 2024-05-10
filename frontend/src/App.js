import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
