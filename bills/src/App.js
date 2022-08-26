import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/Credits";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Bills />} />
          <Route path="/credits" element={<Credits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
