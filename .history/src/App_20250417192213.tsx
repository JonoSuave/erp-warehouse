import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MainLayout from "./components/layout/MainLayout";
import routes from "tempo-routes";

// Import the ScanningPage component
import ScanningPage from "./components/warehouse/ScanningPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Warehouse routes */}
          <Route path="/warehouse" element={<MainLayout />}>
            <Route path="scanning" element={<ScanningPage />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
