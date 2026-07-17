import { useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Reservations } from "./pages/Reservations";

function App() {
  const [activePage, setActivePage] = useState<string>("home");

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === "home" && <Home setActivePage={setActivePage} />}
      {activePage === "menu" && <Menu />}
      {activePage === "reservations" && <Reservations />}
    </Layout>
  );
}

export default App;
