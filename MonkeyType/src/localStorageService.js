const KEY = "monkeytype_history_v1";

export function saveResult(result) {
  const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
  prev.unshift({ ...result, date: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(prev.slice(0, 200)));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
