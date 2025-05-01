// Afficher date et heure -----------------------------------------------------------------------
function date_heure() { 
	let now = new Date();  // pour la fonction new Date(),je m'appui sur le contenu de cette page https://www.w3schools.com/js/tryit.asp?filename=tryjs_date_current
	let annee = now.getFullYear();
	let mois = ('0'+now.getMonth()+1).slice(-2);
	let jour = XXX
	let heure = XXX
	let minute = XXX
	let seconde =XXX;
 	document.getXXXrHTML = "Nous sommes le "+jour+"/"+mois+"/"+annee+" et il est "+heure+"h "+minute+"min "+seconde+"s.";
 	document.getElementById("btn2").XXX; // lorsque vous utilisez une méthode pour la première fois, comme getElementById, vous expliquez son fonctionnement
 }
 
// Mettre en majuscules -----------------------------------------------------------------------
function maj() {
	let text = document.getXXX("holder1").inXXX;
	document.geXXX("holder1").innerHTML = text.toXXX();
}

// Afficher / Masquer aboutme -----------------------------------------------------------------------
function showHide_aboutme() {
	let div = document.getXXX("aboutme");
	let b = document.getElementById("button_aboutme").innerHTML;
  		if (div.style.display === "none") {
   			div.style.diXXX;
	  		let change = b.replace("more","less");
	  		document.getElementById("button_aboutme").innerHTML = change;
	  		}
		else {
			div.style.display = "none";
			var change = XXX");
	    	document.getElXXX = change;
	    	}
}


/*------------------------------------------------------------------------------------------------------------------*/
//							OUTIL D'ANALYSE des données dans un fichier									//
/*------------------------------------------------------------------------------------------------------------------*/

// Charger le texte -----------------------------------------------------------------------
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {  //addEventListener a été utilisée en faisant référence à https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener2
        
        let file = fileInput.fixxx
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                segText();
                let nbTokens = xx
                let nbLines = xx
                document.getElementById("logger2").innerHTML = '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines +' </span>';
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);

            document.getElementById("logger1").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

// Afficher / Masquer l'aide --------------------------------------------------------------------------
function showHide_aide() {
	let div = document.getElementById("aide");
	let b = document.getElementById("button_aide").innerHTML;
  		if xx
	  		}
		else {
			xx
	    	document.getElementById("button_aide").innerHTML = change;
	    	}
}

// VERSION segText() ------------------------------------------------------------------------
function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>'
        }else{
            document.getElementById('logger3').innerHTML="";
            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = xx;
            let display = xx;
        
            let regex_delim = new RegExp(
                "["
                + delim
                    .replace("-", "\\-") // le tiret n'est pas à la fin : il faut l'échapper, sinon erreur sur l'expression régulière
                    .replace("[", "\\[").replace("]", "\\]") // à changer sinon regex fautive, exemple : [()[]{}] doit être [()\[\]{}], on doit "échapper" les crochets, sinon on a un symbole ] qui arrive trop tôt.
                + "\\s" // on ajoute tous les symboles d'espacement (retour à la ligne, etc)
                + "]+" // on ajoute le + au cas où plusieurs délimiteurs sont présents : évite les tokens vides
            );
        
            let tokens = xx;
            tokens = tokens.filter(x => x.trim() != ""); // on s'assure de ne garder que des tokens "non vides"
            let lines = xx;
            lines = lines.filter(line => line.trim() != "");
        
            global_var_tokens = xx; // décommenter pour vérifier l'état des tokens dans la console développeurs sur le navigateur
            global_var_lines = xx;
            display.innerHTML = xx.join(" ");
        }
    }
}


// A RETENIR : différences .innerHTML  .textContent  .innerText
//.innerHTML permet de récupérer ou définir le contenu HTML d'un élément, y compris les balises HTML.
//.textContent permet de récupérer ou définir le contenu textuel d'un élément, en ignorant les balises HTML. Supprime les espaces supplémentaires et les retours chariot.
//.innerText est similaire à .textContent, mais tient compte de la mise en forme CSS appliquée à l'élément, ce qui peut parfois affecter le texte affiché. Inclue des espaces et des retours chariot supplémentaires.

// Dictionnaire -----------------------------------------------------------------
function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){ //commenter l'utilité de innerHTML==""
        //alert("Il faut d'abord charger un fichier .txt !");
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
        } else {
            document.getElementById('logger3').innerHTML="";
            let tokenFreq = {}; //commenter
            let tokens = global_var_tokens;
            // commenter
            tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);
            // Convertir l'objet en tableau de paires clé-valeur
            let freqPairs = Object.entries(tokenFreq);
            // Trier le tableau par fréquence décroissante
            freqPairs.sort((a, b) xx);
            // Ajouter l'entête du tableau
            let tableArr = [['<b>Token</b>', 'xx']];
            // Créer un tableau de tableaux contenant les tokens et leurs fréquences
            let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
            // Concaténer les deux tableaux
            let finalTable = xx;
            // Créer le tableau HTML à partir du tableau final
            let tableHtml = finalTable.map(row => xx  .join('');
            // Afficher le tableau HTML dans la page
            document.getElementById('page-analysis').innerHTML = '<table>' + tableHtml + '</table>';
        }
}

