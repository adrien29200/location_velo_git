class Marqueur {
    tableauMarker = [];
    constructor(station, map, index, response) { //station est la réponse de la position et map est la carte sur laquelle mettre le marqueur
        this.station = station;
        this.map = map;
        this.index = index;
        this.response = response;
        this.tableauMarker = [];
        this.tableauMarkerIndex = [];
        this.dureeTimer = 10;
        this.nom;
        this.prenom;
        this.infoReservation;
        this.emptyIcon();
        this.lowIcon();
        this.mediumIcon();
        this.hightIcon();
        this.fullIcon();
        this.reservedIcon();
        this.currentIcon();
        this.ajoutMarker();
        this.retourSurPage();
    }

    ajoutMarker() {
        L.marker(this.station.position, {icon: this.trueIcon}).addTo(this.map).on('click', (event) => {
            this.afficheInfo();
            this.nom = document.getElementById('nom').value;
            this.prenom = document.getElementById('prenom').value;
            this.tableauMarkerIndex.push(this);
            // console.log(this.tableauMarkerIndex);
            let btnReservation = document.getElementById('btnReservation')
            btnReservation.addEventListener('click', (e) => {   
                if(this.station.available_bikes > 0 && this.nom.length > 1 && this.prenom.length > 1 && mySignature.count > 40) {
                    e.preventDefault();
                    let myReservation = new Reservation();
                    this.marker = event.target;
                    this.marker.bindPopup("<b>Marqueur réservé!</b>").openPopup();
                    this.marker.setIcon(this.reservedIcon);
                    controller.ajouterTableau(this.index); //ajoute l'index du marqueur dans tableauMarker
                    this.remplacementMarker();
                    sessionStorage.setItem('bookedMarker', JSON.stringify(controller.tableauMarker));
                    sessionStorage.setItem('stationAdress', this.station.address);  
                    this.infoReservation = document.getElementById('info-reservation');
                    this.infoReservation.innerHTML = 'votre réservation au nom de ' + this.nom + ' ' + this.prenom + ' à la station ' + this.station.address + ' sera supprimée dans';
                    sessionStorage.setItem('phrase', this.infoReservation.innerHTML);
                    
                } else if(this.station.available_bikes == 0) {
                    alert("Cette station est vide");        
                } else if(this.nom.length < 1 || this.prenom.length < 1) {
                    alert("Vérifiez les champs NOM et PRENOM")
                } else if(mySignature.count <= 50){
                    alert("Votre signature est trop courte. Merci de la compléter ");
                }
                
            })
        }); //ajout des marqueurs sur la carte            
    }

    remplacementMarker() {
        let ArrayPreviousMarker = JSON.parse(sessionStorage.getItem('bookedMarker'));
        
        if(sessionStorage.getItem('oldMarker') != "null" && ArrayPreviousMarker.length <= 1) { //OldMarker = marker en réservation mais page raffraichie
            console.log('ok');
            let arrayOldMarker = JSON.parse(sessionStorage.getItem('oldMarker'));
            let oldMarker = arrayOldMarker[arrayOldMarker.length - 1];
            let positionOldMarker = this.response[oldMarker].position;
            L.marker(positionOldMarker).setIcon(this.trueIcon);
        }

        if(ArrayPreviousMarker != null && ArrayPreviousMarker.length > 0) { //s'il y a un ancien marker, le supprimer et le rajouter avec trueicon
            console.log(ArrayPreviousMarker);
            console.log("ok1");
            let previousMarker = ArrayPreviousMarker[ArrayPreviousMarker.length - 1];
            console.log(previousMarker);
            let positionMarker = this.response[previousMarker].position;
            L.marker(positionMarker).setIcon(this.trueIcon);
        } else {
            console.log("pas d'ancien marqueur ou OldMarker");
        }
        // L.marker.clearLayers();
    }

    retourSurPage() {
        sessionStorage.setItem('oldMarker', sessionStorage.getItem('bookedMarker'));
        if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000 && sessionStorage.getItem('oldMarker') != null) {
            controller.counter();
            let ArrayPreviousMarker = JSON.parse(sessionStorage.getItem('bookedMarker'));
            let previousMarker = ArrayPreviousMarker[ArrayPreviousMarker.length - 1];
            let positionMarker = this.response[previousMarker].position;
            L.marker([positionMarker.lat, positionMarker.lng], {icon: this.reservedIcon}).addTo(this.map);
        } else {
            console.log("pas d'ancienne réservation pour afficher marker noir");
        }            
    }

    afficheInfo() { 
        document.getElementById('infos').style.display = 'flex';

        if (this.station.status == "OPEN") {
            document.getElementById('statut').innerHTML = 'Cette station est ouverte';
        } else {
            document.getElementById('statut').innerHTML = 'Cette station est fermée';
        }
        
        document.getElementById('adresse').innerHTML = 'Adresse: ' + this.station.address.toLowerCase();
        document.getElementById('veloDispo').innerHTML = 'Nombre de vélos disponibles: ' + this.station.available_bikes;
        document.getElementById('placeDispo').innerHTML = 'Nombre de places disponibles: ' + this.station.available_bike_stands;
    }

    emptyIcon() {
        this.emptyIcon = L.icon({
            iconUrl: 'images/marker.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    lowIcon() {
        this.lowIcon = L.icon({
            iconUrl: 'images/markerLow.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    mediumIcon() {
        this.mediumIcon = L.icon({
            iconUrl: 'images/markerMedium.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    hightIcon() {
        this.hightIcon = L.icon({
            iconUrl: 'images/markerHight.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    fullIcon() {
        this.fullIcon = L.icon({
            iconUrl: 'images/markerFull.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    reservedIcon() {
        this.reservedIcon = L.icon({
            iconUrl: 'images/markerReservation.png',
            iconSize: [45, 45],
            iconAnchor: [0, 45],
            popupAnchor: [22, -45]
        });
    }

    currentIcon() {
        if (this.station.available_bikes == 0) {
            this.trueIcon = this.emptyIcon;
        } else if (this.station.available_bikes > 0 && this.station.available_bikes < 4) {
            this.trueIcon = this.lowIcon;
        } else if (this.station.available_bikes > 3 && this.station.available_bikes < 8) {
            this.trueIcon = this.mediumIcon;
        } else if (this.station.available_bikes > 7 && this.station.available_bike_stands != 0) {
            this.trueIcon = this.hightIcon;
        } else if (this.station.available_bike_stands == 0) {
            this.trueIcon = this.fullIcon;
        }
    }
}