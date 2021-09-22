#pragma strict

var flecha: Transform;
var lanzador: Transform;
var creado: boolean;

var velocidadGiro: float = 3.0;
var velocidadDisparo: int = 2
;

var objetivo:Transform;

function Start () 
{

}

function Update () 
{
	if(busqueda())
	{
		var rotacion = Quaternion.LookRotation(objetivo.position - transform.position, Vector3.up);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotacion, Time.deltaTime * velocidadGiro);
	}
}

function busqueda()
{
	if(Vector3.Distance(objetivo.position, transform.position) < 30)
	{
		var vision : RaycastHit;

		if (Physics.Linecast(transform.position, objetivo.position, vision))
		{
			if(vision.collider.gameObject.tag == "espartano")
			{
				// print("Te tengo!");
				disparo();
				return true;
			}else{
				// print("Te huelo pero no te veo");
			}
		}
		return true;
	}else{
		// print("donde estas espartano");
		return false;
	}
}

function disparo()
{
	if(!creado)
	{
		Instantiate(flecha,lanzador.position,lanzador.rotation);
		creado = true;
		yield WaitForSeconds(velocidadDisparo);
		creado = false;
	}
}