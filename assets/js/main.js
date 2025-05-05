// Fonction 1 : afficher la date et l’heure actuelles
function afficherDateHeure() {
  const maintenant = new Date(); // On crée un objet Date qui contient la date et l’heure actuelles
  const dateHeure = maintenant.toLocaleString(); // On convertit cette date/heure en texte lisible (format local)
  // On affiche ce texte dans la zone "zone_affichage" (c’est une balise dans le HTML)
  document.getElementById("zone_affichage").innerHTML = `<p>Date et heure : ${dateHeure}</p>`;
  // getElementById permet d'accéder à un élément HTML avec son id (ici "zone_affichage")
  // innerHTML permet de changer le contenu HTML de cet élément (ici on met un paragraphe avec la date/heure)
}

// Fonction 2 : transformer le texte en majuscules
function mettreEnMajuscules() {
  const texte = document.getElementById("zone_texte").value; // On récupère ce que l’utilisateur a tapé dans la zone texte
  const majuscules = texte.toUpperCase(); // On transforme le texte en majuscules
  document.getElementById("zone_affichage").innerHTML = `<p>${majuscules}</p>`; // On affiche le texte modifié
}

// Fonction 3 : charger un fichier texte
function chargerFichier() {
  const fichier = document.getElementById("fileInput").files[0]; // On prend le premier fichier choisi par l’utilisateur
  if (!fichier) return; // S’il n’y a pas de fichier, on arrête ici

  const lecteur = new FileReader(); // Objet spécial qui permet de lire le contenu du fichier (comme si on ouvrait un fichier dans un éditeur)
  lecteur.onload = function (e) {
    const contenu = e.target.result; // Quand le fichier est chargé, on récupère son contenu
    document.getElementById("zone_texte").value = contenu; // On affiche ce contenu dans la zone texte
    document.getElementById("zone_affichage").innerHTML = "<p>Fichier chargé.</p>"; // Message de confirmation
  };
  lecteur.readAsText(fichier); // On lance la lecture du fichier comme du texte brut (plain text)
}

// Fonction 4 : segmentation automatique
function segmenterTexte() {
  const texte = document.getElementById("zone_texte").value; // On récupère le texte écrit ou chargé
  const lignes = texte.split("\n").filter(l => l.trim() !== ""); // On sépare le texte par lignes et on enlève les lignes vides
  const tokens = texte.split(/\s+/).filter(t => t !== ""); // On sépare par espaces, tabulations... (tout ce qui est "vide")

  const nbLignes = lignes.length; // On compte les lignes non vides
  const nbTokens = tokens.length; // On compte les mots/tokens

  let sortie = `<p>Nombre de lignes non vides : ${nbLignes}</p>`; // On prépare le message à afficher
  sortie += `<p>Nombre de tokens : ${nbTokens}</p>`;
  document.getElementById("zone_affichage").innerHTML = sortie; // On insère le message dans la page
}

// Fonction 5 : dictionnaire des formes par fréquence
function dictionnaireFormes() {
  const texte = document.getElementById("zone_texte").value.toLowerCase(); // On récupère le texte et on le met en minuscules
  const mots = texte.match(/\b\w+\b/g); // On cherche tous les mots (lettres et chiffres entre des limites de mots)
  const freqs = {}; // Dictionnaire vide pour stocker la fréquence de chaque mot

  mots.forEach(mot => {
    // Si le mot existe déjà dans le dictionnaire, on ajoute 1, sinon on commence à 1
    freqs[mot] = (freqs[mot] || 0) + 1;
  });

  // On transforme le dictionnaire en tableau [mot, fréquence] et on trie du plus fréquent au moins fréquent
  const tableau = Object.entries(freqs).sort((a, b) => b[1] - a[1]);

  // On prépare le tableau HTML à afficher
  let sortie = "<table><tr><th>Mot</th><th>Fréquence</th></tr>";
  tableau.forEach(([mot, freq]) => {
    sortie += `<tr><td>${mot}</td><td>${freq}</td></tr>`;
  });
  sortie += "</table>";

  document.getElementById("zone_affichage").innerHTML = sortie; // On affiche le tableau dans la page
}

// Fonction 6 : recherche GREP avec surlignage
function rechercherMotif() {
  const motif = document.getElementById("zone_recherche").value; // On récupère le motif écrit par l’utilisateur
  const texte = document.getElementById("zone_texte").value;

  try {
    const regex = new RegExp(motif, "gi"); // On crée une expression régulière (g = global, i = insensible à la casse)
    // On remplace chaque match par une version avec balise <mark> pour le surligner
    const resultat = texte.replace(regex, match => `<mark>${match}</mark>`);
    document.getElementById("zone_affichage").innerHTML = `<pre>${resultat}</pre>`; // On affiche le texte avec les surlignages
  } catch (e) {
    document.getElementById("zone_affichage").innerHTML = "<p>Motif non valide.</p>"; // Si l’expression est invalide
  }
}

// Fonction 7 : affichage de concordancier (contexte autour du mot)
function genererConcordancier() {
  const texte = document.getElementById("zone_texte").value;
  const motif = document.getElementById("zone_recherche").value;

  try {
    // On crée une expression régulière avec 30 caractères avant et après
    const regex = new RegExp(`(.{0,30})(${motif})(.{0,30})`, "gi");
    const concordances = [...texte.matchAll(regex)]; // matchAll donne tous les résultats, avec les parties capturées (avant, motif, après)

    // On prépare un tableau pour afficher les résultats
    let sortie = "<table><tr><th>Gauche</th><th>Motif</th><th>Droite</th></tr>";
    concordances.forEach(match => {
      const gauche = match[1].replace(/\n/g, " "); // On enlève les retours à la ligne pour un affichage propre
      const centre = match[2]; // Le motif trouvé
      const droite = match[3].replace(/\n/g, " ");
      sortie += `<tr><td>${gauche}</td><td><mark>${centre}</mark></td><td>${droite}</td></tr>`;
    });
    sortie += "</table>";

    document.getElementById("zone_affichage").innerHTML = sortie; // On affiche le tableau final
  } catch (e) {
    document.getElementById("zone_affichage").innerHTML = "<p>Erreur de motif.</p>"; // Si erreur dans la RegExp
  }
}

// Fonction 8 : remplacer toutes les voyelles par "/" et compter combien il y en avait
function remplacerVoyelles() {
  const texte = document.getElementById("zone_texte").value; // On récupère le texte dans la zone
  const voyelles = texte.match(/[aeiouyAEIOUY]/g); // On cherche toutes les voyelles (g = global, pour les prendre toutes)

  const nbVoyelles = voyelles ? voyelles.length : 0; // On compte combien il y en a (si aucun match, on met 0)
  
  // On remplace toutes les voyelles par des "/"
  const texteModifie = texte.replace(/[aeiouyAEIOUY]/g, "/");

  // On affiche le texte modifié et le nombre de voyelles remplacées
  const sortie = `<p>Texte modifié :</p><pre>${texteModifie}</pre><p>Nombre de voyelles remplacées : ${nbVoyelles}</p>`;
  document.getElementById("zone_affichage").innerHTML = sortie;
}
