import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// theme + accent bootstrap — runs once on app load (before first paint)
(() => {
  const theme = localStorage.getItem("theme") || "system";
  const accent = localStorage.getItem("accent") || "#059669"; // apna ACCENT_COLORS[0] hex

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.setAttribute("data-theme", isDark ? "dark" : "light");

  root.style.setProperty("--accent", accent);
  root.style.setProperty("--nav-active", `color-mix(in srgb, ${accent} 38%, #0f1729)`);
  root.style.setProperty("--nav-strip", accent);
})();

createRoot(document.getElementById('root')).render(
  <App />
)