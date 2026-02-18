const THEME_KEY = "recipe-ai-theme";
const themeToggle = document.querySelector("#theme-toggle");
const themeState = document.querySelector("[data-theme-state]");

const applyTheme = (theme) => {
  if (theme === "system") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", theme);
  }

  if (themeState) {
    themeState.textContent = theme === "system" ? "System" : theme[0].toUpperCase() + theme.slice(1);
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark");
  }
};

const getPreferredTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
};

const cycleTheme = (current) => {
  if (current === "system") return "light";
  if (current === "light") return "dark";
  return "system";
};

const initTheme = () => {
  let current = getPreferredTheme();
  applyTheme(current);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      current = cycleTheme(current);
      localStorage.setItem(THEME_KEY, current);
      applyTheme(current);
    });
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    if (getPreferredTheme() === "system") {
      applyTheme("system");
    }
  });
};

initTheme();
