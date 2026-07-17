import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Review } from "./Review";
import { Presenter } from "./Presenter";
import "./styles/global.css";
import "./styles/slides.css";
import "./styles/presenter.css";

const route = window.location.hash.replace(/[#/]/g, "");
const isReview = route === "review";
const isNotes = route === "notes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isReview ? <Review /> : isNotes ? <Presenter /> : <App />}
  </StrictMode>
);

// reload when toggling between deck / review / presenter so the mode is clean
window.addEventListener("hashchange", () => window.location.reload());
