class Slider {
    constructor() {
        this.i = 0;
        this.images = [['images/img1.jpg', "Faites du vélo votre moyen de transport n°1"], 
                      ['images/img2.jpg', "Cliquez sur le marqueur d'une station de vélos"], 
                      ['images/img3.jpg', "Rentrez vos informations"], 
                      ['images/img4.jpg', "Réservez en ligne votre vélo"], 
                      ['images/img5.jpg', "Votre réservation sera active 20 minutes"]];
        this.time = 5000;
        this.timeOut;
        this.interval();
        this.changeImg();
        this.eventListenner();
        this.pause = 0;
    }

    changeImg(sens) { 
        clearInterval(this.timeOut) 
        if(sens == -1 && this.i == 0) {
            this.i = this.images.length - 1;
        } else if ((this.i <= this.images.length - 1 && sens == -1) || (this.i < this.images.length - 1 && sens >= 0)){
            this.i += sens;
        } else {
            this.i = 0;
        }
        document.slide.src = this.images[this.i][0];       //envoie l'image
        document.getElementById('textImg').innerHTML = '';   //remise à zéro
        let titreSlide = document.createElement('h2');       //mise en h2 des textes
        titreSlide.innerHTML = this.images[this.i][1];       //envoi des textes correspondants aux images
        document.getElementById('textImg').appendChild(titreSlide); //h2 enfant de div textImg
        this.interval()
    }

    interval() {
        this.timeOut = setInterval(() => {
            this.changeImg(1)
        }, this.time);
    }
    
    play() {
        let image = document.getElementById('btn-pause');
        image.src = "images/pause.png";
        this.pause = 0;
    }

    eventListenner() {
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.changeImg(-1);
            this.play();
        })
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.changeImg(1);
            this.play();
        }) 

        document.getElementById('bouton-pause').addEventListener('click', () => {
            if(this.pause == 0) {
                clearInterval(this.timeOut);
                let image = document.getElementById('btn-pause');
                image.src = "images/play.png";
                this.pause = 1;
            } else {
                this.interval();
                this.play();
            }
        }) 
            
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 39) {
                this.changeImg(1);
                this.play();
            } else if (e.keyCode == 37) {
                this.changeImg(-1);
                this.play();
            }
        })        
    }
}


