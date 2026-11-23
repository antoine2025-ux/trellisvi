export const APPLY_ID = "apply";

export function scrollToApply() {
  document.getElementById(APPLY_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
