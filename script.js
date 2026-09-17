// 테마 토글
// 첫 렌더 전 테마 결정은 index.html <head>의 인라인 스크립트가 맡고,
// 여기서는 버튼 동작과 시스템 설정 변화 감지를 처리한다.
(() => {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const toggle = document.querySelector(".theme-toggle");

  const readSaved = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };

  const apply = (theme) => {
    root.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  };

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  });

  // 직접 고른 테마가 없으면 시스템 설정 변화를 그대로 따라간다
  media.addEventListener("change", (e) => {
    if (!readSaved()) apply(e.matches ? "dark" : "light");
  });

  apply(root.dataset.theme || (media.matches ? "dark" : "light"));
})();
