// S2_8Reinas.cpp : main project file.

#include "stdafx.h"
#include <stdio.h>
#include <math.h>
#include <conio.h>
#define MAX 8

bool sePuede(int* tab, int filas, int ncol)
{
	int nfil = filas;
	for (int fil=0;fil<filas;fil++)
	{
		int col = tab[fil];
		if (col==ncol) // 2 reinas en la misma columna
			return false;
		if ( abs(fil-nfil)==abs(col-ncol) ) // 2 reinas en diagonal
			return false;
	}
	return true;
}

void imprimeTablero(int* tab)
{
	printf("-");
	for (int i=0;i<MAX;i++) 
		printf("----");
	printf("\n");
	for (int i=0;i<MAX;i++)
	{
		printf("  |");
		for (int j=0;j<tab[i];j++)		
			printf(" |  ");		
		if (tab[i]!=-1)
		    printf("X  |");
		for (int j=tab[i]+1;j<MAX;j++)
			printf(" |");
		printf("\n");
		printf("-");
		for (int j=0;j<MAX;j++) 
			printf("--");
		printf("\n");
	}
	printf("\n");
	//getch();
}

void OchoReinas(int* tab, int fila)
{
	//imprimeTablero(tab);
	if (fila >= MAX) // CASO BASE
	{
		imprimeTablero(tab);
		return;
	}
	else
	{
		for (int i=0;i<MAX;i++) // itera posibilidades (posibles columnas)
		{
			if (sePuede(tab,fila,i))
			{
				tab[fila] = i; // paso avance
				OchoReinas(tab,fila+1); // paso recursivo
				tab[fila] = -1; // paso de retroceso o Backtrack
			}
		}
	}
}

bool soloUnaSolOchoReinas(int* tab, int fila)
{
	//imprimeTablero(tab);
	if (fila >= MAX) // CASO BASE
	{		
		return true;
	}
	else
	{
		for (int i=0;i<MAX;i++) // itera posibilidades (posibles columnas)
		{
			if (sePuede(tab,fila,i))
			{
				tab[fila] = i; // paso avance
				if (soloUnaSolOchoReinas(tab,fila+1) == true) 
					return true; // paso recursivo
				tab[fila] = -1; // paso de retroceso o Backtrack
			}
		}
	}
	return false;
}


int main()
{
	
	int tab[MAX];
	for (int i=0;i<MAX;i++)
		tab[i]=-1;
	OchoReinas(tab,0);    
	//soloUnaSolOchoReinas(tab,0);
	imprimeTablero(tab);
	getch();
    return 0;
}
