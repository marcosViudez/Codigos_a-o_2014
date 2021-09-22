#pragma strict

var objetivo:Transform;
static var muerto:boolean;
var sonidoMuerte:AudioClip;
private var sonando:int=0;

function Start () 
{
	GetComponent.<Animation>()["Die"].layer = 1;
}

function Update () 
{
	if(!muerto)
	{
		if(Vector3.Distance(objetivo.position,transform.position) < 8)
		{
			// print("estas cerca");
			GetComponent.<Animation>().CrossFade("Idle_Alert");
			if(sonando == 0)
			{
				sonando = 1;
				GetComponent.<AudioSource>().volume=1;
				GetComponent.<AudioSource>().Play();
			}
		}else{
			GetComponent.<Animation>().CrossFade("Idle");
			sonando = 0;
		}
	}
}

function OnTriggerEnter(other:Collider)
{
	if(other.gameObject.tag == "espada" && !muerto)
	{
		// print("muere");
		GetComponent.<Animation>().CrossFade("Die");
		AudioSource.PlayClipAtPoint(sonidoMuerte,transform.position);
		muerto=true;
		desaparecer();
	}
}

function desaparecer()
{
	Destroy(gameObject,5);
}