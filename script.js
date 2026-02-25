// Franc'Essence — small JS helpers (no tracking)
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Copy message helper (contact page only)
const copyBtn = document.getElementById("copyBtn");
if (copyBtn){
  copyBtn.addEventListener("click", async () => {
    const form = document.querySelector(".form");
    const name = form.querySelector('input[type="text"]').value || "";
    const email = form.querySelector('input[type="email"]').value || "";
    const msg = form.querySelector("textarea").value || "";
    const blob = `${name}\n${email}\n\n${msg}`.trim();

    const hint = document.getElementById("copyHint");
    try{
      await navigator.clipboard.writeText(blob);
      hint.textContent = "Copié ! Collez-le dans un email et envoyez.";
    }catch(e){
      hint.textContent = "Impossible de copier automatiquement. Sélectionnez puis copiez manuellement.";
    }
  });
}

// Static search (recherche.html)
const q = document.getElementById("q");
const results = document.getElementById("results");

const pages = [
  { title: "Accueil", url: "index.html", text: "Franc'Essence FLE pédagogie didactique collège lycée bac université ressources exercices méthodologie" },
  { title: "Parcours", url: "parcours.html", text: "FLE A1 A2 B1 bac argumentation compte rendu production écrite université synthèse dissertation exposé" },
  { title: "Ressources", url: "ressources.html", text: "grammaire conjugaison lexique oral subordination concession cause conséquence connecteurs" },
  { title: "Exercices", url: "exercices.html", text: "exercices FLE bac université corrigés QCM production écrite méthodologie" },
  { title: "Méthodologie", url: "methodologie.html", text: "discours argumentatif thèse argument exemple plan dialectique analytique canevas compte rendu synthèse dissertation" },
  { title: "À propos", url: "apropos.html", text: "mission public comment utiliser" },
  { title: "Contact", url: "contact.html", text: "email message" }
];

function renderResults(items){
  if (!results) return;
  if (!items.length){
    results.innerHTML = "Aucun résultat.";
    return;
  }
  results.innerHTML = items.map(i => `<div class="result"><a class="link" href="${i.url}">${i.title}</a><div class="muted small">${i.snippet}</div></div>`).join("");
}

if (q && results){
  q.addEventListener("input", () => {
    const term = q.value.trim().toLowerCase();
    if (!term){
      results.textContent = "Aucun résultat pour l’instant.";
      return;
    }
    const items = pages
      .map(p => {
        const idx = p.text.toLowerCase().indexOf(term);
        if (idx === -1) return null;
        const start = max(0, idx - 30);
        const end = min(p.text.length, idx + term.length + 30);
        return { title: p.title, url: p.url, snippet: "…" + p.text.slice(start, end) + "…" };
      })
      .filter(Boolean);
    renderResults(items);
  });

  // polyfills for min/max
  function max(a,b){ return a>b?a:b; }
  function min(a,b){ return a<b?a:b; }
}
