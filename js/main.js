// Varnen dostop do localStorage
function safeGetLocalStorage(key) {
  try {
    if (!("localStorage" in window)) return null;
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetLocalStorage(key, value) {
  try {
    if (!("localStorage" in window)) return;
    window.localStorage.setItem(key, value);
  } catch (e) {}
}

// Letnica v nogi
document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  renderMase();
  renderObvestila();
  initSimpleCookieBanner();
  initSpecialBanner();
});

// MAŠE
function renderMase() {
  if (!window.MASE) return;

  const data = window.MASE;
  const tbody = document.getElementById("mase-body");
  const periodEl = document.getElementById("mase-period");
  if (!tbody || !periodEl) return;

  tbody.innerHTML = "";
  periodEl.textContent = data.period || "";

  function addGroupRow(title, isSunday) {
    const tr = document.createElement("tr");
    tr.className = "group-row" + (isSunday ? " sunday" : "");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = title;
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  function addMassRow(date, label, mass) {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = date || "";

    const tdParish = document.createElement("td");
    tdParish.textContent = label || mass.parish || "";

    const tdTime = document.createElement("td");
    tdTime.textContent = mass.time || "";

    const tdNote = document.createElement("td");
    tdNote.textContent = mass.note || "";

    tr.appendChild(tdDate);
    tr.appendChild(tdParish);
    tr.appendChild(tdTime);
    tr.appendChild(tdNote);
    tbody.appendChild(tr);
  }

  // Nedelja na začetku
  if (data.sundayStart && data.sundayStart.masses) {
    const s = data.sundayStart;
    addGroupRow(`Nedelja ${s.date} – ${s.label || ""}`, true);
    s.masses.forEach(m => addMassRow(s.date, m.parish, m));
  }

  // Maše med tednom
  (data.weekdays || []).forEach(d => {
    if (!d.masses || !d.masses.length) return;
    const title = `${d.day || ""} ${d.date || ""}${d.saint ? " – " + d.saint : ""}`;
    addGroupRow(title, false);
    d.masses.forEach(m => addMassRow(d.date, m.parish, m));
  });

  // Nedelja na koncu
  if (data.sundayEnd && data.sundayEnd.masses) {
    const s = data.sundayEnd;
    addGroupRow(`Nedelja ${s.date} – ${s.label || ""}`, true);
    s.masses.forEach(m => addMassRow(s.date, m.parish, m));
  }

  // Oznanila te nedelje
  const cont = document.getElementById("weekly-notices");
  if (!cont) return;

  cont.innerHTML = "";
  const notes = data.notices || [];
  if (!notes.length) {
    cont.innerHTML = "<p class='note'>Za to nedeljo ni posebnih oznanil.</p>";
  } else {
    const h = document.createElement("h3");
    h.textContent = "Oznanila te nedelje";
    const ul = document.createElement("ul");
    notes.forEach(txt => {
      const li = document.createElement("li");
      li.textContent = txt;
      ul.appendChild(li);
    });
    cont.appendChild(h);
    cont.appendChild(ul);
  }
}

// OBVESTILA
function renderObvestila() {
  if (!window.OBVESTILA) return;
  const list = document.getElementById("obvestila-list");
  if (!list) return;

  list.innerHTML = "";

  window.OBVESTILA.forEach(obv => {
    const article = document.createElement("article");
    article.className = "announcement";

    const header = document.createElement("div");
    header.className = "announcement-header";

    const spanLeft = document.createElement("span");
    spanLeft.textContent = obv.tag || "";

    const spanRight = document.createElement("span");
    spanRight.textContent = obv.date || "";

    header.appendChild(spanLeft);
    header.appendChild(spanRight);

    const title = document.createElement("div");
    title.className = "announcement-title";
    title.textContent = obv.title || "";

    const p = document.createElement("p");
    p.textContent = obv.text || "";

    article.appendChild(header);
    article.appendChild(title);
    article.appendChild(p);

    if (obv.pdf) {
      const link = document.createElement("a");
      link.className = "announcement-pdf";
      link.href = obv.pdf;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Odpri oznanila (PDF)";
      article.appendChild(link);
    }

    list.appendChild(article);
  });
}

// PIŠKOTKI
function initSimpleCookieBanner() {
  var banner = document.getElementById("cookie-banner");
  var btn = document.getElementById("cookie-ok");
  var KEY = "vv-cookie-info";

  if (!banner || !btn) return;

  if (safeGetLocalStorage(KEY) === "ok") {
    banner.style.display = "none";
    return;
  }

  banner.style.display = "block";

  btn.addEventListener("click", function () {
    safeSetLocalStorage(KEY, "ok");
    banner.style.display = "none";
  });
}

// POSEBNO OBVESTILO
function initSpecialBanner() {
  const data = window.SPECIAL_NOTICE;
  const el = document.getElementById("special-banner");
  const msgEl = document.getElementById("special-banner-message");

  if (!el || !msgEl || !data || !data.text) return;

  let text = data.text || "";
  if (data.linkHref && data.linkText) {
    text += " ";
    text += '<a href="' + data.linkHref +
            '" target="_blank" rel="noopener">' +
            data.linkText + "</a>";
  }

  msgEl.innerHTML = text;
  el.style.display = "block";
}
