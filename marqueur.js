class Marqueur {
    constructor(station, map, index, response) {
        this.station = station;
        this.map = map;
        this.index = index;
        this.response = response;
        this.dureeTimer = 20; // a changer aussi dans map et controleur.js
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
        this.leafletMarker = L.marker(this.station.position, { icon: this.trueIcon }); //marker leaflet
        this.retourSurPage();
        this.leafletMarker.addTo(this.map).on('click', () => {
            document.getElementById('signature').style.display = 'none';
            document.getElementById('champs').style.display = 'block';
            this.afficheInfo();
            let btnSign = document.getElementById('btnSign');
            btnSign.addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById('champs').style.display = 'none';
                document.getElementById('signature').style.display = 'block';
                let btnReservation = document.getElementById('btnReservation');
                btnReservation.addEventListener('click', (e) => {
                    e.preventDefault();                   
                    this.reservation();
                })
            })       
        })
    }

    reservation() {
        this.nom = document.getElementById('nom').value;
        this.prenom = document.getElementById('prenom').value;
        if(this.station.available_bikes > 0 && this.nom.length > 1 && this.prenom.length > 1 && mySignature.count > 50) {
            this.replaceIcon();
            this.leafletMarker.setIcon(this.reservedIcon);
            controller.ajouterTableau(this.leafletMarker);
            sessionStorage.setItem('trueIcon', this.trueIcon.options.iconUrl); //url d'image
            let myReservation = new Reservation();
            this.marker = event.target;
            this.infoReservation = document.getElementById('info-reservation');
            this.infoReservation.innerHTML = 'votre réservation au nom de ' + this.nom + ' ' + this.prenom + ' à la station ' + this.station.address.toLowerCase() + ' sera supprimée dans';
            sessionStorage.setItem('phrase', this.infoReservation.innerHTML);     
        } else if(this.station.available_bikes == 0) {
            alert("Cette station est vide");        
            controller.annulation();
        } else if(this.nom.length <= 1 || this.prenom.length <= 1) {
            alert("Vérifiez les champs NOM et PRENOM")
        } else if(mySignature.count <= 50){
            alert("Votre signature est trop courte. Merci de la compléter ");
        }
    }

    retourSurPage() {
        if(controller.oldMarker != null && controller.oldMarker == this.leafletMarker._leaflet_id) { //si ancien marker
            if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000) {
                this.leafletMarker.setIcon(this.reservedIcon);
                controller.ajouterTableau(this.leafletMarker);
            }
        }

        if(sessionStorage.getItem('timer') / 1000 + this.dureeTimer * 60 > Date.now() / 1000 && controller.oldMarker != null) {
            controller.counter();
        }         
    }

    replaceIcon() {
        if (controller.tableauMarker[controller.tableauMarker.length - 1] != null) { //s'il y a déja eu réservation
            let vraieIcon = sessionStorage.getItem('trueIcon');
            controller.tableauMarker[controller.tableauMarker.length - 1].setIcon(L.icon({
                iconUrl: vraieIcon,
                iconSize: [45, 45],
                iconAnchor: [0, 45],
                popupAnchor: [22, -45]
                })
            );
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