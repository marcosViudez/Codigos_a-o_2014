#pragma strict

var animator:Animator;
var esparta:GameObject;
static var puenteDerribado:boolean = false;

private var sonando:int = 0;

function Start () 
{
	animator = GetComponent("Animator");
}

function Update () 
{
	
}

function OnTriggerStay(other:Collider)
{
	if(other.gameObject.tag == "espada" && esparta.GetComponent(espartano).atacando == true)
	{
		// print("puente derribado ganaste !!! ");
		if(sonando == 0)
		{
			sonando = 1;
			GetComponent.<AudioSource>().Play();
		}
		yield WaitForSeconds(1);
		animator.SetBool("derribado",true);
		puenteDerribado = true;
		yield WaitForSeconds(3);
		//carga la fase de victoria
		Application.LoadLevel("victoria");
		
	}else{
		animator.SetBool("derribado",false);
		puenteDerribado = false;
	}
}