#pragma strict

public var oxigeno:int=200;

function Start()
{
	oxigeno=200;
}

function Update()
{
	GetComponent.<GUITexture>().pixelInset.width=oxigeno;
	
	if(oxigeno<0)
	{
		oxigeno=0;
	}
	
	if(oxigeno>200)
	{
		oxigeno=200;
	}
}