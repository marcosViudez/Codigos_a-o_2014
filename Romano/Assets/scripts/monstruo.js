#pragma strict

var objetivo:Transform; 
var distanciaAtaque:float = 30.0;
var velocidadGiro:int = 4;
var velocidadMonstruo:int;
static var monstruoMuerto:boolean = false;
private var sonando:int = 0;

function Start () 
{
	GetComponent.<Animation>()["Attack"].layer = 1;
}

function Update () 
{
	if(!monstruoMuerto)
	{
		//Debug.Log(Vector3.Distance(transform.position, objetivo.position));
		var muertoEspartano:espartano = GetComponent("espartano");
		transform.Translate(0,0,velocidadMonstruo*Time.deltaTime);
		
		if(Vector3.Distance(transform.position, objetivo.position) < 10 && muertoEspartano.muertoEspartano == false) 
		{
			ataque();
		}
	
		if(busqueda())
		{
			var rotacionE = Quaternion.LookRotation(objetivo.position - transform.position, Vector3.up);
			// el vector up solo gira en (0,1,0)
			transform.rotation = Quaternion.Slerp(transform.rotation, rotacionE, Time.deltaTime * velocidadGiro);
		}
	}
	
}

function ataque()
{
	// print("atacando");
	GetComponent.<Animation>().CrossFade("Attack");
}

function OnTriggerEnter(other:Collider)
{
	var atacando:espartano = GetComponent("espartano");
	
	if(espartano.atacando == true && other.gameObject.tag == "espada" && !monstruoMuerto)
	{
		// print("muere");
		GetComponent.<Animation>().CrossFade("Dead");
		monstruoMuerto=true;
		desaparecer();
	}
}

function desaparecer()
{
	Destroy(gameObject,5);
}



function busqueda()
{
	if(!monstruoMuerto)
	{
		var muertoEspartano:espartano = GetComponent("espartano");
		
		if((Vector3.Distance(transform.position, objetivo.position) < distanciaAtaque) && 
		(Vector3.Distance(transform.position, objetivo.position) > 10) && muertoEspartano.muertoEspartano==false)
		{
			// print("atacar");
			GetComponent.<Animation>().CrossFade("Walk");
	    	velocidadMonstruo = 3;
	    	if(sonando == 0)
	    	{
	    		sonando = 1;
	    		GetComponent.<AudioSource>().volume = 1;
	    		GetComponent.<AudioSource>().Play();
	    	}
			return true;
		}else{
			// print("adios");
			GetComponent.<Animation>().CrossFade("Idle");
			velocidadMonstruo = 0;
			sonando = 0;
			return false;
		}
	}
}