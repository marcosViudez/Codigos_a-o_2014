#pragma strict

public var letrasFinAspecto:GUISkin;
public var sonidoMensajes:AudioClip;
public var sonidoDespegue:AudioClip;

private var texto:String;
private var tiempo:int;
private var sms:int=0;

function Start()
{	
	// inicia el sonido de despegue una vez
	GetComponent.<AudioSource>().PlayOneShot(sonidoDespegue);
}

function Update()
{
	tiempo=tiempo+1;
	
	if (tiempo<10 && sms==0)
	{
		sms=1;
		GetComponent.<AudioSource>().PlayOneShot(sonidoMensajes);
		texto="Has arreglado la nave, chequeando protocolo de despegue...";
	}
	
	if (tiempo>200 && tiempo<400 && sms==1)
	{
		sms=2;
		GetComponent.<AudioSource>().PlayOneShot(sonidoMensajes);
		texto="Protocolos de navegacion activados...";
	}
	
	if (tiempo>400 && tiempo<600 && sms==2)
	{
		sms=3;
		GetComponent.<AudioSource>().PlayOneShot(sonidoMensajes);
		texto="Preparando sistemas de velocidad luz...";
	}
	
	if (tiempo>600 && tiempo<800 && sms==3)
	{
		sms=4;
		GetComponent.<AudioSource>().PlayOneShot(sonidoMensajes);
		texto="Todos los sistemas de la nave en funcionamiento...";
	}
	
	if (tiempo>800 && sms==4)
	{
		sms=5;
		GetComponent.<AudioSource>().PlayOneShot(sonidoMensajes);
		texto="Vamonos a casa !!!";
	}
	
	//pulsamos escape para salir 
	if(Input.GetKey("escape"))
	{
		Application.Quit();
	}
	
	
	
}

function OnGUI () 
{
	GUI.skin = letrasFinAspecto;
	GUI.Label(Rect(0,0,500,300),texto);
	
}