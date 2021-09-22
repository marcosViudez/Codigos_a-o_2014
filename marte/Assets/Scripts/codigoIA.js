#pragma strict

var Jugador:Transform;
var LineaBusqueda:int=7;
var LineaAtaque:int=2;
var GirarEnemigo:int=6;
var CaminarEnemigo:int=5;
var LineaHerir:int=4;

private var ReloadTime=-1;

function Start()
{
	ReloadTime = ReloadTime+1;
}

function Update()
{
	//linea de busqueda del personaje, hacia donde se encuenta
	Debug.DrawRay(transform.position,Jugador.position,Color.green);
	
	//linea de ataque del enemigo seguir/atacar
	Debug.DrawRay(transform.position,transform.forward*LineaBusqueda,Color.blue);
	
	var DistanciaJugador=Vector3.Distance(transform.position,Jugador.position);
	var HitRay:RaycastHit;
	
	//saber si cruza o que colisiona entre el enemigo y el personaje
	if(Physics.Linecast(transform.position,Jugador.position,HitRay))
	{
		if(HitRay.collider.gameObject.name=="Player")
		{
			//linea de busqueda personaje visible
			Debug.DrawLine(transform.position,Jugador.position,Color.green);
			Debug.Log("linea de busqueda personaje visible");
			//si entra en la linea de ataque pero no pasa la distancia de ataque
			if(DistanciaJugador<=LineaBusqueda && DistanciaJugador>=LineaAtaque)
			{
				//rotar
				//obtener el angulo y suavizar el giro
				var Angulo = Quaternion.LookRotation(Jugador.position-transform.position,Vector3.up);
				transform.rotation=Quaternion.Slerp(transform.rotation,Angulo,Time.deltaTime*GirarEnemigo);
				
				//mover
				transform.Translate(Vector3.forward*CaminarEnemigo*Time.deltaTime);
			}
			if(DistanciaJugador<=LineaHerir)
			{
				if(Time.time>ReloadTime)
				{
					ReloadTime=Time.time+1;
				}
			}
		}
	}else{
		//linea de busqueda personaje no visible
		Debug.DrawLine(transform.position,Jugador.position,Color.red);
		Debug.Log("linea de busqueda personaje no visible");
	}
}