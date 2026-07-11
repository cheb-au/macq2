import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Review } from "./Review";
import "./styles/global.css";
import "./styles/slides.css";

const isReview = window.location.hash.replace(/[#/]/g, "") === "review";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isReview ? <Review /> : <App />}</StrictMode>
);

// reload when toggling between deck and review so the mode switch is clean
window.addEventListener("hashchange", () => window.location.reload());
