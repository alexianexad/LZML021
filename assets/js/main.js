let tokens = []; // contiendra les tokens du document
let lignes = []; // stocker les lignes du texte

// Afficher date et heure -----------------------------------------------------------------------
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

// Mettre en majuscules -----------------------------------------------------------------------
function maj() {
	let text = document.getElementById("holder1").innerText;
	document.getElementById("holder1").innerHTML = text.toUpperCase();
}

// Afficher / Masquer aboutme -----------------------------------------------------------------------
function showHide_aboutme() {
	let div = document.getElementById("aboutme");
	let b = document.getElementById("button_aboutme").innerHTML;
	if (div.style.display === "none") {
		div.style.display = "block";
		let change = b.replace("more", "less");
		document.getElementById("button_aboutme").innerHTML = change;
	} else {
		div.style.display = "none";
		let change = b.replace("less", "more");
		document.getElementById("button_aboutme").innerHTML = change;
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
// Charger un fichier texte -----------------------------------------------------------------------
function loadFile(event) {
	let reader = new FileReader();

	reader.onload = function() {
		let text = reader.result;
		document.getElementById("holder1").innerText = text;
		segmente();
		stats(); // Met automatiquement à jour les stats après le chargement
	};

	reader.readAsText(event.target.files[0]);
}
//pour segmenter j'ai un un proble de segmentation ca segmentait tous en un seul bloc
function segText() {
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    const delimInput = document.getElementById("delimID").value;

    if (!window.fullText) {
        fileDisplayArea.innerHTML = "<p style='color:red;'>Veuillez d'abord charger un fichier texte.</p>";
        return;
    }

    // Création d'une expression régulière avec les délimiteurs saisis
    const delimiters = delimInput.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // échappe les caractères spéciaux
    const regex = new RegExp(`[${delimiters}\\s]+`, "g"); // inclut les espaces comme délimiteurs

    // Découpe du texte en tokens (mots) avec les délimiteurs
    window.tokens = window.fullText.split(regex).filter(token => token.length > 0); // enlève les vides
    window.lignes = window.fullText.split(/\r?\n/).filter(ln => ln.trim() !== ""); // lignes non vides

    // Affichage des résultats
    fileDisplayArea.innerHTML = `
        <p><b>Nombre de tokens (mots) :</b> ${tokens.length}</p>
        <p><b>Nombre de lignes non vides :</b> ${lignes.length}</p>
        <p><b>Extrait des tokens :</b> ${tokens.slice(0, 20).join(", ")}...</p>
    `;
}


    // Récupérer les délimiteurs qu'on a
    const delim = document.getElementById("delimID").value;
    const regex = new RegExp("[" + delim + "\\s]+", "g"); // ajoute des espaces aussi

    // Découpage du texte selon les délimiteurs
    tokens = text.split(regex).filter(token => token.trim() !== "");

    // Affiche un message de succès avec le nombre de tokens
    const output = `<p style="color:green">Texte segmenté avec succès ! Nombre de tokens : <b>${tokens.length}</b>.</p>`;
    document.getElementById("page-analysis").innerHTML = output;
}

// Dictionnaire des formes par fréquence 
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

function segText() {
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    const inputDelim = document.getElementById("delimID").value;

    // Vérifie que le texte a bien été chargé
    if (!window.fullText) {
        fileDisplayArea.innerHTML = "<p style='color:red;'>Veuillez d'abord charger un fichier texte.</p>";
        return;
    }

    // Création dynamique de l'expression régulière à partir des délimiteurs
    const escapedDelim = inputDelim.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // échappe les caractères spéciaux
    const regexDelim = new RegExp(`[\\s${escapedDelim}]+`, 'g'); // délimiteurs + espaces

    // Découpe du texte en tokens (mots)
    const tokens = window.fullText.split(regexDelim).filter(token => token.length > 0);

    // Stockage global pour réutilisation
    window.tokens = tokens;
    window.nbTokens = tokens.length;

    // Affichage du résultat
    fileDisplayArea.innerHTML = `
        <p><b>Nombre de tokens :</b> ${tokens.length}</p>
        <p><b>Liste des tokens :</b></p>
        <div style="white-space: pre-wrap; border:1px solid #ccc; padding:10px; max-height:200px; overflow:auto;">
            ${tokens.join('\n')}
        </div>
    `;
}


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




// Compter les phrases 
function nbPhrases() {
    if (!window.fullText) {
        document.getElementById('logger1').innerHTML = "<p style='color:red;'>Chargez d'abord un texte.</p>";
        return;
    }

    // Découpage  par ponctuation finale
    const phrases = window.fullText.split(/[.!?]+/).filter(p => p.trim().length > 0);
    const nb = phrases.length;

    document.getElementById('logger1').innerHTML = `<p><b>Nombre de phrases :</b> ${nb}</p>`;
}

// mot les plus long
function tokenLong() {
    if (!window.tokens || window.tokens.length === 0) {
        document.getElementById('logger2').innerHTML = "<p style='color:red;'>Veuillez d'abord segmenter le texte.</p>";
        return;
    }

    // Trie les tokens par longueur décroissante
    const sorted = [...window.tokens].sort((a, b) => b.length - a.length);
    const top10 = sorted.slice(0, 10);

    // Création d'un tableau HTML
    let html = "<table border='1' style='margin:auto;'><thead><tr><th>Mot</th><th>Longueur</th></tr></thead><tbody>";
    for (let mot of top10) {
        html += `<tr><td>${mot}</td><td>${mot.length}</td></tr>`;
    }
    html += "</tbody></table>";

    document.getElementById('logger2').innerHTML = `<p><b>Top 10 des mots les plus longs :</b></p>${html}`;
}

// Graphe camembert avec Chart.js ( pas réussi a faire fonctionné)
function camembert() {
	let freq = {};
	for (let mot of window.tokens) {
		mot = mot.toLowerCase();
		freq[mot] = (freq[mot] || 0) + 1;
	}
	let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
	let labels = sorted.map(item => item[0]);
	let data = sorted.map(item => item[1]);
	let canvas = document.getElementById("graph");
	let ctx = canvas.getContext("2d");
	new Chart(ctx, {
		type: "pie",
		data: {
			labels: labels,
			datasets: [{
				data: data,
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8AFFC1", "#B28DFF"]
			}]
		}
	});
}

