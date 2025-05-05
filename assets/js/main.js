let originalText = ""; // contient le texte d’origine chargé
let tokens = []; // liste des tokens
let lignes = []; // lignes du texte
let lignes_non_vides = []; // lignes sans espace vide

// Affiche ou cache la section "about me"
function showHide_aboutme() {
  const aboutme = document.getElementById("aboutme");
  const btn = document.getElementById("button_aboutme");
  if (aboutme.style.display === "none" || aboutme.style.display === "") {
    aboutme.style.display = "block"; // si c'est caché, on affiche
    btn.innerText = "Cacher"; // texte du bouton
  } else {
    aboutme.style.display = "none"; // sinon on cache
    btn.innerText = "Afficher"; // texte du bouton
  }
}

// Affiche ou cache le mode d'emploi
function showHide_aide() {
  const aide = document.getElementById("aide");
  if (aide.style.display === "none" || aide.style.display === "") {
    aide.style.display = "block"; // on affiche si c'était caché
  } else {
    aide.style.display = "none"; // sinon on cache
  }
}

// Affiche la date et l'heure actuelles
function datxxx() {
  const now = new Date(); // crée un objet Date avec l'heure actuelle
  const dateString = now.toLocaleString(); // format lisible
  document.getElementById("btn1").style.display = "none"; // cache le bouton initial
  document.getElementById("xxx").style.display = "block"; // affiche l'autre bouton (facultatif)
  document.getElementById("xxx").innerText = dateString; // insère la date dans la balise <p>
}

// Fonction appelée au chargement d’un fichier texte
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0]; // on récupère le fichier sélectionné
  if (!file) return;

  const reader = new FileReader(); // lecteur de fichier

  reader.onload = function(e) {
    const contents = e.target.result;
    document.getElementById('fileDisplayArea').textContent = contents; // affiche le texte brut
    originalText = contents; // sauvegarde le texte original dans une variable globale
    tokens = originalText.split(/\s+/); // découpe le texte en mots/tokens
    lignes = originalText.split(/\n/); // découpe le texte en lignes
    lignes_non_vides = lignes.filter(l => l.trim().length > 0); // enlève les lignes vides
    document.getElementById('logger1').textContent = "Nombre de tokens : " + tokens.length;
    document.getElementById('logger2').textContent = "Nombre de lignes non vides : " + lignes_non_vides.length;
  };

  reader.readAsText(file); // lit le fichier comme texte
});

// Segmentation des tokens selon les délimiteurs choisis
function segText() {
  const delim = document.getElementById("delimID").value;
  const reg = new RegExp("[" + delim + "]+"); // expression régulière pour les délimiteurs
  tokens = originalText.split(reg).filter(t => t.length > 0); // coupe le texte, enlève les vides
  lignes = originalText.split("\n"); // recoupe en lignes
  lignes_non_vides = lignes.filter(l => l.trim().length > 0);
  document.getElementById("logger1").textContent = "Nombre de tokens : " + tokens.length;
  document.getElementById("logger2").textContent = "Nombre de lignes non vides : " + lignes_non_vides.length;
}

// Affiche un dictionnaire de formes triées par fréquence
function dictionnaire() {
  const dico = {};
  for (let t of tokens) {
    if (dico[t]) dico[t] += 1;
    else dico[t] = 1;
  }
  const entries = Object.entries(dico).sort((a, b) => b[1] - a[1]); // tri décroissant
  let html = "<table border='1'><tr><th>Forme</th><th>Fréquence</th></tr>";
  for (let [mot, freq] of entries) {
    html += `<tr><td>${mot}</td><td>${freq}</td></tr>`;
  }
  html += "</table>";
  document.getElementById("logger3").innerHTML = html;
}

// Fonction de recherche GREP : affiche les lignes contenant le "pôle"
function grep() {
  const pole = document.getElementById("poleID").value;
  const reg = new RegExp(pole, "i"); // insensible à la casse
  let html = "<table border='1'><tr><th>Num ligne</th><th>Contenu</th></tr>";
  for (let i = 0; i < lignes_non_vides.length; i++) {
    if (reg.test(lignes_non_vides[i])) {
      html += `<tr><td>${i + 1}</td><td>${lignes_non_vides[i]}</td></tr>`;
    }
  }
  html += "</table>";
  document.getElementById("logger3").innerHTML = html;
}

// Fonction pour remplacer toutes les voyelles par une étoile
function remplacerVoyelles() {
  const modif = originalText.replace(/[aeiouyàâäéèêëîïôöùûü]/gi, "*"); // remplace toutes les voyelles
  document.getElementById("page-analysis").innerText = modif; // affiche le résultat
}

// Affiche une concordance autour du mot (ou regex) entré
function concord() {
  const pole = document.getElementById("poleID").value;
  const lg = parseInt(document.getElementById("lgID").value);
  const reg = new RegExp(pole, "i");
  let html = "<table border='1'><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>";
  for (let ligne of lignes_non_vides) {
    const mots = ligne.split(/\s+/);
    for (let i = 0; i < mots.length; i++) {
      if (reg.test(mots[i])) {
        const gauche = mots.slice(Math.max(0, i - lg), i).join(" ");
        const droit = mots.slice(i + 1, i + 1 + lg).join(" ");
        html += `<tr><td>${gauche}</td><td>${mots[i]}</td><td>${droit}</td></tr>`;
      }
    }
  }
  html += "</table>";
  document.getElementById("logger3").innerHTML = html;
}

// Fonction qui ajoute 'uj' à chaque mot (version /kujuj/)
function kujuj() {
  const modif = tokens.map(t => t + "uj").join(" ");
  document.getElementById("page-analysis").innerText = modif;
}

// Compte le nombre de phrases dans le texte (en utilisant les points)
function nbPhrases() {
  const phrases = originalText.split(/[.!?]+/).filter(p => p.trim().length > 0); // coupe aux fins de phrases
  document.getElementById("logger3").innerText = "Nombre de phrases : " + phrases.length;
}

// Affiche les 10 mots les plus longs du texte
function tokenLong() {
  const uniques = [...new Set(tokens)];
  const longs = uniques.sort((a, b) => b.length - a.length).slice(0, 10);
  let html = "<ul>";
  for (let mot of longs) {
    html += `<li>${mot} (${mot.length} lettres)</li>`;
  }
  html += "</ul>";
  document.getElementById("logger3").innerHTML = html;
}

// Création d’un graphique en camembert (Pie Chart) avec les mots les plus fréquents hors stopwords
function pieChart() {
  const stopwords = document.getElementById("stopwordID").value.split(",");
  const dico = {};
  for (let t of tokens) {
    const tmin = t.toLowerCase();
    if (stopwords.includes(tmin) || tmin.length < 2) continue;
    dico[tmin] = (dico[tmin] || 0) + 1;
  }
  const entries = Object.entries(dico).sort((a, b) => b[1] - a[1]).slice(0, 30);
  const dataPoints = entries.map(([label, y]) => ({ label, y }));

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: { text: "30 mots les plus fréquents hors stopwords" },
    data: [{
      type: "pie",
      startAngle: 240,
      yValueFormatString: "##0",
      indexLabel: "{label} ({y})",
      dataPoints: dataPoints
    }]
  });
  chart.render();
}
