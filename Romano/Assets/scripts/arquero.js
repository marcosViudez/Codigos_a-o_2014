#pragma strict

//variables del arquero y el objetivo
var objetivo:Transform;
var velocidadGiro:float = 1.0;
var distancia:float = 30.0;

// variables de la creacion de las flechas
var flecha:Transform;
var lanzador2:Transform;
var creado:boolean;
var tiempoCarga:float=3.9;

function Start () 
{
	
}

function Update () 
{
	if(alcance())
	{
		var rotacionE = Quaternion.LookRotation(objetivo.position - transform.position, Vector3.up);
		// el vector up solo gira en (0,1,0)
		transform.rotation = Quaternion.Slerp(transform.rotation, rotacionE, Time.deltaTime * velocidadGiro);
	}
}

function alcance()
{
	// distancia calculada desde el enemigo al objetivo
	if(Vector3.Distance(transform.position,objetivo.position) > distancia)
	{
		// print("huelo a espartano");
		return false;
	}else{
		var vision:RaycastHit;
		
		if(Physics.Linecast(transform.position,objetivo.position,vision))
		{
			if(vision.collider.gameObject.tag != "espartano")
			{
				// print("donde andas espartano, no te veo");
			}else{
				// print("te tengo");
				disparoFlecha();
				return true;
			}
		}
	
		return true;
	}
}

// Metodo de creacion de una flecha
function disparoFlecha()
{	
	if(!creado)
	{
		Instantiate(flecha,lanzador2.position,lanzador2.rotation);
		creado=true;
		yield WaitForSeconds(tiempoCarga);
		creado=false;
	}
}