#pragma strict

public var texturaVacias:Texture;
public var texturaVidaLlena:Texture;
public var texturaOxigenoLleno:Texture;
public var aspectoLetras:GUISkin;

static public var vida:float=124.0;
static public var oxigeno:float=124.0;
static public var infoJuego:String="";

function Update()
{
	// limites de las barras de energia
	if(vida<0.0){vida=0.0;}
	if(vida>124.0){vida=124.0;}	
	if(oxigeno<0.0){oxigeno=0.0;}
	if(oxigeno>124.0){oxigeno=124.0;}
}

function OnGUI () 
{
	// aspecto de las letras de texto
	GUI.skin = aspectoLetras;
	
	// me dibuja las barras de energia 
	GUI.DrawTexture(Rect(10,10,250,50),texturaVacias,1,false);
	GUI.DrawTexture(Rect(126,14,vida,9),texturaVidaLlena,1,false);
	GUI.DrawTexture(Rect(126,30,oxigeno,9),texturaOxigenoLleno,1,false);
	
	// informacion de garrafas y combustible recogidos
	var infoObjetos:propJuego = GetComponent("propJuego");
	GUI.Label(Rect(Screen.width-400,0,400,200),"Combustible  x" + (infoObjetos.garrafasCombustible).ToString());
	GUI.Label(Rect(Screen.width-400,30,400,200),"Herramientas  x" + (infoObjetos.herramientas).ToString());
	
	// informacion y mensajes mostrados en pantalla
	GUI.Label(Rect(100,Screen.height/2,600,200),infoJuego);
}