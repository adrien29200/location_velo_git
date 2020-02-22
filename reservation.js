class Reservation {
    constructor() {
        this.eventSubmit();
        this.nom;
        this.prenom;
        this.etatBarre; 
    }

    eventSubmit() { 
        sessionStorage.setItem('timer', Date.now()); 
        controller.counter();
        this.nom = document.getElementById('nom').value;
        this.prenom = document.getElementById('prenom').value;
        this.etatBarre = document.getElementById('barre-reservation').style.display = 'flex';  
        localStorage.setItem('nom', this.nom);         //ajoute le nouveau nom et prénom dans le localstorage
        localStorage.setItem('prenom', this.prenom);
        sessionStorage.setItem('barre de reservation', this.etatBarre);
    }
    
}