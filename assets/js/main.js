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

// Segmenter le texte en lignes et tokens ---------------------------------------------------------
function segmente() {
	let texte = document.getElementById("holder1").innerText;
	window.tokens = texte.match(/\b\w+\b/g) || [];
	window.lignes = texte.split(/\n+/).filter(ligne => ligne.trim() !== "");
}

// Afficher des statistiques ---------------------------------------------------------------------
function stats() {
	if (!window.tokens || !window.lignes) {
		document.getElementById("logger1").innerHTML = "Erreur : fichier non chargé.";
		return;
	}
	let nbTokens = window.tokens.length;
	let nbLignes = window.lignes.length;
	document.getElementById("logger1").innerHTML = "Nombre de mots : " + nbTokens + " | Lignes non vides : " + nbLignes;
}

// Dictionnaire des formes par fréquence ---------------------------------------------------------
function dictionnaire() {
	if (!window.tokens) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun fichier chargé.";
		return;
	}
	let freq = {};
	for (let mot of window.tokens) {
		mot = mot.toLowerCase();
		freq[mot] = (freq[mot] || 0) + 1;
	}
	let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
	let html = "<table><tr><th>Mot</th><th>Fréquence</th></tr>";
	for (let [mot, count] of sorted) {
		html += `<tr><td>${mot}</td><td>${count}</td></tr>`;
	}
	html += "</table>";
	document.getElementById("logger1").innerHTML = html;
}

// Recherche GREP avec surlignage ---------------------------------------------------------------
function grep() {
	if (!window.lignes) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun fichier chargé.";
		return;
	}
	let motif = prompt("Motif à chercher ?");
	if (!motif) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun motif fourni.";
		return;
	}
	let regex = new RegExp(motif, "gi");
	let resultats = window.lignes.filter(ligne => regex.test(ligne));
	let html = resultats.map(l => l.replace(regex, match => `<span style='color:red'>${match}</span>`)).join("<br>");
	document.getElementById("logger1").innerHTML = html || "Aucun résultat trouvé.";
}

// Concordancier (contexte gauche/pôle/droit) ---------------------------------------------------
function concord() {
	if (!window.lignes) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun fichier chargé.";
		return;
	}
	let mot = prompt("Mot à chercher ?");
	if (!mot) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun mot fourni.";
		return;
	}
	let regex = new RegExp(`(.{0,30})\\b(${mot})\\b(.{0,30})`, "gi");
	let html = "<table><tr><th>Contexte gauche</th><th>Mot</th><th>Contexte droit</th></tr>";
	for (let ligne of window.lignes) {
		let match;
		while ((match = regex.exec(ligne)) !== null) {
			html += `<tr><td>${match[1]}</td><td>${match[2]}</td><td>${match[3]}</td></tr>`;
		}
	}
	html += "</table>";
	document.getElementById("logger1").innerHTML = html;
}

// Fonction spéciale entre grep et concordancier -------------------------------------------------
function special() {
	if (!window.lignes) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun fichier chargé.";
		return;
	}
	let motif = prompt("Motif ou expression à chercher ?");
	if (!motif) {
		document.getElementById("logger1").innerHTML = "Erreur : aucun motif fourni.";
		return;
	}
	let regex = new RegExp(`(.{0,20})(${motif})(.{0,20})`, "gi");
	let html = "<table><tr><th>Avant</th><th>Motif</th><th>Après</th></tr>";
	for (let ligne of window.lignes) {
		let match;
		while ((match = regex.exec(ligne)) !== null) {
			html += `<tr><td>${match[1]}</td><td style='color:red'>${match[2]}</td><td>${match[3]}</td></tr>`;
		}
	}
	html += "</table>";
	document.getElementById("logger1").innerHTML = html || "Aucun résultat trouvé.";
}

// Compter les phrases --------------------------------------------------------------------------
function phrases() {
	let texte = document.getElementById("holder1").innerText;
	let nb = (texte.match(/[.!?]+/g) || []).length;
	document.getElementById("logger1").innerHTML = "Nombre de phrases : " + nb;
}

// Mots les plus longs --------------------------------------------------------------------------
function motsLongs() {
	let sorted = [...window.tokens].sort((a, b) => b.length - a.length);
	let top10 = sorted.slice(0, 10);
	let html = "<ol>";
	for (let mot of top10) {
		html += `<li>${mot}</li>`;
	}
	html += "</ol>";
	document.getElementById("logger1").innerHTML = html;
}

// Graphe camembert avec Chart.js ---------------------------------------------------------------
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

