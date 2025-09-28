import React from "react";
import Dashboard from "./components/Dashboard";

export default function App({ initialKpis }) {
  return <Dashboard initialKpis={initialKpis} />;
}
