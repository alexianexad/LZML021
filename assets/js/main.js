let tokens = []; // contiendra les tokens du document
let lignes = []; // stocker les lignes du texte

// Afficher date et heure
function date_heure() {
	let now = new Date();
	let annee = now.getFullYear();
	let mois = ('0' + (now.getMonth() + 1)).slice(-2);
	let jour = ('0' + now.getDate()).slice(-2);
	let heure = ('0' + now.getHours()).slice(-2);
	let minute = ('0' + now.getMinutes()).slice(-2);
	let seconde = ('0' + now.getSeconds()).slice(-2);
	document.getElementById("logger1").innerHTML = "Nous sommes le " + jour + "/" + mois + "/" + annee + " et il est " + heure + "h " + minute + "min " + seconde + "s.";
}

// Fonction qui affiche la date et rend visible le bouton heure
function afficherDateHeure() {
    const now = new Date(); // Crée un objet Date avec l’heure actuelle
    const date = now.toLocaleDateString("fr-FR"); // Format date français
    document.getElementById("outputDateHeure").textContent = "Date : " + date;

    // Affiche le bouton heure et masque celui de la date
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn2").style.display = "inline";
}

// Fonction qui affiche l’heure
function afficherHeure() {
    const now = new Date();
    const heure = now.toLocaleTimeString("fr-FR"); // Format heure français
    document.getElementById("outputDateHeure").textContent += "\nHeure : " + heure;
}


// Mettre en majuscules
function maj() {
	let text = document.getElementById("holder1").innerText;
	document.getElementById("holder1").innerHTML = text.toUpperCase();
}

// Afficher / Masquer aboutme
function showHide_aboutme() {
	let div = document.getElementById("aboutme");
	let b = document.getElementById("button_aboutme").innerHTML;
	if (div.style.display === "none") {
		div.style.display = "block";
		document.getElementById("button_aboutme").innerHTML = b.replace("more", "less");
	} else {
		div.style.display = "none";
		document.getElementById("button_aboutme").innerHTML = b.replace("less", "more");
	}
}

function showHide_aide() {
	const aide = document.getElementById("aide");
	const bouton = document.getElementById("button_aide");
	if (aide.style.display === "none" || aide.style.display === "") {
		aide.style.display = "block";
		bouton.textContent = "Masquer l'aide";
	} else {
		aide.style.display = "none";
		bouton.textContent = "Afficher l'aide";
	}
}

// Charger un fichier texte
function loadFile(event) {
	let reader = new FileReader();
	reader.onload = function() {
		let text = reader.result;
		document.getElementById("holder1").innerText = text;
		window.fullText = text;
		segText(); // segmentation automatique
	};
	reader.readAsText(event.target.files[0]);
}

// segmentation
function segText() {
    // Récupérer le texte du fichier affiché
    const text = document.getElementById("fileDisplayArea").textContent;

    if (!text) {
        alert("Veuillez d'abord charger un fichier.");
        return;
    }

    // Récupérer les délimiteurs depuis le champ
    const delim = document.getElementById("delimID").value;
    const regex = new RegExp("[" + delim + "\\s]+", "g"); // ajoute les espaces aussi

    // Découpage du texte selon les délimiteurs
    tokens = text.split(regex).filter(token => token.trim() !== "");

    // Affiche un message de succès avec le nombre de tokens
    const output = `<p style="color:green">Texte segmenté avec succès ! Nombre de tokens : <b>${tokens.length}</b>.</p>`;
    document.getElementById("page-analysis").innerHTML = output;
}


