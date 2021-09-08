import React from "react";
import { AuthProvider } from "./providers/AuthProvider";
import "./App.css";
import { Header } from "./component/Header";
import "./servise/firebase";
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
