function demanderNom() {
    let nom = prompt("Quel est votre nom ?");
    if (nom) {
        alert("Bonjour, " + nom + " !");
    } else {
        alert("Vous n'avez pas entré de nom.");
    }
}

function afficherAide() {
    alert("Bienvenue sur mon site !");
}