#pragma strict

// maxima capacidad de los tanques de oxigeno de la nave
static public var capacidadTanque:float=500.0;

// los tanques estan agotados
	if(capacidadTanque<=1)
	{
		GameObject.FindWithTag("luzOxigeno").GetComponent.<Light>().intensity=0.0;
	}