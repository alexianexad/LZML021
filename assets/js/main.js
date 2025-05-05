// Cette fonction affiche la date et l'heure actuelles dans la zone "resultat"
function afficherDateHeure() {
  let maintenant = new Date(); // On crée un objet Date contenant l’instant présent
  let date = maintenant.toLocaleDateString(); // On extrait la date au format local (ex: JJ/MM/AAAA)
  let heure = maintenant.toLocaleTimeString(); // On extrait l’heure au format local (ex: HH:MM:SS)
  document.getElementById("resultat").innerHTML = "Date : " + date + " - Heure : " + heure;
}

// Cette fonction met en majuscules tout le texte entré dans la zone "texte"
function mettreEnMajuscules() {
  let texte = document.getElementById("texte").value; // On récupère le texte saisi
  document.getElementById("texte").value = texte.toUpperCase(); // On transforme le texte en majuscules
}

// Cette fonction permet de charger un fichier texte local dans la zone "texte"
function chargerFichier(event) {
  let fichier = event.target.files[0]; // On prend le premier fichier sélectionné
  if (!fichier) return; // Si aucun fichier, on ne fait rien

  let lecteur = new FileReader(); // On crée un objet FileReader pour lire le contenu
  lecteur.onload = function(e) {
    let contenu = e.target.result; // Le texte du fichier est dans e.target.result
    document.getElementById("texte").value = contenu; // On affiche le texte dans la zone "texte"
  };
  lecteur.readAsText(fichier); // On lit le fichier en tant que texte brut
}

// Cette fonction découpe le texte en lignes et en mots, puis affiche quelques statistiques
function segmenterTexte() {
  let texte = document.getElementById("texte").value; // Récupération du texte
  let lignes = texte.split('\n'); // On découpe le texte en lignes avec retour à la ligne
  let tokens = texte.split(/\s+/).filter(token => token !== ""); // On découpe en mots/tokens en supprimant les blancs vides
  let nbLignes = lignes.filter(ligne => ligne.trim() !== "").length; // On compte les lignes non vides
  let nbTokens = tokens.length; // On compte le nombre de mots/tokens

  let resultat = "Nombre de lignes non vides : " + nbLignes + "<br>";
  resultat += "Nombre de mots/tokens : " + nbTokens;

  document.getElementById("resultat").innerHTML = resultat; // Affichage du résultat
}

// Cette fonction construit un dictionnaire de formes avec la fréquence de chaque mot
function dictionnaireFormes() {
  let texte = document.getElementById("texte").value;
  let mots = texte.toLowerCase().match(/\b\w+\b/g); // On extrait les mots avec une expression régulière
  let dico = {}; // Objet pour stocker les mots et leurs fréquences

  if (mots) {
    mots.forEach(function(mot) {
      dico[mot] = (dico[mot] || 0) + 1; // On incrémente la fréquence du mot
    });
  }

  let resultat = "<strong>Dictionnaire des formes (par fréquence) :</strong><br>";
  for (let mot in dico) {
    resultat += mot + " : " + dico[mot] + "<br>"; // On affiche chaque mot avec sa fréquence
  }

  document.getElementById("resultat").innerHTML = resultat;
}

// Cette fonction permet de chercher un motif dans le texte (comme grep) et de le surligner
function chercherMotif() {
  let motif = prompt("Entrez le motif à rechercher (expression régulière) :"); // Demande du motif à chercher
  if (!motif) return;

  let texte = document.getElementById("texte").value; // Récupère le texte
  try {
    let regex = new RegExp(motif, 'gi'); // Crée une RegExp insensible à la casse (g=global, i=insensible)
    let resultat = texte.replace(regex, match => "<mark>" + match + "</mark>"); // Surligne les correspondances
    document.getElementById("resultat").innerHTML = resultat;
  } catch (e) {
    alert("Expression régulière invalide."); // Si erreur, on avertit
  }
}

// Cette fonction affiche un concordancier avec le mot sélectionné dans le texte
function afficherConcordancier() {
  let texte = document.getElementById("texte").value;
  let selection = window.getSelection().toString().trim(); // Mot sélectionné par l’utilisateur

  if (!selection) {
    alert("Veuillez sélectionner un mot dans le texte.");
    return;
  }

  let lignes = texte.split('\n'); // On découpe le texte en lignes
  let resultat = "<strong>Concordancier pour : " + selection + "</strong><br>";

  lignes.forEach(function(ligne) {
    if (ligne.toLowerCase().includes(selection.toLowerCase())) { // Si la ligne contient le mot
      resultat += "... " + ligne + " ...<br>"; // On ajoute la ligne au résultat
    }
  });

  document.getElementById("resultat").innerHTML = resultat;
}

// Cette fonction remplace toutes les voyelles (minuscules et majuscules) par des slashes "/"
function remplacerVoyelles() {
  let texte = document.getElementById("texte").value; // On prend le texte
  let texteModifie = texte.replace(/[aeiouyAEIOUY]/g, '/'); // On remplace chaque voyelle par "/"
  document.getElementById("texte").value = texteModifie; // On met à jour le texte avec les remplacements
}
