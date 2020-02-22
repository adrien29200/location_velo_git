class Signature {
    constructor() {
        this.myCanvas = document.getElementById("myCanvas");
        this.context = this.myCanvas.getContext("2d");
        this.drawingSignature = false;
        this.erasingSignature = false;
        this.count = 0;
        this.increaseCount = false;
        this.eventListennerDesktop();
        this.eventListennerTactile();
    }

    eventListennerDesktop() {        
        this.myCanvas.addEventListener('mousedown', (event) => {
            this.drawingSignature = true;
            this.context.beginPath(); //crée un nouveau chemin du canvas2D
            this.context.moveTo(event.pageX - this.myCanvas.offsetLeft, event.pageY - this.myCanvas.offsetTop); //on récupère les coordonnées par rapport au coin haut gauche
            this.increaseCount = true;
        })
        
        this.myCanvas.addEventListener('mouseup', () => {
            this.drawingSignature = false;
            this.increaseCount = false;
        }) 

        this.myCanvas.addEventListener('mouseout', () => {
            this.drawingSignature = false;
            this.increaseCount = false;
        }) 

        this.myCanvas.addEventListener('mousemove', () => {
            if(this.drawingSignature) {
                this.context.strokeStyle = "black";
                this.context.lineTo(event.pageX - this.myCanvas.offsetLeft, event.pageY - this.myCanvas.offsetTop);
                this.context.stroke();
                if (this.increaseCount === true){
                    this.count++;
                } 
            }
        }) 

        document.getElementById('btnClear').addEventListener('click', () => {
            this.myCanvas.width = this.myCanvas.width; //a changer
            // this.context.clearRect(0, 0, this.myCanvas.Width, this.myCanvas.height);
            this.count = 0;
        })   
    }

    eventListennerTactile() {
        this.myCanvas.addEventListener('touchstart', (event) => {
            this.drawingSignature = true;
            this.context.beginPath(); //crée un nouveau chemin du canvas2D
            this.context.moveTo(event.pageX - this.myCanvas.offsetLeft, event.pageY - this.myCanvas.offsetTop);
            this.increaseCount = true;
        })

        this.myCanvas.addEventListener('touchend', () => {
            this.drawingSignature = false;
            this.increaseCount = false;
        })

        this.myCanvas.addEventListener('touchleave', () => {
            this.drawingSignature = false;
            this.increaseCount = false;
        })

        this.myCanvas.addEventListener('touchmove', (e) => {
            if(this.drawingSignature) {
                this.context.strokeStyle = "black";
                this.context.lineTo(event.pageX - this.myCanvas.offsetLeft, event.pageY - this.myCanvas.offsetTop);
                this.context.stroke();
                if (this.increaseCount === true){
                    this.count++;
                } 
            }
        }) 

        document.getElementById('btnClear').addEventListener('click', () => {
            this.myCanvas.width = this.myCanvas.width; //a changer
            // this.context.clearRect(0, 0, this.myCanvas.Width, this.myCanvas.height);
            this.count = 0;
        })   
        
    }

}