function dictionnaire() {
    if (tokens.length === 0) {
        alert("Veuillez segmenter le texte avant de créer le dictionnaire.");
        return;
    }

    // Création du dictionnaire (objet avec fréquence)
    const freqMap = {};
    tokens.forEach(token => {
        const lower = token.toLowerCase(); // insensible à la casse
        freqMap[lower] = (freqMap[lower] || 0) + 1;
    });

    // Transformer en tableau pour le tri
    const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

    // Construire le tableau HTML
    let html = `<h4>Dictionnaire des formes (${sorted.length} formes différentes)</h4>`;
    html += `<table border="1"><tr><th>Forme</th><th>Occurrences</th></tr>`;
    sorted.forEach(([forme, count]) => {
        html += `<tr><td>${forme}</td><td>${count}</td></tr>`;
    });
    html += `</table>`;

    // Affichage dans la zone d'analyse
    document.getElementById("page-analysis").innerHTML = html;
}

function handleFileSelect(evt) {
    const file = evt.target.files[0];

    if (!file) {
        alert("Aucun fichier sélectionné.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        document.getElementById("fileDisplayArea").textContent = contents;

        // Segmentation automatique en lignes
        lignes = contents.split(/\r?\n/); // coupe par sauts de ligne
        const nonEmptyLines = lignes.filter(line => line.trim() !== "");

        // Réinitialise les tokens (nécessite une segmentation manuelle)
        tokens = [];

        // Affiche un message avec le nombre de lignes
        document.getElementById("page-analysis").innerHTML =
            `<p style="color:green">Fichier chargé avec succès !<br>
             Nombre de lignes : <b>${lignes.length}</b><br>
             Lignes non vides : <b>${nonEmptyLines.length}</b></p>`;
    };
    reader.readAsText(file);
}

function grep() {
    if (lignes.length === 0) {
        alert("Veuillez charger un fichier avant d’utiliser grep.");
        return;
    }

    const motif = document.getElementById("poleID").value.trim();
    if (!motif) {
        alert("Veuillez entrer un motif (expression régulière).");
        return;
    }

    const regex = new RegExp(motif, "gi"); // expression insensible à la casse
    let resultat = "<h4>Résultats du grep</h4><ul>";

    let matchFound = false;

    lignes.forEach(line => {
        if (regex.test(line)) {
            matchFound = true;
            // Remettre le pointeur à 0 pour replace()
            const surligne = line.replace(regex, match => `<span style="color:red; font-weight:bold;">${match}</span>`);
            resultat += `<li>${surligne}</li>`;
        }
    });

    resultat += "</ul>";

    if (!matchFound) {
        document.getElementById("page-analysis").innerHTML = "<p>Aucun résultat trouvé.</p>";
    } else {
        document.getElementById("page-analysis").innerHTML = resultat;
    }
}

//concordentier
function concord() {
    if (lignes.length === 0) {
        alert("Veuillez charger un fichier avant d’utiliser le concordancier.");
        return;
    }

    const motif = document.getElementById("poleID").value.trim();
    if (!motif) {
        alert("Veuillez entrer un motif pour le concordancier.");
        return;
    }

    const regex = new RegExp(`(.{0,30})(${motif})(.{0,30})`, "gi");
    let resultat = `<h4>Concordancier</h4>
        <table border="1" style="border-collapse:collapse;">
        <thead>
            <tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr>
        </thead>
        <tbody>`;

    let matchFound = false;

    lignes.forEach(line => {
        let match;
        while ((match = regex.exec(line)) !== null) {
            matchFound = true;
            const gauche = match[1].replace(/\s+/g, " ").trimStart();
            const centre = match[2];
            const droite = match[3].replace(/\s+/g, " ").trimEnd();

            resultat += `<tr>
                <td style="text-align:right; padding-right:10px;">${gauche}</td>
                <td style="text-align:center; font-weight:bold; color:red;">${centre}</td>
                <td style="text-align:left; padding-left:10px;">${droite}</td>
            </tr>`;
        }
    });

    resultat += "</tbody></table>";

    if (!matchFound) {
        document.getElementById("page-analysis").innerHTML = "<p>Aucun contexte trouvé pour ce motif.</p>";
    } else {
        document.getElementById("page-analysis").innerHTML = resultat;
    }
}
