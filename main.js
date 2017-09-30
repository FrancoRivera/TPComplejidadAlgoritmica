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
console.log(square.area);



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
        this.LAST_PLAY = []
        this.MY_PLAYS = []
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
        var color_tablero = true;
        this.CANVAS.height = this.GAME_HEIGHT;
        this.CANVAS.width = this.GAME_WIDTH;
        this.CTX.fillStyle = 'green';
        this.CTX.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        for (var i = this.SQUARES - 1; i >= 0; i--) {
            for (var j = this.SQUARES - 1; j >= 0; j--) {
                color_tablero ? this.CTX.fillStyle = 'white' : this.CTX.fillStyle = 'red';
                color_tablero = this.toggleBoolean(color_tablero);
                this.CTX.fillRect(i * this.SIZE_SQUARE, j * this.SIZE_SQUARE, this.SIZE_SQUARE, this.SIZE_SQUARE);
                this.MATRIZ[j][i] = 0;
            }
            if (color_tablero) color_tablero = false; //quitar estas dos lineas si es impar tu SQUARES
            else color_tablero = true;
        }

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
            } else {
                this.MATRIZ[y][x] = 3; //negras //cambia en la matriz
                this.CTX.fillStyle = "yellow"; //fondo_negas
                imprime = this.ASSET_BLACK_PATH;
                this.isMyTurn = true;
                this.CTX.drawImage(this.ASSET_BLACK_PATH, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
                this.AISCORE = this.AISCORE + 10;
                $("#puntaje_negras").html(this.AISCORE)
            }
            this.CTX.fillRect(posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
            this.CTX.drawImage(imprime, posx, posy, this.SIZE_SQUARE, this.SIZE_SQUARE);
            this.greyOut(posx, posy);
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
        this.LAST_PLAY = [mayor_y, mayor_x]
        this.drawSquare(mayor_y, mayor_x)
    }


    runGame(e) {
        var rect = this.CANVAS.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        x = parseInt(x / this.SIZE_SQUARE);
        y = parseInt(y / this.SIZE_SQUARE);
        if(this.drawSquare(x, y)){
            this.MY_PLAYS.push([x,y])   
            this.AI()
        }
        else{ // Bajarle puntuiacion si se equivoca
            this.mySCORE = this.mySCORE-5;
            this.FAILS = this.FAILS + 1;
            console.log(this.FAILS);
            $("#puntaje_blancas").html(this.mySCORE)
        }
        if (this.TIME.innerHTML == 30) {
            this.isMyTurn = false;
            this.TIME.innerHTML = 0;
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


    result() {

        if (this.quedanMovimientos()==false && this.AISCORE < this.mySCORE) { alert("Ganaste"); location.reload();}
        if (this.quedanMovimientos()==false && this.AISCORE == this.mySCORE) { alert("Empate");location.reload();}
        if ((this.quedanMovimientos()==false && this.AISCORE > this.mySCORE) || this.FAILS >=3  ){alert("Perdiste");location.reload();}
    }
    

}

var juego = new game(400,400,8);
$(document).ready(function() { 
    juego.loadGame();

})
$(document.getElementById('myCanvas')).click(function(e) {
    $(juego.UNDO).removeAttr("disabled")
    juego.runGame(e);
    juego.result();
    window.setInterval(function()   {
            juego.TIME.innerHTML = parseFloat(juego.TIME.innerHTML)+1;
            }, 1000)

})
$(juego.UNDO).click(function(){
    juego.isMyTurn = true;
})





