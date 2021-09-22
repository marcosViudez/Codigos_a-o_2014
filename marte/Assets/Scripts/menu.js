#pragma strict

public var menuAspecto:GUISkin;
public var imagenFondo:Texture;

function OnGUI () 
{
	// aspecto de botones y textos
	GUI.skin = menuAspecto;
	
	// fondo de menu juego
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),imagenFondo,1,false);
	
	// titulo del juego
	GUI.Label(Rect((Screen.width/2)-(357-(1900/Screen.width)),50,600,200),"Perdidos en Vega");
	GUI.TextArea(Rect(0,Screen.height-60,1000,30),"Teclas movimiento teclas W,A,S,D -- agacharse: tecla C -- disparar: boton izquierdoRaton");
	GUI.TextArea(Rect(0,Screen.height-30,1000,30),"Utiliza los tanques de oxigeno azules para recuperate y repara la nave con las herramientas y combustible esparcidos por el planeta");
	// botones del juego, jugar y salir
	if (GUI.Button(Rect((Screen.width/2)-50,Screen.height/2,100,50),"Jugar"))
	{
		// nos carga el primer nivel del juego
		Application.LoadLevel(1); 
		
		//reinicia los valores de vida y oxigeno
		var vidaStart:vida = GetComponent("vida");
		vidaStart.vida=124;
		vidaStart.oxigeno=124;
		var saludSoldado:health = GetComponent("health");
		saludSoldado.health=124;
		
	}
	
	if (GUI.Button(Rect((Screen.width/2)-50,(Screen.height/2)+100,100,50),"Salir"))
	{
		// sale del juego 
		Application.Quit();
	}
}