#pragma strict

var muerteArquero:GameObject;

function Start () 
{

}

function Update () 
{
	if(muerteArquero.GetComponent(enemigo).destruirArquero == true)
	{
		Destroy(gameObject);
	}
}