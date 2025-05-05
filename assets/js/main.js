// Fonction pour afficher la date et l'heure
function afficherDateHeure() {
  const maintenant = new Date(); // On crée un objet Date pour avoir la date et l'heure actuelles
  const dateHeure = maintenant.toLocaleString(); // Format lisible
  document.getElementById("resultat").innerHTML = dateHeure; // On affiche dans la div résultat
}

// Fonction pour mettre en majuscules le texte
function mettreEnMajuscules() {
  const texte = document.getElementById("texte").value;
  const texteMajuscules = texte.toUpperCase(); // Convertit en majuscules
  document.getElementById("texte").value = texteMajuscules;
}

// Fonction pour charger un fichier texte
function chargerFichier(event) {
  const fichier = event.target.files[0]; // On récupère le premier fichier sélectionné
  const lecteur = new FileReader(); // Permet de lire le fichier
  lecteur.onload = function(e) {
    const contenu = e.target.result;
    document.getElementById("texte").value = contenu; // On met le contenu dans la zone de texte
  };
  lecteur.readAsText(fichier); // On lit le fichier comme texte
}

// Fonction pour segmenter le texte en tokens (mots) et en lignes
function segmenterTexte() {
  const texte = document.getElementById("texte").value;
  const tokens = texte.match(/\b\w+\b/g) || []; // On isole les mots (tokens)
  const lignes = texte.split("\n"); // On coupe le texte en lignes
  const lignesNonVides = lignes.filter(ligne => ligne.trim() !== ""); // On garde seulement les lignes non vides
  const resultat = `Nombre de tokens : ${tokens.length}<br>Nombre de lignes non vides : ${lignesNonVides.length}`;
  document.getElementById("resultat").innerHTML = resultat;
}

// Fonction pour créer un dictionnaire des formes par fréquence
function dictionnaireFormes() {
  const texte = document.getElementById("texte").value;
  const mots = texte.toLowerCase().match(/\b\w+\b/g) || [];
  const frequence = {};
  mots.forEach(mot => {
    frequence[mot] = (frequence[mot] || 0) + 1; // On compte chaque mot
  });

  // On transforme en tableau pour trier
  const entrees = Object.entries(frequence);
  entrees.sort((a, b) => b[1] - a[1]); // Tri décroissant par fréquence

  let resultat = "<ul>";
  entrees.forEach(([mot, freq]) => {
    resultat += `<li>${mot} : ${freq}</li>`;
  });
  resultat += "</ul>";

  document.getElementById("resultat").innerHTML = resultat;
}

// Fonction pour faire une recherche (type GREP)
function rechercheGREP() {
  const motif = document.getElementById("motif").value;
  const texte = document.getElementById("texte").value;
  const lignes = texte.split("\n");

  const resultat = lignes
    .filter(ligne => ligne.includes(motif))
    .map(ligne => ligne.replaceAll(motif, `<mark>${motif}</mark>`)) // Surlignage
    .join("<br>");

  document.getElementById("resultat").innerHTML = resultat || "Aucun résultat trouvé.";
}

// Fonction pour générer un concordancier
function genererConcordancier() {
  const texte = document.getElementById("texte").value;
  const mot = document.getElementById("motif").value.toLowerCase();
  const lignes = texte.split("\n");
  let resultat = "";

  lignes.forEach(ligne => {
    const mots = ligne.split(/\s+/);
    mots.forEach((m, index) => {
      if (m.toLowerCase().includes(mot)) {
        // On construit le contexte gauche et droit
        const contexteGauche = mots.slice(Math.max(0, index - 5), index).join(" ");
        const contexteDroit = mots.slice(index + 1, index + 6).join(" ");
        resultat += `${contexteGauche} <strong>${m}</strong> ${contexteDroit}<br>`;
      }
    });
  });

  document.getElementById("resultat").innerHTML = resultat || "Aucune occurrence trouvée.";
}

// Fonction pour remplacer toutes les voyelles par *
function remplacerVoyelles() {
  const texte = document.getElementById("texte").value;
  const texteModifie = texte.replace(/[aeiouyàâäéèêëîïôöùûüÿ]/gi, "*");
  document.getElementById("texte").value = texteModifie;
}

// Fonction pour compter le nombre de phrases
function compterPhrases() {
  const texte = document.getElementById("texte").value;
  const phrases = texte.match(/[^.!?]+[.!?]/g); // On isole les phrases avec ponctuation
  const nbPhrases = phrases ? phrases.length : 0;
  document.getElementById("resultat").innerHTML = `Nombre de phrases : ${nbPhrases}`;
}

// Fonction pour trouver les mots les plus longs
function motsPlusLongs() {
  const texte = document.getElementById("texte").value;
  const mots = texte.match(/\b\w+\b/g) || [];

  mots.sort((a, b) => b.length - a.length); // Tri des mots par longueur décroissante
  const top10 = mots.slice(0, 10); // On prend les 10 plus longs

  document.getElementById("resultat").innerHTML = "<h3>Mots les plus longs :</h3><ul>" +
    top10.map(m => `<li>${m}</li>`).join('') +
    "</ul>";
}

// Fonction pour afficher un graphe camembert des mots fréquents
function grapheCamembert() {
  const texte = document.getElementById("texte").value;
  const mots = texte.toLowerCase().match(/\b\w+\b/g) || [];

  const freq = {};
  mots.forEach(m => {
    freq[m] = (freq[m] || 0) + 1;
  });

  const top5 = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const labels = top5.map(([mot]) => mot);
  const data = top5.map(([, f]) => f);

  const resultat = document.getElementById("resultat");
  resultat.innerHTML = '<canvas id="camembert" width="400" height="400"></canvas>';

  const ctx = document.getElementById("camembert").getContext("2d");
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['red', 'blue', 'green', 'orange', 'purple']
      }]
    }
  });
}

// FONCTION SPÉCIALE demandée (ajoutée à la fin)
function fonctionSpeciale() {
  const texte = document.getElementById("texte").value;

  // Exemple : afficher uniquement les mots palindromes (ex. : "radar", "été")
  const mots = texte.toLowerCase().match(/\b\w+\b/g) || [];
  const palindromes = mots.filter(mot => mot === mot.split('').reverse().join(''));
  
  document.getElementById("resultat").innerHTML = "<h3>Palindromes trouvés :</h3><ul>" +
    palindromes.map(m => `<li>${m}</li>`).join('') +
    "</ul>";
}
