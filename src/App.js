import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/ProductsPage/Home";
import AddProduct from './components/AddProduct/AddProduct';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add-product" element={<AddProduct />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