// GREP ---------------------------------------------------------------------
function grep() {
    // Vérifier si un fichier .txt a été chargé
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        // Afficher un message d'erreur
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
        } else {
            // Effacer tout message d'erreur précédent
            document.getElementById('logger3').innerHTML="";
            // Récupérer la valeur du champ "pôle"
            let poleInput = xx;
            // Vérifier si un pôle a été saisi
            if (poleInput == xx) {
            // Afficher un message d'erreur
            document.getElementById('logger3').innerHTML = "Il faut d'abord entrer un pôle !";
            } else {
                // Créer une expression régulière à partir de la valeur du champ "pôle"
                let poleRegex = new RegExp(poleInput, 'g');
                // Initialiser la variable "resultat" avec l'entête du tableau
                let resultat = "<tr><th>Ligne</th><th>Résultat</th></tr>";
                // Parcourir chaque ligne du tableau "global_var_lines"
                for (let i = 0; i < xx) {
                // Vérifier si la ligne correspond à la regex
                if (xx)) {
                // Ajouter le numéro de la ligne et le résultat correspondant au tableau "resultat"
                let lineNumber = i + 1; // Ajouter 1 car les tableaux en JavaScript commencent à l'index 0
                resultat += xx";
                }
            }
            // Vérifier si des résultats ont été trouvés
            if (resultat == "<tr><th>Ligne</th><th>Résultat</th></tr>") {
                // Effacer les résulats précédent
                document.getElementById('page-analysis').innerHTML = "";
                // Afficher un message d'erreur
                document.getElementById('logger3').innerHTML = "Aucune correspondance trouvée.";
                } else {
                    // Effacer tout message d'erreur précédent
                    document.getElementById('logger3').innerHTML = "";
                    // Injecter le tableau résultant dans l'élément HTML
                    document.getElementById('page-analysis').innerHTML = "<table>" + resultat + "</table>";
                    }
            }
        }
}

// Concordancier ---------------------------------------------------------------------------
function concord() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('logger3').innerHTML = "Il faut d'abord charger un fichier .txt !";
        } else {
            document.getElementById('logger3').innerHTML="";
            let poleInput = document.getElementById('XX').XX;
            if (poleInput == "") {
                document.getElementById('logger3').innerHTML = "XX!";
                } else {
                    document.getElementById('logger3').innerHTML="";
                    let lgInput = document.getElementById('lgID').value; //voir bouton "longueur" dans index.html
                    // Vérifier si une longueur a été saisi, et si > 0
                    if (lgInput == xx) { 
                    // Afficher un message d'erreur
                        document.getElementById('logger3').innerHTML = "Il faut d'abord entrer une longueur > 0 !";
                        } else {
                            // Récupérer le pôle et le convertir en regex
						  	let poleRegex = new RegExp("^" + poleInput + "$", "gi"); // le "i" indique de ne pas prendre en compte la casse, ^ et $ pour délimiter le mot
						  	//Récupérer la valeur de "lgInput" (longueur de contexte) et conversion en nombre entier
						  	let long = parseInt(document.xx);
						
						  	// Chercher le pôle et créer une liste de concordance avec la méthode Array.prototype.reduce()
						  	// On applique .reduce sur global_var_tokens. Le callback prend en paramètres acc : accumulateur initialisé à 0 ;  token : valeur courante ; i : index de la valeur courante
						  	let concordance = global_var_tokens.reduce((acc, token, i) => {
						  		// A chaque itération du callback on teste si le "poleRegex" correspond au token courant
						    	if (poleRegex.test(token)) {
						    		// Si oui, création du contexte gauche (cLeft) et droit (cRight)
						      		let cLeft = global_var_tokens.slice(Math.max(0, i - long), i).join(" ");
						      		let cRight = global_var_tokens.slice(i + 1, Math.min(global_var_tokens.length, i + long + 1)).join(" ");
						      		acc.push([cLeft, token, cRight]); // Ajout de (contexte gauche, pôle, contexte droit) à la liste acc, comme affiché sur le navigateur en cours
						   	 		}
						    		return acc;
						    		}, []); // commenter 
						
								  // Afficher les résultat dans une table HTML
								  let table = document.xx;
								  table.innerHTML = "<thead><xx</tr></thead>";
								  concordance.forEach(([cLeft, pole, cRight]) => { // commenter
								  	// Insertion d'une nouvelle ligne dans la table
								  	let row = table.insertRow();
								  	// Ajouter les données à la ligne
								    row.xx;
								    });
								    
                             		// Vérifier si des résultats ont été trouvés
                               		if (table.innerHTML == "<thead><tr><th>Contexte gauche</th><th>Pôle</th><th>Contexte droit</th></tr></thead>") {
	                                    // Effacer les résulats précédent
	                                    document.getElementById('page-analysis').innerHTML = "";
	                                    // Afficher un message d'erreur
	                                    document.getElementById('logger3'). xx
                                    	} else {
                                    		// Effacer tout message d'erreur précédent
                                          	document.getElementById('logger3').innerHTML xx
                                           	// Injecter le tableau résultant dans l'élément HTML
                                          	document.getElementById("page-analysis").innerHTML = "";
                                          	document.getElementById("page-analysis").appendChild(table); 
                                          	}
                                    }
                        }
            }
}

