#pragma strict

private var mensaje:int = 0;
var muerteSoldado:soldado; // script soldado 
var bloqueoPrimero:GameObject;
var estetica:GUISkin;

function Start () 
{

}

function Update () 
{
	if(muerteSoldado.muerto == true)
	{
		// print ("ha muerto el soldado");		
		bloqueoPrimero.active = false;
	}
}

function OnTriggerEnter(other:Collider)
{
	if((other.gameObject.tag == "espartano") && bloqueoPrimero.active == true)
	{
		// mensaje al entrar en el trigger
		// print("mata al guerrero para continuar");
		mensaje = 1;	
		yield WaitForSeconds(3);
		mensaje = 0;	
	}
}

function OnGUI()
{	
	if(mensaje == 1)
	{
		GUI.skin = estetica;
		GUI.TextArea(Rect((Screen.width/2)-225,(Screen.height/2)-50,450,100),"Mata al guerrero para continuar");
	}
	
}