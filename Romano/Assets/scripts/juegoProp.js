#pragma strict

var vida0:Texture2D;
var vida20:Texture2D;
var vida40:Texture2D;
var vida60:Texture2D;
var vida80:Texture2D;
var vida100:Texture2D;

static var vida:int = 100;

function Start () 
{

}

function Update () 
{
	var marcadorVida = gameObject.Find("marcadorVida");
	
	if(vida == 100)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida100;
		return;
	}
	
	else if(vida == 80)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida80;
		return;
	}
	
	else if(vida == 60)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida60;
		return;
	}
	
	else if(vida == 40)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida40;
		return;
	}
	
	else if(vida == 20)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida20;
		return;
	}
	
	else if(vida == 0)
	{
		marcadorVida.GetComponent.<GUITexture>().texture = vida0;
		return;
	}
}
