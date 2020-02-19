class Controleur {
    constructor() {
        this.reservation();
        this.retourSurPage();
        this.duree = 10;
        this.tableauMarker = [];
    }

    reservation() {
        let btnReservation = document.getElementById('btnReservation')
        btnReservation.addEventListener('click', (e) => {
            // console.log(this.station.available_bikes);
            let myReservation = new Reservation();
            sessionStorage.setItem('timer', Date.now());
            this.counter();
        })
    }

    ajouterTableau(index) { //sert dans la classe marqueur
        this.tableauMarker.push(index);
    }

    retourSurPage() {
        window.onload = () => {
            if(sessionStorage.getItem('timer') && sessionStorage.getItem('oldMarker') != null) {
                if(sessionStorage.getItem('timer') / 1000 + this.duree * 60 > Date.now() / 1000) {
                    this.counter();
                }
            } else {
                console.log("pas d'ancienne réservation pour afficher un compteur");
            }    
            
        } 
    }

    counter() {
        clearInterval(this.interval);
        let minutes;
        let secondes;
        let dateFin = sessionStorage.getItem('timer') / 1000 + this.duree * 60;
        let count = dateFin - (Date.now() /1000);

        let convert = (s) => {
            minutes = Math.floor(s / 60) ;
            secondes = Math.floor(s % 60);
            return minutes + ':' + secondes;
        }

        this.interval = setInterval(() => {
            count--;
            if(count >= 0) {
                document.getElementById('timer').innerHTML = convert(count);
            } 
        }, 1000);     
    }

}