const THEME_KEY = "recipe-ai-theme";
const LANG_KEY = "recipe-ai-lang";

const translations = {
  en: {
    eyebrow: "Recipe AI",
    title: "Cook smarter with AI",
    theme: "Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    heroLead: "Generate recipes, remix leftovers, and plan your week in seconds.",
    startCooking: "Start cooking",
    browseRecipes: "Browse recipes",
    feature1Title: "Pantry → Plate",
    feature1Desc: "Type what you have. We craft meals around it.",
    feature2Title: "Smart Nutrition",
    feature2Desc: "Adjust macros and servings instantly.",
    feature3Title: "Weekly Plan",
    feature3Desc: "Auto-build a calendar and shopping list.",
  },
  ko: {
    eyebrow: "레시피 AI",
    title: "AI와 함께 더 똑똑하게 요리하세요",
    theme: "테마",
    system: "시스템",
    light: "라이트",
    dark: "다크",
    heroLead: "몇 초 만에 레시피를 생성하고, 남은 음식을 활용하며, 일주일 식단을 계획하세요.",
    startCooking: "요리 시작하기",
    browseRecipes: "레시피 찾아보기",
    feature1Title: "팬트리 → 접시",
    feature1Desc: "가지고 있는 재료를 입력하면 맞춤 식단을 제안해 드립니다.",
    feature2Title: "스마트 영양 관리",
    feature2Desc: "영양소와 분량을 즉시 조정하세요.",
    feature3Title: "주간 계획",
    feature3Desc: "캘린더와 쇼핑 리스트를 자동으로 생성합니다.",
  },
  ja: {
    eyebrow: "レシピ AI",
    title: "AIでもっと賢く料理しよう",
    theme: "テーマ",
    system: "システム",
    light: "ライト",
    dark: "ダーク",
    heroLead: "数秒でレシピを生成し、残り物をアレンジし、1週間の計画を立てましょう。",
    startCooking: "料理を始める",
    browseRecipes: "レシピを見る",
    feature1Title: "パントリー → プレート",
    feature1Desc: "持っているものを入力するだけ。それに合わせた料理を提案します。",
    feature2Title: "スマート栄養管理",
    feature2Desc: "マクロ栄養素と分量を瞬時に調整。",
    feature3Title: "週間プラン",
    feature3Desc: "カレンダーとショッピングリストを自動作成。",
  }
};

const themeToggle = document.querySelector("#theme-toggle");
const themeState = document.querySelector("[data-theme-state]");
const langToggle = document.querySelector("#lang-toggle");
const langState = document.querySelector("[data-lang-state]");

const applyTheme = (theme) => {
  if (theme === "system") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", theme);
  }

  if (themeState) {
    const currentLang = getPreferredLang();
    const themeName = theme === "system" ? translations[currentLang].system : translations[currentLang][theme];
    themeState.textContent = themeName;
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

const applyLang = (lang) => {
  document.documentElement.lang = lang;
  const t = translations[lang];

  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  if (langState) {
    const langNames = { en: "English", ko: "한국어", ja: "日本語" };
    langState.textContent = langNames[lang];
  }

  // Update theme text as well
  applyTheme(getPreferredTheme());
};

const getPreferredLang = () => {
  const stored = localStorage.getItem(LANG_KEY);
  if (translations[stored]) return stored;
  
  const browserLang = navigator.language.split("-")[0];
  if (translations[browserLang]) return browserLang;

  return "en";
};

const cycleLang = (current) => {
  const langs = Object.keys(translations);
  const index = langs.indexOf(current);
  return langs[(index + 1) % langs.length];
};

const init = () => {
  let currentTheme = getPreferredTheme();
  let currentLang = getPreferredLang();

  applyLang(currentLang);
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentTheme = cycleTheme(currentTheme);
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  }

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = cycleLang(currentLang);
      localStorage.setItem(LANG_KEY, currentLang);
      applyLang(currentLang);
    });
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    if (getPreferredTheme() === "system") {
      applyTheme("system");
    }
  });
};

init();
