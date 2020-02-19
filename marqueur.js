class Marqueur {
    tableauMarker = [];
    constructor(station, map, index, response) { //station est la réponse de la position et map est la carte sur laquelle mettre le marqueur
        this.station = station;
        this.map = map;
        this.index = index;
        this.response = response;
        this.tableauMarker = [];
        this.dureeTimer = 10;
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
            let btnReservation = document.getElementById('btnReservation')
            btnReservation.addEventListener('click', (e) => {
                if(this.station.available_bikes > 0) {
                    e.preventDefault();
                    this.marker = event.target;
                    this.marker.setIcon(this.reservedIcon);
                    controller.ajouterTableau(this.index); //ajoute l'index du marqueur dans tableauMarker
                    sessionStorage.setItem('bookedMarker', JSON.stringify(controller.tableauMarker));
                    sessionStorage.setItem('stationAdress', this.station.address); //sert pour la classe reservation
                    this.remplacementMarker();
                } else if (this.station.available_bikes == 0) {
                    alert("Cette station est vide");
                    
                }
                
            })
        }); //ajout des marqueurs sur la carte            
    }

    remplacementMarker() {
        if(sessionStorage.getItem('oldMarker')) { //OldMarker = marker en réservation mais page raffraichie
            let arrayOldMarker = JSON.parse(sessionStorage.getItem('oldMarker'));
            let oldMarker = arrayOldMarker[arrayOldMarker.length - 1];
            let positionOldMarker = this.response[oldMarker].position;
            this.map.removeLayer(L.marker([positionOldMarker.lat, positionOldMarker.lng], {icon: this.reservedIcon})); //[positionOldMarker.lat, positionOldMarker.lng]
            L.marker([positionOldMarker.lat, positionOldMarker.lng], {icon: this.trueIcon}).addTo(this.map);
            console.log(this.trueIcon);
            // e.target.setIcon(selectedIcon);
        }
        let ArrayPreviousMarker = JSON.parse(sessionStorage.getItem('bookedMarker'));
        if(ArrayPreviousMarker.length > 2) { //s'il y a un ancien marker, le supprimer et le rajouter avec trueicon
            let previousMarker = ArrayPreviousMarker[ArrayPreviousMarker.length - 2];
            let positionMarker = this.response[previousMarker].position;
            this.map.removeLayer(positionMarker);
            L.marker([positionMarker.lat, positionMarker.lng], {icon: this.trueIcon}).addTo(this.map);
        } else if(ArrayPreviousMarker.length == 2) {
            let previousMarker = ArrayPreviousMarker[ArrayPreviousMarker.length - 1];
            let positionMarker = this.response[previousMarker].position;
            this.map.removeLayer(positionMarker);
            L.marker([positionMarker.lat, positionMarker.lng], {icon: this.trueIcon}).addTo(this.map);
        } else {
            console.log("pas d'ancien marqueur ou OldMarker");
        }
    }

    retourSurPage() {
        if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000 && sessionStorage.getItem('oldMarker') != null) {
            sessionStorage.setItem('oldMarker', sessionStorage.getItem('bookedMarker'));
            let ArrayPreviousMarker = JSON.parse(sessionStorage.getItem('bookedMarker'));
            let previousMarker = ArrayPreviousMarker[ArrayPreviousMarker.length - 1];
            let positionMarker = this.response[previousMarker].position;
            L.marker([positionMarker.lat, positionMarker.lng], {icon: this.reservedIcon}).addTo(this.map);
        } else {
            console.log("pas d'ancienne réservation pour afficher marker noir");
        }            
    }

    afficheInfo() { 
        document.getElementById('infos').style.display = 'block';

        if (this.station.status == "OPEN") {
            document.getElementById('statut').innerHTML = 'Cette station est ouverte';
        } else {
            document.getElementById('statut').innerHTML = 'Cette station est fermée';
        }
        document.getElementById('adresse').innerHTML = 'Adresse: ' + this.station.address;
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