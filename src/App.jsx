import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MobileLayout from "./pages/MobileLayout";
import DesktopLayout from "./components/jsx/DesktopLayout";


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Router>
  );
}

export default App;