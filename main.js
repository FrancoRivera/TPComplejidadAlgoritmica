class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

function chequearMovimientos(matrix, x, y){
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[x][i] == 1 || matrix[i][y] ) //chequea las columnas
            return false;
    }
    return true;
}
class Jugada{
    constructor(matriz, x, y){
        this.x = x;
        this.y = y;
        this.matriz = matriz;
    }
    buscar(){
        //DFS retorna un arbol de soluciones
        this.lista = []

        this.matriz[this.x][this.y] = 1
        if (this.x+1<this.matriz.length && chequearMovimientos(this.matriz, this.x+1, this.y)){
            this.lista.push(new Jugada(this.matriz, this.x+1,this.y).buscar())
        }
        if (this.x-1 > 0 && chequearMovimientos(this.matriz, this.x-1, this.y)){
            this.lista.push(new Jugada(this.matriz, this.x-1,this.y).buscar())
        }
        if (this.y+1 < this.matriz.length && chequearMovimientos(this.matriz, this.x, this.y+1)){
            this.lista.push(new Jugada(this.matriz, this.x,this.y+1).buscar())
        }
        if (this.y-1 > 0 && chequearMovimientos(this.matriz, this.x, this.y-1)){
            this.lista.push(new Jugada(this.matriz, this.x,this.y-1).buscar())
        }
        
        this.matriz[this.x][this.y]=0
        console.log(this.x + " , " + this.y)
        console.log(this.lista)
        if (this.lista == []) return this
        return this.lista
    }
}


class game {
    constructor(height,width,squares) {
        this.GAME_HEIGHT = height;
        this.GAME_WIDTH = width;
        this.SQUARES = squares;
        this.SIZE_SQUARE = this.GAME_HEIGHT/this.SQUARES;
        this.ASSET_WHITE_PATH = new Image();
        this.ASSET_BLACK_PATH = new Image();
        this.CANVAS = document.getElementById('myCanvas');
        this.CTX = this.CANVAS.getContext('2d');
        this.MATRIZ = [];
        this.isMyTurn = true;
        this.mySCORE = 0;
        this.AISCORE = 0;
        this.FAILS = 0;
        this.TIME = document.getElementById('tiempo');
        this.UNDO = document.getElementById('deshacer')
        this.THEIR_PLAYS = []
        this.MY_PLAYS = []
        this.TIMER = false;
        this.RELOAD = false;
        this.GREY = document.getElementById('grey_out')
        this.WITH_HELP = false;
        this.TIMER_ID = ""
        this.REDRAW = true
        this.MouseX = 0
        this.MouseY = 0
        this.PRINTLOOPID = ""
        this.UNDOING = false;

    }
    toggleBoolean(boolean) {
        return !boolean;
    }
    get canvas() {
        return this.CANVAS;
    }

    get time() {
        return this.TIME;
    }

    loadGame() {
        this.ASSET_WHITE_PATH.src = "assets/crown_white.png"; 
        this.ASSET_BLACK_PATH.src = "assets/crown.png";
        for (var i = 0; i < this.SQUARES; i++) {
            this.MATRIZ[i] = new Array(this.SQUARES);
        }
        this.CANVAS.height = this.GAME_HEIGHT;
        this.CANVAS.width = this.GAME_WIDTH;
        this.CTX.fillStyle = 'green';
        this.CTX.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        var color_tablero = true;
        for (var i = this.SQUARES - 1; i >= 0; i--) {
            for (var j = this.SQUARES - 1; j >= 0; j--) {
                color_tablero ? this.CTX.fillStyle = 'white' : this.CTX.fillStyle = 'red';
                color_tablero = this.toggleBoolean(color_tablero);
                this.CTX.fillRect(i * this.SIZE_SQUARE, j * this.SIZE_SQUARE, this.SIZE_SQUARE, this.SIZE_SQUARE);
                this.MATRIZ[j][i] = 0;
            }
            color_tablero = this.toggleBoolean(color_tablero); //quitar estas dos lineas si es impar tu SQUARES
        }
    var backtrack = new Jugada(this.MATRIZ, 0,0).buscar()
    }

    greyOut(x,y) {
        x = parseInt(x / this.SIZE_SQUARE);
        y = parseInt(y / this.SIZE_SQUARE);
        for (var i = 0; i < this.SQUARES; i++) {
            if (this.MATRIZ[i][x] == 0) {
                this.MATRIZ[i][x] = 5
            }
            if (this.MATRIZ[y][i] == 0) {
                this.MATRIZ[y][i] = 5
            }
        }
    //diagonales
        for (var i = 0; i < this.SQUARES; i++) {
            for (var j = 0; j < this.SQUARES; j++) {
                if (x - y == i - j || x + y == i + j)
                    if (this.MATRIZ[j][i] == 0) this.MATRIZ[j][i] = 5
            }
        }
    }

