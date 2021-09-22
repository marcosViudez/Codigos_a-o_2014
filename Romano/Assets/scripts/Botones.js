#pragma strict

function Start () 
{

}

function Update () 
{
	Cursor.visible = true;     // mostrar cursor
	
	if(Input.GetKey("escape"))
	{
		Application.Quit();
	}
}

function OnMouseEnter()
{
	GetComponent.<Renderer>().material.color = Color.yellow;
}

function OnMouseExit()
{
	GetComponent.<Renderer>().material.color = Color.white;
}

function OnMouseUp()
{
	if(gameObject.tag == "jugar")
	{
		// print("jugar");
		Application.LoadLevel("nivel1");
		
		// reseteamos todos los valores de los jugadores a su estado inicial
		var soldadoMuerto:soldado = GetComponent("soldado");
		soldadoMuerto.muerto = false;
		
		var espartanoVida:juegoProp = GetComponent("juegoProp");
		espartanoVida.vida = 100;
		
		var espartanoMuerto:espartano = GetComponent("espartano");
		espartanoMuerto.muertoEspartano = false;
		
		var arqueroMuerto:enemigo = GetComponent("enemigo");
		arqueroMuerto.destruirArquero = false;
		
		var puenteCaido:puente = GetComponent("puente");
		puenteCaido.puenteDerribado = false;
		
		var monstruoMuerto:monstruo = GetComponent("monstruo");
		monstruoMuerto.monstruoMuerto = false;
	}	
	
	else if(gameObject.tag == "instrucciones")
	{
		// print("instrucciones");
		Application.LoadLevel("instrucciones");
	}
}