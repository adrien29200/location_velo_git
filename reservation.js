class Reservation {
    constructor() {
        this.eventSubmit();
        this.infoReservation;
        this.nom;
        this.prenom;
        this.etatBarre; 
        this.stationAdress;
    }

    eventSubmit() { //infos storage
        this.infoReservation = document.getElementById('info-reservation');
        this.nom = document.getElementById('nom').value;
        this.prenom = document.getElementById('prenom').value;
        this.etatBarre = document.getElementById('barre-reservation').style.display = 'flex';
        this.stationAdress = sessionStorage.getItem('stationAdress');
        
        this.infoReservation.innerHTML = 'votre réservation au nom de ' + this.nom + ' ' + this.prenom + ' à la station ' + marqueur.adress() + ' sera supprimée dans'; //phrase avec nom et prénom
        localStorage.setItem('nom', this.nom);         //ajoute le nouveau nom et prénom dans le localstorage
        localStorage.setItem('prenom', this.prenom);
        sessionStorage.setItem('barre de reservation', this.etatBarre);
        sessionStorage.setItem('phrase', this.infoReservation.innerHTML);
    }
    
}