    drawSquare(x,y) {
        if (this.MATRIZ[y][x] == 0) {
            var posx = x * this.SIZE_SQUARE;
            var posy = y * this.SIZE_SQUARE;
            var imprime = "";
            if (this.isMyTurn) {
                this.MATRIZ[y][x] = 2; //blancas //cambia en la matriz
                this.CTX.fillStyle = "green"; //fondo_blancas
                imprime = this.ASSET_WHITE_PATH;
                this.isMyTurn = false;
                this.mySCORE = this.mySCORE + 10;
                $("#puntaje_blancas").html(this.mySCORE)
                  this.MY_PLAYS.push([x, y])
            } else {
                this.MATRIZ[y][x] = 3; //negras //cambia en la matriz
                this.CTX.fillStyle = "yellow"; //fondo_negas
                imprime = this.ASSET_BLACK_PATH;
                this.isMyTurn = true;
                this.CTX.drawImage(this.ASSET_BLACK_PATH, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
                this.AISCORE = this.AISCORE + 10;
                $("#puntaje_negras").html(this.AISCORE)
                this.THEIR_PLAYS.push([x, y])
            }
            //this.CTX.fillRect(posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
            this.CTX.drawImage(imprime, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
            this.greyOut(posx, posy);
            if (this.UNDOING) this.isMyTurn = false;
            return true;
        } else {
            return false
        }

    }

    countSquares(x,y) {
        var suma = 0;
        //verticales y horizontal
        for (var i = 0; i < this.SQUARES; i++) {
            if (this.MATRIZ[i][x] == 0) {
                suma += 1
            }
            if (this.MATRIZ[y][i] == 0) {
                suma += 1
            }
        }
        //diagonales
        for (var i = 0; i < this.SQUARES; i++) {
            for (var j = 0; j < this.SQUARES; j++) {
                if (x - y == i - j || x + y == i + j)
                    if (this.MATRIZ[j][i] == 0) suma += 1
        }
    }
    return suma;
    }

    AI() {
        var lista = new Array(64)
        var contador = 0
        var mayor_x = 0;
        var mayor_y = 0;
        var mayor = 0;
        for (var i = 0; i < this.SQUARES; i++) {
            for (var j = 0; j < this.SQUARES; j++) {
                lista[contador] = this.countSquares(i, j)
                contador += 1;
                var posx = j * this.SIZE_SQUARE;
                var posy = i * this.SIZE_SQUARE;
                this.CTX.font = "20px Georgia";
                this.CTX.fillStyle = 'green'
                if (mayor < this.countSquares(j, i)) {
                    mayor = this.countSquares(j, i);
                    mayor_y = j;
                    mayor_x = i;
                }
            }
        }
        this.drawSquare(mayor_y, mayor_x)
    }


    runGame(e) {
        var rect = this.CANVAS.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        x = parseInt(x / this.SIZE_SQUARE);
        y = parseInt(y / this.SIZE_SQUARE);
        this.TIME.innerHTML = 0; //reinicia countdown
        
        if(this.drawSquare(x, y)){
            if(!this.UNDOING) this.AI()
            else{
                 this.UNDOING = false
                 this.isMyTurn = true;
                 this.REDRAW = true;
            } 
               
        }
        else{ // Bajarle puntuiacion si se equivoca
            this.mySCORE = this.mySCORE-5;
            this.FAILS = this.FAILS + 1;
            $("#puntaje_blancas").html(this.mySCORE)
        }
       
    }

    quedanMovimientos() {
        for (var i = 0; i < this.SQUARES; i++) {
            for (var j = 0; j < this.SQUARES; j++) {
                if (this.MATRIZ[i][j] == 0) {
                    return true
                }
            }
        }
        return false;
    }
   printMessage(message){
        this.CTX.font ="80px sans-serif"
        if (message=="Empataste") this.CTX.font ="60px sans-serif"
        this.CTX.fillStyle = "white"
        this.CTX.fillRect(0, 20, 400,100)
        this.CTX.fillStyle = "blue"
        this.CTX.fillText(message, 70,100)
        clearInterval(this.TIMER_ID)
        clearInterval(this.PRINTLOOPID)
        this.RELOAD = true;
    }

    printLoop(){
        if (this.REDRAW){
           var color_tablero = true;
            for (var i = this.SQUARES - 1; i >= 0; i--) {
                for (var j = this.SQUARES - 1; j >= 0; j--) {
                    color_tablero ? this.CTX.fillStyle = 'white' : this.CTX.fillStyle = 'red';
                    color_tablero = this.toggleBoolean(color_tablero);
                    var posx = i * this.SIZE_SQUARE
                    var posy = j * this.SIZE_SQUARE
                    this.CTX.fillRect(posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
                    if (this.MATRIZ[j][i] == 2) // si soy yo
                         this.CTX.drawImage(this.ASSET_WHITE_PATH, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
                    if (this.MATRIZ[j][i] == 3) //enemigo
                         this.CTX.drawImage(this.ASSET_BLACK_PATH, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
                    if (this.MATRIZ[j][i]==5 && this.WITH_HELP){
                     this.CTX.fillStyle = "grey"; //fondo_negas
                     this.CTX.fillRect(i*this.SIZE_SQUARE, j*this.SIZE_SQUARE, this.SIZE_SQUARE, this.SIZE_SQUARE);
                }
                }
                color_tablero = this.toggleBoolean(color_tablero); //quitar estas dos lineas si es impar tu SQUARES
            }
             if (this.isMyTurn){
                this.CTX.drawImage(this.ASSET_WHITE_PATH,  this.MouseX, this.MouseY, this.SIZE_SQUARE, this.SIZE_SQUARE);
            }  
             else{
                this.CTX.drawImage(this.ASSET_BLACK_PATH,  this.MouseX, this.MouseY, this.SIZE_SQUARE, this.SIZE_SQUARE);
            }  
            this.REDRAW = false
        }

      
    }
    result() {
        if (this.quedanMovimientos()==false && this.AISCORE < this.mySCORE) {this.printMessage("Ganaste"); }
        if (this.quedanMovimientos()==false && this.AISCORE == this.mySCORE) { this.printMessage("Empataste");}
        if ((this.quedanMovimientos()==false && this.AISCORE > this.mySCORE) || this.FAILS >=3  ){this.printMessage("Perdiste");}
    }
    
    mostrarGreys(){
        for (var i = 0; i < this.SQUARES; i++) {
            for (var j = 0; j < this.SQUARES; j++) {
                if (this.MATRIZ[j][i]==5){
                     this.CTX.fillStyle = "grey"; //fondo_negas
                     this.CTX.fillRect(i*this.SIZE_SQUARE, j*this.SIZE_SQUARE, this.SIZE_SQUARE, this.SIZE_SQUARE);
                }
            }
        }
    }
    recalcularMatriz(){
        for(var i = 0; i < this.SQUARES; i++){
            for (var j =0; j <this.SQUARES; j++){
                if (this.MATRIZ[j][i] == 5)
                    this.MATRIZ[j][i] = 0
            }
        }
        for(var i = 0; i < this.MY_PLAYS.length; i++){
            this.greyOut(this.MY_PLAYS[i][0]*this.SIZE_SQUARE, this.MY_PLAYS[i][1]*this.SIZE_SQUARE)
        }
        for(var i = 0; i < this.THEIR_PLAYS.length; i++){
            this.greyOut(this.THEIR_PLAYS[i][0]*this.SIZE_SQUARE, this.THEIR_PLAYS[i][1]*this.SIZE_SQUARE)
        }

    }
    followMouse(x, y){
        if (!this.RELOAD){
            this.MouseX = x - $("#myCanvas").offset().left -20
            this.MouseY = y - $("#myCanvas").offset().top -20
        }
            
        }
    deshacer(){
        
        if (this.THEIR_PLAYS.length> 0){
            this.isMyTurn = false;
           var last = this.THEIR_PLAYS.pop()
            this.MATRIZ[last[1]][last[0]] = 0
            this.recalcularMatriz()
             this.REDRAW = true;
             this.UNDOING=true
        }
       
        }

}
    

var juego = new game(400,400,8);
 $("#myCanvas").mousemove(function(event){
    juego.CTX.restore()
    juego.CTX.save()
    juego.REDRAW = true;
    juego.followMouse(event.pageX, event.pageY)})


$(document).ready(function() { 
    juego.loadGame();
    juego.PRINTLOOPID = window.setInterval(function()   {
    juego.printLoop();
    }, 30)
})

$("#myCanvas").click(function(e) {
    $(juego.UNDO).removeAttr("disabled")
    juego.runGame(e);

    if(!juego.TIMER){
         juego.TIMER_ID = window.setInterval(function()   {
            juego.TIME.innerHTML = parseFloat(juego.TIME.innerHTML)+1;
             if (juego.TIME.innerHTML == 30) {
            juego.isMyTurn = false;
            juego.AI()
            juego.TIME.innerHTML = 0;
        }
            }, 1000)
         juego.TIMER = true;
    }   

    if (juego.WITH_HELP)
    juego.mostrarGreys()
    juego.result();
   if (juego.RELOAD){
    juego.RELOAD=false;
    $("#reiniciar").show()
    
   }
    
})

$(juego.UNDO).click(function(){

    juego.deshacer()
})

$(juego.GREY).click(function(){
    juego.mostrarGreys()
    juego.WITH_HELP = true;
    $(juego.GREY).attr("disabled", "disabled")
})

$("#reiniciar").click(function(){
    location.reload();
})




