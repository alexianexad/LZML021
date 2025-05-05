// ============================
// VARIABLES GLOBALES
// ============================

// On déclare deux variables globales pour stocker le texte découpé :
let tokens = [];  // liste de tous les mots du texte
let lignes = [];  // liste des lignes du texte (une ligne = un retour à la ligne)

// ============================
// DATE ET HEURE
// ============================

// Cette fonction affiche automatiquement la date et l'heure en haut de la page
function afficherDateHeure() {
    const maintenant = new Date();  // On récupère la date et l'heure actuelles
    const options = {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const dateHeure = maintenant.toLocaleDateString('fr-FR', options); // Format français
    document.getElementById("dateHeure").textContent = "Date et heure : " + dateHeure;
}

// Met à jour la date/heure toutes les secondes
setInterval(afficherDateHeure, 1000);
afficherDateHeure(); // Appel initial

// ============================
// CHARGEMENT DU FICHIER TEXTE
// ============================

// Quand un fichier est sélectionné
document.getElementById("fileInput").addEventListener("change", function (event) {
    const fichier = event.target.files[0]; // On récupère le fichier choisi
    if (!fichier) return;

    const reader = new FileReader(); // Permet de lire le fichier texte

    // Quand le fichier est lu :
    reader.onload = function (e) {
        const texte = e.target.result; // Le contenu du fichier

        // On affiche le texte dans la zone prévue
        document.getElementById("textArea").value = texte;

        // ============================
        // SEGMENTATION AUTOMATIQUE
        // ============================

        // Découpage en mots (tokens) avec une expression régulière
        tokens = texte.match(/\b\w+\b/g) || [];

        // Découpage en lignes (selon les retours à la ligne)
        lignes = texte.split(/\r?\n/);

        // On compte le nombre de lignes qui ne sont pas vides
        const lignesNonVides = lignes.filter(l => l.trim() !== "");

        // On affiche le résultat dans un paragraphe
        document.getElementById("fileInfo").textContent =
            `${fichier.name} chargé. ${tokens.length} tokens, ${lignesNonVides.length} lignes non vides.`;
    };

    reader.readAsText(fichier); // On déclenche la lecture du fichier
});

// ============================
// ACTION 1 : DICTIONNAIRE
// ============================

// Cette fonction crée un dictionnaire des formes les plus fréquentes
function dictionnaire() {
    if (tokens.length === 0) {
        alert("Veuillez charger un fichier avant d'utiliser le dictionnaire.");
        return;
    }

    const freq = {}; // Objet pour stocker les fréquences des mots

    // On parcourt tous les mots du texte
    for (let mot of tokens) {
        const forme = mot.toLowerCase(); // On met en minuscule
        freq[forme] = (freq[forme] || 0) + 1; // On ajoute 1 à la fréquence
    }

    // On trie les mots par fréquence décroissante
    const formesTriees = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    // On génère un tableau HTML pour l'afficher
    let html = "<h2>Dictionnaire de formes</h2><table><tr><th>Forme</th><th>Fréquence</th></tr>";
    for (let [forme, nb] of formesTriees) {
        html += `<tr><td>${forme}</td><td>${nb}</td></tr>`;
    }
    html += "</table>";

    document.getElementById("output").innerHTML = html; // On affiche le tableau
}

// ============================
// ACTION 2 : GREP
// ============================

// Cette fonction affiche les lignes qui contiennent un motif donné (regex)
function grep() {
    if (lignes.length === 0) {
        alert("Veuillez charger un fichier avant d'utiliser grep.");
        return;
    }

    const motif = prompt("Motif à rechercher (expression régulière) :"); // Demande à l'utilisateur
    if (!motif) {
        alert("Veuillez entrer un motif.");
        return;
    }

    const regex = new RegExp(motif, "gi"); // Expression régulière insensible à la casse

    let html = "<h2>Résultats Grep</h2>";

    // On parcourt toutes les lignes du texte
    for (let ligne of lignes) {
        if (regex.test(ligne)) {
            // On remplace les parties trouvées par une version colorée
            const colorée = ligne.replace(regex, match => `<span class="highlight">${match}</span>`);
            html += `<p>${colorée}</p>`;
        }
    }

    document.getElementById("output").innerHTML = html; // On affiche les résultats
}

// ============================
// ACTION 3 : CONCORDANCIER
// ============================

// Cette fonction affiche un tableau avec contexte gauche, le mot, contexte droit
function concordancier() {
    if (lignes.length === 0) {
        alert("Veuillez charger un fichier avant d'utiliser le concordancier.");
        return;
    }

    const motif = prompt("Motif à rechercher (expression régulière) :");
    if (!motif) {
        alert("Veuillez entrer un motif.");
        return;
    }

    // On cherche jusqu'à 30 caractères avant et après le mot trouvé
    const regex = new RegExp(`(.{0,30})(${motif})(.{0,30})`, "gi");

    let html = "<h2>Concordancier</h2><table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>";

    // Pour chaque ligne, on applique l'expression régulière
    for (let ligne of lignes) {
        let match;
        while ((match = regex.exec(ligne)) !== null) {
            const gauche = match[1];
            const centre = `<span class="highlight">${match[2]}</span>`;
            const droite = match[3];
            html += `<tr><td>${gauche}</td><td>${centre}</td><td>${droite}</td></tr>`;
        }
    }

    html += "</table>";
    document.getElementById("output").innerHTML = html;
}

// ============================
// BOUTONS
// ============================

// Ici on relie les boutons aux fonctions correspondantes
document.getElementById("btnDico").addEventListener("click", dictionnaire);
document.getElementById("btnGrep").addEventListener("click", grep);
document.getElementById("btnConcordancier").addEventListener("click", concordancier);
