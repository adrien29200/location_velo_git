class Controleur {
    constructor() {
        this.annulation();
        this.duree = 10;
        this.tableauMarker = [];
    }

    annulation() {
        let btnAnnulation = document.getElementById('btnAnnulation');
        btnAnnulation.addEventListener('click', () => {
            sessionStorage.clear();
            clearInterval(this.interval);
        })
    }

    ajouterTableau(index) { //sert dans la classe marqueur
        this.tableauMarker.push(index);
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