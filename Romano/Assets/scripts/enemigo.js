#pragma strict

var objetivo : Transform;
var velocidad : float = 1.0;
var distancia : float = 50;

var flecha : Transform;		//Objeto a lanzar
var lanzador : Transform;	// Punto desde el que lanzamos las flechas

var creado : boolean;
var puenteCaido:GameObject;
static var destruirArquero:boolean = false;

private var sonando:int = 0;


function Start () 
{

}

function Update () 
{
	if (Alcance())
	{
		//seguimiento del objetivo
		var rotacionE = Quaternion.LookRotation(objetivo.position - transform.position, Vector3.up);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotacionE, Time.deltaTime * velocidad);
	}
	
	if(puenteCaido.GetComponent(puente).puenteDerribado == true)
	{
		destruirArquero = true;
	}
	
	// print(" derribado: " + puenteCaido.GetComponent(puente).puenteDerribado);
	
}


//Funciﾃｳn que determina el alcance

function Alcance ()
{
	if (Vector3.Distance(transform.position, objetivo.position) > distancia)
	{
		// print("Huelo a espartano");
		return false;
	}else{

		//Detectamos si esta en el campo de vision
		var vision : RaycastHit;

		if (Physics.Linecast(transform.position, objetivo.position, vision))
		{
			if(vision.collider.gameObject.tag != "espartano")
			{
				// print("Te huelo pero no te veo");
			}else{
				// print("Te tengo!");
				ataque1 ();
				return true;
			}
		}

	return true;
	
	}
}



//funcion de ataque que lanza flechas
function ataque1()
{
	if (!creado)
	{
		Instantiate(flecha, lanzador.position, lanzador.rotation);
		creado = true;
		if(sonando == 0)
		{
			sonando = 1;
			GetComponent.<AudioSource>().Play();
		}
		yield WaitForSeconds(2);
		creado = false;
		sonando = 0;
	}
}

