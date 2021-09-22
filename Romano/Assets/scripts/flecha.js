#pragma strict

var velocidadFlecha:int = 35;

function Start () {

}

function Update () 
{
	transform.Translate (Vector3.right * velocidadFlecha * Time.deltaTime);
	Destroy (gameObject, 4);
}

function OnTriggerEnter(other:Collider)
{
	if(other.gameObject.tag == "espartano")
	{
		// print("te caze");
		var vidaEspartano:juegoProp = GetComponent("juegoProp");
		vidaEspartano.vida -= 20;
		
	} 
	
	if(other.gameObject.tag == "arboles")
	{
		Destroy(gameObject);
	}
}

