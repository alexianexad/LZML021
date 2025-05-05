// Variables globales
let tokens = [];     // stocke les tokens
let lignes = [];     // stocke les lignes du texte brut
let texteOriginal = ""; // texte brut chargé

// Chargement automatique du fichier + segmentation en tokens + lignes
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        texteOriginal = e.target.result;

        // Découpage du texte en lignes (avec filtrage des lignes non vides)
        lignes = texteOriginal.split('\n');
        const lignesNonVides = lignes.filter(l => l.trim() !== '');

        // Découpage du texte en tokens avec les délimiteurs
        const delim = document.getElementById("delimID").value || " ,;’'~|&#@=`%*$()[]{}_:+«»§\\/";
        const regexDelim = new RegExp("[" + delim + "\\s]+");
        tokens = texteOriginal.split(regexDelim).filter(t => t.trim() !== "");

        // Affichage d’un message avec le nombre de tokens et de lignes non vides
        const output = `Fichier chargé. ${tokens.length} tokens, ${lignesNonVides.length} lignes non vides.`;
        document.getElementById("fileDisplayArea").textContent = texteOriginal;
        document.getElementById("page-analysis").textContent = output;
    };
    reader.readAsText(file);
});

// Fonction dictionnaire : crée un tableau des formes triées par fréquence
function dictionnaire() {
    if (tokens.length === 0) {
        alert("Veuillez d'abord charger un fichier pour générer un dictionnaire.");
        return;
    }

    const freq = {};
    tokens.forEach(t => {
        const mot = t.toLowerCase();
        freq[mot] = (freq[mot] || 0) + 1;
    });

    const tableau = Object.entries(freq).sort((a, b) => b[1] - a[1]);

    let html = "<table><tr><th>Forme</th><th>Fréquence</th></tr>";
    tableau.forEach(([forme, count]) => {
        html += `<tr><td>${forme}</td><td>${count}</td></tr>`;
    });
    html += "</table>";

    document.getElementById("logger1").innerHTML = html;
}

// Fonction grep : recherche une expression dans les lignes et les surligne
function grep() {
    const pole = document.getElementById("poleID").value.trim();
    if (!texteOriginal || lignes.length === 0) {
        alert("Veuillez charger un fichier.");
        return;
    }
    if (!pole) {
        alert("Veuillez entrer un pôle (mot ou motif).");
        return;
    }

    const regex = new RegExp(pole, 'gi');
    const resultat = lignes
        .filter(l => l.match(regex))
        .map(l => l.replace(regex, match => `<span style="color:red;font-weight:bold">${match}</span>`))
        .join('<br>');

    document.getElementById("logger3").innerHTML = resultat || "Aucune occurrence trouvée.";
}

// Fonction concordancier : cherche le pôle avec contexte gauche/droit
function concord() {
    const pole = document.getElementById("poleID").value.trim();
    const lg = parseInt(document.getElementById("lgID").value);
    if (!texteOriginal || tokens.length === 0) {
        alert("Veuillez charger un fichier.");
        return;
    }
    if (!pole || isNaN(lg)) {
        alert("Veuillez entrer un pôle et une longueur de contexte valide.");
        return;
    }

    const regex = new RegExp(pole, 'gi');
    const res = [];

    tokens.forEach((token, index) => {
        if (token.match(regex)) {
            const gauche = tokens.slice(Math.max(0, index - lg), index).join(" ");
            const droite = tokens.slice(index + 1, index + 1 + lg).join(" ");
            res.push([gauche, token, droite]);
        }
    });

    if (res.length === 0) {
        document.getElementById("logger2").innerHTML = "Aucune occurrence trouvée.";
        return;
    }

    let html = "<table><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>";
    res.forEach(([g, p, d]) => {
        html += `<tr><td>${g}</td><td><b>${p}</b></td><td>${d}</td></tr>`;
    });
    html += "</table>";

    document.getElementById("logger2").innerHTML = html;
}
