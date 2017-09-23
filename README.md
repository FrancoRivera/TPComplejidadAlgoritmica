# TPComplegidadAlgoritmica

### Curso: Complejidad Algoritmica

### Profesor: Wilder Namay

### Entrega: Semana 7


## Task:

1. Descripcion del Problema:

En 1848 el ajedrecista alemán Max Bezzel en 1848 propuso el juego de las 8 reinas el cual consiste en poner sobre un tablero de ajedrez ocho reinas sin que estas se amenacen entre sí. Por definición una reina amenaza a aquellas piezas que se encuentren en su misma fila, columna o diagonal. 

Una casa de software, especializada en juegos, conocedora de sus habilidades de programación le ha solicitado implementar una variante de este juego el cual  consiste en implementar una aplicación que permita a un jugador humano enfrentarse a una computadora, colocando cada quien una reina a la vez (de manera alternada). Por lo tanto, si el humano es quien inicia el juego la computadora coloca la segunda, la tercera el humano la cuarta la computadora y así sucesivamente.


2. La solución debe implementarse tomando en cuenta las siguientes restricciones:
 * Utilizar las técnicas de programación y algoritmos trabajados en clase.
 *	Utilizar como  prototipos el juego publicados en el aula virtual (Unidad 2).
 *	A su turno y en una jugada correcta, el jugador gana 10 puntos. Teóricamente si todas las jugadas y posiciones son correctas cada jugador debe tener  un máximo de 40 puntos declarándose un empate. 
 *	Si en su turno el jugador coloca a la reina en una posición incorrecta, pierde 5 puntos.
 *	El juego termina cuando:
 	* Alguno de los jugadores comete tres errores consecutivos en su jugada.
	* Alguno de los jugadores ha alcanzado el puntaje más alto y ya no es posible hacer otra jugada (movimiento) correcto.
	* Si ambos jugadores no pudieron realizar jugada en tres turnos consecutivos. En este caso se declara empate o ganador según la cantidad de puntos acumulado.

* Cada Jugador a su turno:
	*	Puede deshacer la jugada anterior de su contrincante a fin de asegurar su siguiente movimiento. Solo se permite deshacer una sola jugada por turno.
	*	Tiene un máximo de 30 segundos para hacer una jugada. Agotado el tiempo el turno pasa al contrincante.

## Rubrica
| Criterio | Puntaje | Sobresaliente | Estado |
|-----|----|-----|--------|
|**Tipos de datos abstractos**| *3ptos* |Utiliza tipos de datos abstractos que de manera preliminar ha identificado como parte de su solución| Pendiente  ![Pendiente][i_Pendiente] 
|	**Prototipo del juegos**| *5ptos* | Implementa una versión preliminar básica de la aplicación final usando como base el proyecto  y mostrando los elementos principales de la aplicación| Pendiente  ![Pendiente][i_Pendiente] 
|**Espacios de búsqueda**| *3ptos* | Implementa mecanismo de espacios de búsqueda identificados en su solución| Pendiente  ![Pendiente][i_Pendiente] 
|**Búsqueda/Recorrido**|*5 ptos* |  Implementa algoritmos de búsqueda de manera eficiente| Pendiente  ![Pendiente][i_Pendiente] 
|**Restricciones del Juego** | *7ptos* |  Implemente las restricciones de termino del Juego y de cada jugada| Pendiente  ![Pendiente][i_Pendiente] 

 
 




[i_Listo]: https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/20px-Green_check.svg.png 

[i_Pendiente]: https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/20px-Red_x.svg.png

[i_Trabajando]: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pictogram_voting_wait.svg/20px-Pictogram_voting_wait.svg.png

