class Map {
    constructor() {
        this.ville = [47.2186371, -1.5541362];
        this.zoom = 12;
        this.dureeTimer = 10;
        this.myMap();
        this.previousData();
    }

    myMap() {
        this.map = L.map('map1').setView(this.ville, this.zoom); //création de la carte
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //couche de tuile mapbox streets
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.addMarqueur();
    }

    addMarqueur() {
        let objectCarte = this;
        let request = new XMLHttpRequest(); //requete au serveur API
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                objectCarte.response = JSON.parse(this.responseText); //réponse
                // console.log(objectCarte.response);
                for (let i=0; i<objectCarte.response.length; i++) { //boucle pour extraire chaque marqueur
                    let marqueur = new Marqueur(objectCarte.response[i], objectCarte.map, i, objectCarte.response); //fait appel à l'objet marqueur
                }
            }
        };
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=3d32cdc193ddeb74066cbaf5979a17ed1a0664b6")
        request.send();
    }

    previousData() {
        let previousName = localStorage.getItem('nom');
        document.getElementById("nom").value = previousName; //sortie du nom + prénom du localstorage
        let previousSurname = localStorage.getItem('prenom');
        document.getElementById("prenom").value = previousSurname;

        let barreReservation = document.getElementById('barre-reservation');// sortie de la barre + phrase de sessionstorage
        if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000) {
            barreReservation.style.display = sessionStorage.getItem('barre de reservation'); 
        } 
        document.getElementById('info-reservation').innerHTML = sessionStorage.getItem('phrase');
    }

}