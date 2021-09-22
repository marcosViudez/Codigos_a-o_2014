#pragma strict

var velocidad:float = 3.0;
var corriendo:float = 4.0;
var corriendoAtras:float = -4.0;
static var atacando:boolean = false;
var fuentes:GUISkin;
static var muertoEspartano:boolean = false;

var timer:int = 100;

function Start () 
{
	// colocamos en otra capa diferente la animacion ataque
	GetComponent.<Animation>()["attack"].layer = 1;
	
	// temporizador del juego
	InvokeRepeating("Timer",1.0,1.0);
}

function Timer()
{
	if(timer>0)
	{
		timer-= 1;
	}
}

function Update () 
{
	if(Input.GetKey("escape"))
	{
		Application.Quit();
	}

	if(timer<=0 && !muertoEspartano)
	{
		// se acabo el tiempo
		Application.LoadLevel("muerteMenu");
	}

	var vidaEspartano:juegoProp = GetComponent("juegoProp");
	if(vidaEspartano.vida <= 0 && !muertoEspartano)
	{
		// print("estas muerto");
		muerte();
		muertoEspartano = true;
		Application.LoadLevel("muerteMenu");
	}
	
	// print(atacando);
	Cursor.visible = false;     // mostrar cursor
	
	if(!muertoEspartano)
	{
		// movimiento del espartano basico teclas de W,A,S,D
		if(Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s") || Input.GetKey("d"))
		{
			if (Input.GetKey ("w"))
			{
				//print("has pulsado la tecla w");
				transform.Translate(Vector3(0,0,velocidad * Time.deltaTime));
				andar();
			}
			if (Input.GetKey ("s"))
			{
				//print("has pulsado la tecla s");
				transform.Translate(Vector3(0,0,-velocidad * Time.deltaTime));
				andar();
			}
			if (Input.GetKey ("a"))
			{
				//print("has pulsado la tecla a");
				transform.Translate(Vector3(-velocidad * Time.deltaTime,0,0));
				andar();
			}
			if (Input.GetKey ("d"))
			{
				//print("has pulsado la tecla d");
				transform.Translate(Vector3(velocidad * Time.deltaTime,0,0));
				andar();
			}
			if(Input.GetKey ("w") && Input.GetKey(KeyCode.LeftShift))
			{
				//print("corro");
				transform.Translate(Vector3(0,0,corriendo * Time.deltaTime));
				correr();
			}
			if(Input.GetKey ("s") && Input.GetKey(KeyCode.LeftShift))
			{
				//print("corro hacia atras");
				transform.Translate(Vector3(0,0,corriendoAtras * Time.deltaTime));
				correr();
			}
		}else{
		GetComponent.<Animation>().CrossFade("idle");
		}
	
		// pulsamos boton izquierdo del raton para atacar
		if(Input.GetButton("Fire1"))
		{
			ataque();
			GetComponent.<AudioSource>().Play();
		}
	}
}


function OnTriggerEnter(other:Collider)
{	
	if(other.gameObject.tag == "pataDer" || other.gameObject.tag == "pataIzq")
	{
		//print("dado");
		var vidaEspartano:juegoProp = GetComponent("juegoProp");
		vidaEspartano.vida -= 20;
	}
}

function OnGUI()
{
	GUI.skin = fuentes;
	GUI.Label(Rect(20,550,300,50),"Time : " + timer);
}

// animacines del personaje espartano
function andar()
{
	GetComponent.<Animation>().CrossFade("walk");
}

function correr()
{
	GetComponent.<Animation>().CrossFade("run");
}

function muerte()
{
	GetComponent.<Animation>().CrossFade("die");
}

function ataque()
{
	atacando = true;
	GetComponent.<Animation>().CrossFade("attack");
	yield WaitForSeconds(1);
	atacando = false;
}
