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

function OnMouseUp()
{
	if(gameObject.tag == "menuInstrucciones")
	{
		// print("instrucciones");
		Application.LoadLevel("MenuInicio");
	}
	
	else if(gameObject.tag == "derrota")
	{
		// print("instrucciones");
		Application.LoadLevel("MenuInicio");
	}
	
	else if(gameObject.tag == "victoria")
	{
		// print("instrucciones");
		Application.LoadLevel("MenuInicio");
	}
}