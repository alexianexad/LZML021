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

// Segmentation du texte
function segText() {
	const fileDisplayArea = document.getElementById('fileDisplayArea');
	const inputDelim = document.getElementById("delimID").value;

	if (!window.fullText) {
		fileDisplayArea.innerHTML = "<p style='color:red;'>Veuillez d'abord charger un fichier texte.</p>";
		return;
	}

	const escapedDelim = inputDelim.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
	const regexDelim = new RegExp(`[\\s${escapedDelim}]+`, 'g');

	tokens = window.fullText.split(regexDelim).filter(token => token.length > 0);
	lignes = window.fullText.split(/\r?\n/).filter(line => line.trim() !== "");

	fileDisplayArea.innerHTML = `
		<p><b>Nombre de tokens :</b> ${tokens.length}</p>
		<p><b>Nombre de lignes non vides :</b> ${lignes.length}</p>
		<p><b>Extrait des tokens :</b> ${tokens.slice(0, 20).join(", ")}...</p>
	`;
}

// Dictionnaire des formes
function dictionnaire() {
	if (tokens.length === 0) {
		alert("Veuillez segmenter le texte avant de créer le dictionnaire.");
		return;
	}

	const freqMap = {};
	tokens.forEach(token => {
		const lower = token.toLowerCase();
		freqMap[lower] = (freqMap[lower] || 0) + 1;
	});

	const sorted = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);

	let html = `<h4>Dictionnaire des formes (${sorted.length} formes différentes)</h4>`;
	html += `<table border="1"><tr><th>Forme</th><th>Occurrences</th></tr>`;
	sorted.forEach(([forme, count]) => {
		html += `<tr><td>${forme}</td><td>${count}</td></tr>`;
	});
	html += `</table>`;

	document.getElementById("page-analysis").innerHTML = html;
}

// Grep
function grep() {
	if (lignes.length === 0) {
		alert("Veuillez charger un fichier avant d’utiliser grep.");
		return;
	}

	const motif = document.getElementById("poleID").value.trim();
	if (!motif) {
		alert("Veuillez entrer un motif.");
		return;
	}

	const regex = new RegExp(motif, "gi");
	let resultat = "<h4>Résultats du grep</h4><ul>";
	let matchFound = false;

	lignes.forEach(line => {
		if (regex.test(line)) {
			matchFound = true;
			const surligne = line.replace(regex, match => `<span style="color:red; font-weight:bold;">${match}</span>`);
			resultat += `<li>${surligne}</li>`;
		}
	});

	resultat += "</ul>";

	document.getElementById("page-analysis").innerHTML = matchFound ? resultat : "<p>Aucun résultat trouvé.</p>";
}

// Concordancier
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
		<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead><tbody>`;

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
	document.getElementById("page-analysis").innerHTML = matchFound ? resultat : "<p>Aucun contexte trouvé pour ce motif.</p>";
}
