#pragma strict

public var objetivo:Transform;
public var velocidad:int=3;
public var ver:boolean=false;
public var estado:int=0; 
public var mordisco:float=0.02;
static public var arannaViva:boolean=true;
public var sonidoAndar:AudioClip;
public var sonidoMorder:AudioClip;

function Start()
{
	objetivo = GameObject.FindWithTag("soldier").transform;
}

function viva()
{	
	// destruye a la aranna muerta
	Destroy(gameObject);
	var muerto:crearAranna = GetComponent("crearAranna");
	muerto.viviendo-=1;
	
}

function Update () 
{
	if(arannaViva==true)
	{
		// distancia entre el objetivo y enemigo si lo ve , true
		//Debug.Log(Vector3.Distance(objetivo.position,transform.position));
		if(Vector3.Distance(objetivo.position,transform.position)<1000)
		{
			ver=true;
		}else{
			ver=false;
		}
		
		if(!GetComponent.<AudioSource>().isPlaying && estado==1)
		{
			// sonido de andar
			GetComponent.<AudioSource>().clip=sonidoAndar;
			GetComponent.<AudioSource>().Play();
		}
	
		// si ve al objetivo cambia al estado 1
		if(ver==true && Vector3.Distance(objetivo.position,transform.position)>1)
		{
			estado=1;
		}
	
		// si no ve al objetivo cambia al estado 0
		if(ver==false)
		{
			estado=0;
		}
	
		// si ve al objetivo se coloca para mirarlo y se mueve en su direccion
		if(estado==1)
		{
			transform.LookAt(objetivo);
			transform.Translate(Vector3.forward*velocidad*Time.deltaTime);
		}
	
		// si estamos al lado del objetivo cambiamos a estado 2
		if(Vector3.Distance(objetivo.position,transform.position)<2 && ver==true)
		{
			estado=2;
		}
	
		// si estamos en el estado 2 ataca al objetivo
		if(estado==2)
		{
			var vidaPlayer:vida = GetComponent("vida");
			vidaPlayer.vida-=mordisco;
			// salud de soldado para su movimiento
			var saludSoldado:health = GetComponent("health");
			saludSoldado.health-=mordisco;
		
			transform.LookAt(objetivo);
		}
		
		if(!GetComponent.<AudioSource>().isPlaying && estado==2)
		{
			// sonido de morder
			GetComponent.<AudioSource>().clip=sonidoMorder;
			GetComponent.<AudioSource>().Play();
		}
	}
}