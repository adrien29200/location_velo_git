class Controleur {
    constructor() {
        this.duree = 20; // a changer aussi dans map et marqueur.js
        this.tableauMarker = []; //contient le marker leaflet
        this.tableauOldMarkers = []; // contient l'index leaflet du marker
        this.oldMarker;
        this.retourSurPage();
        this.eventAnnulation();
    }

    eventAnnulation() {
        let btnAnnulation = document.getElementById('btnAnnulation');
        btnAnnulation.addEventListener('click', () => {
            this.annulation();
        })

    }

    retourSurPage() {
        if(sessionStorage.getItem('bookedMarker') != null) {
            let bookedMarker = sessionStorage.getItem('bookedMarker').split(",");
            if (bookedMarker != null) {
                this.oldMarker = bookedMarker[bookedMarker.length - 1];
            }
        }     
    }

    ajouterTableau(index) { //sert dans la classe marqueur
        this.tableauMarker.push(index); //sert à garder en mémoire le dernier marker réservé pour pouvoir le modifier en trueIcon
        console.log(this.tableauMarker);
        this.tableauOldMarkers.push(index._leaflet_id);
        console.log(this.tableauOldMarkers);
        sessionStorage.setItem('bookedMarker', this.tableauOldMarkers); //sert dans retourSurPage()
    }

    counter() {
        clearInterval(this.interval);
        let minutes;
        let secondes;
        let dateFin = sessionStorage.getItem('timer') / 1000 + this.duree * 60;
        let count = dateFin - (Date.now() / 1000);

        let convert = (s) => {
            minutes = Math.floor(s / 60);
            secondes = Math.floor(s % 60);
            return minutes + ':' + secondes;
        }

        this.interval = setInterval(() => {
            count--;
            if(count >= 0) {
                document.getElementById('timer').innerHTML = convert(count);
            } else {
                this.annulation();
            }
        }, 1000); 
    }

    annulation() {
        sessionStorage.clear();
        document.getElementById("infos").style.display = 'none';
        document.getElementById("barre-reservation").style.display = 'none';
        clearInterval(this.interval);
        document.location.reload(true);
    }

}