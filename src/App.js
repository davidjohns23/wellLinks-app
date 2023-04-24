import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import StateList from "./pages/StatesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/states" element={<StateList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