// Nombre de phrases -----------------------------------------
function nbPhrases() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
        } else {
            document.getElementById('logger3').innerHTML="";
            let text = document.getElementById("xx").xx; //c
            let phrase= /[.!?]/g; //comm
            let nbPhrases = text.split(xx); //comm
            let resultat = xx
            document.getElementById('page-analysis').innerHTML = '<div>Il y a ' + resultat + ' phrases dans ce texte.</div>';
            }
}

// Mots les plus longs ----------------------------------------------
function tokenLong() {
     if (document.getElementById('fileDisplayArea').innerHTML==""){
        document.getElementById('XX').innerHTML="xx !";
        } else {
            document.getElementById('XX').innerHTML="";
            // Trier le tableau 'global_var_tokens' par ordre décroissant de longueur et garder les X premiers éléments
            let tokenSort = global_var_tokens.sort((a, b) XX);
            
            // Convertir chaque token en une ligne de tableau HTML avec sa longueur
            let map = tokenSort.map(token => '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>').join('');
            //Tableau HTML
            let resultat = '<table><tr><th colspan=2><b>XX</b></th></tr><tr><th><b>Mot</b></th><th><b>XX</b></th></tr>' + map + XX;
            // Injecter le tableau dans l'élément HTML
            document.getXX = XX;
            }
}

// Pie Chart (mots les plus fréquents, moins les stopwords) --------------------------------------------------
function pieChart() {
	if (document.getElementById('fileDisplayArea').innerHTML=="") {
        document.getElementById('logger3').innerHTML="XX!";
      } else {
        document.getXX;
        // Récupérer les stopwords
	    var stopwordInput = document.getE XX;
	    var stopwords = stopwordInput.split(","); //commenter
	
	    // Filtrer les stopwords de global_var_tokens
	    var filteredTokens = global_var_tokens.filter(function(token) { //commenter
	      return stopwords.indexOf(token) === -1;
	    });
	
	    // Compter le nombre d'occurences de chaque token dans "filteredTokens"
	    var count = {};
	    filteredTokens.forEach(function(token) {
	      count[token] = (count[token] || 0) + 1;
	    });
	
	    var chartData = [];
	    var sortedTokens = Object.keys(count).sort(function(a, b) {  // commenter
	      return count[b] - count[a];
	    }).slice(0, 30);
	    sortedTokens.forEach(function(token) {
	      chartData.push({
	        label: token,
	        y: count[token]
	      });
	    }); //commenter depuis var chartData = []
	
	    // Creation du graphique CanvasJS
	    var chart = new CanvasJS.Chart("chartContainer", {
	      animationEnabled: true,
	      backgroundColor: "transparent",
	      title: {
	        text: "Mots les plus fréquents"
	      },
	      data: [{
	        type: "pie",
	        showInLegend: true,
	        legendText: "{label}",
	        indexLabelFontSize: 14,
	        indexLabel: "{label} - {y}",
	        dataPoints: chartData
	      }]
	    });
	
	    chart.render();
	  }
} //commenter la création du graphique et modifier à votre choix les éléments paramétrables

// kujuj() rajoute "uj" à chaque token ------------------------------------------------
function kujuj() {
	if (xx {
        document.gxx xx !";
      } else {
      	alert("c'est une plaisanterie !");
      	let kujujTokens = global_var_tokens.map(token => xx + "uj");
		let kujujText = xx;
		document.getExx;
	}
}

// créez une nouvelle fonction à appliquer sur le texte chargé, ainsi que son bouton correspondant qui devra s'afficher entre les boutons "GREP" et "concordancier" de la page web
// exemples : compter les nombres de caractères du texte, afficher un autre type de graphe, faire ressortir en output tous les mots qui commencent avec une majuscule...
// NB j'utiliserai le fichier essai.txt (disponible sur icampus) pour tester vos fonctionnalités (boutons). 
//Vous disposez également d'une série de captures d'écran qui montrent les résultats des différentes fonctionnalités (dossier boutons sur iCampus)  