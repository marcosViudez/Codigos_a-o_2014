#pragma strict

// variables publicas y privada
public var gastoOxigeno:float=0.008;
public var curarVida:float=24.0;
public var nave:GameObject;
public var sonidoCogerObjetos:AudioClip;
public var botiquinLleno:AudioClip;
public var sonidoCogerCajas:AudioClip;
public var alarma:AudioClip;
public var oxigenoAlarma:AudioClip;
public var cogerOxigeno:AudioClip;
public var acaboOxigeno:AudioClip;
public var cogerGarrafas:AudioClip;

private var velocidadRelleno:float=0.5;
private var faltaOxigeno:float=0.5;
private var dannoFuego:float=0.2;
private var colBotiquin:boolean;
private var rellenando:boolean;
private var herramientasRecogidas:boolean=false;
private var garrafasRecogidas:boolean=false;

private var fuegoMotores:boolean=false;
private var fuegoCabinas:boolean=false;
private var fuegoEnAlas:boolean=false;

private var tiempo:int=0;
static public var garrafasCombustible:int=4;
static public var herramientas:int=3;

private var faseUno:boolean=false;
private var faseDos:boolean=false;
private var finJuego:boolean=false;

function OnTriggerEnter(hit:Collider)
{
	
	// si colisionamos con fuegos estela
	if(hit.gameObject.tag=="fuegoEstela1" || hit.gameObject.tag=="fuegoEstela2")
	{
		var vidaPlayer:vida = GetComponent("vida");
		vidaPlayer.vida-=dannoFuego;
		
		// salud de soldado para su movimiento
		var saludSoldado:health = GetComponent("health");
		saludSoldado.health-=dannoFuego;
	}

	// si colisionamos con cajas de herramientas
	if(hit.gameObject.tag=="herramientas")
	{
		// sonido cajas herramientas
		GetComponent.<AudioSource>().PlayOneShot(sonidoCogerCajas);
		herramientas-=1;
		Destroy(hit.gameObject);
		
		// mensaje de herramientas que quedan
		var infoPlayer:vida = GetComponent("vida");
		if(herramientas>0 && tiempo>100)
		{
			tiempo=0;
			infoPlayer.infoJuego = "Te quedan " + herramientas + " cajas de herramientas";
		}
		
		if(herramientas<1 && tiempo>100){
			tiempo=0;
			herramientasRecogidas=true;
			infoPlayer.infoJuego = "Ya tienes todas las herramientas para arreglar la nave";
		}
	}
	
	// si colisionamos con garrafas de combustible 
	if(hit.gameObject.tag=="combustible")
	{
		// sonido coger garrafas
		GetComponent.<AudioSource>().PlayOneShot(cogerGarrafas);
		garrafasCombustible-=1;
		Destroy(hit.gameObject);
		
		// mensaje de garrafas que quedan
		if(garrafasCombustible>0 && tiempo>100)
		{
			tiempo=0;
			infoPlayer.infoJuego = "Te quedan " + garrafasCombustible + " garrafas de combustible";
		}
		
		if(garrafasCombustible<1 && tiempo>100)
		{
			tiempo=0;
			garrafasRecogidas=true;
			infoPlayer.infoJuego = "Ya tienes todo el combustible suficiente para despegar";
		}
	}
	
	// si el jugador colisiona con un botiquin
	if(hit.gameObject.tag=="botiquin")
	{
		colBotiquin=true;
		
		if(vidaPlayer.vida<124.0)
		{
			// sonido coger objeto
			GetComponent.<AudioSource>().PlayOneShot(sonidoCogerObjetos);
			// coger botiquines y curarse
			vidaPlayer.vida=vidaPlayer.vida+curarVida;
			// cura vida soldado
			saludSoldado.health+=curarVida;
			// destruir botiquin cogido
			Destroy(hit.gameObject);
			
		}else{
	 			// tu vida esta completa 
	 			if(tiempo>100)
	 			{
	 				tiempo=0;
	 				// sonido de botiquin lleno
	 				GetComponent.<AudioSource>().PlayOneShot(botiquinLleno);
					infoPlayer.infoJuego = "Tu vida esta completa";
				}
			 }
	}
}

function OnTriggerStay(hit:Collider)
{
	// si colisionamos con fuegos estela y nos mantenemos
	if(hit.gameObject.tag=="fuegoEstela1" || hit.gameObject.tag=="fuegoEstela2")
	{
		var vidaPlayer:vida = GetComponent("vida");
		vidaPlayer.vida-=dannoFuego;
		// salud de soldado para su movimiento
		var saludSoldado:health = GetComponent("health");
		saludSoldado.health-=dannoFuego;
	}
}


function OnTriggerExit(hit:Collider)
{
	// si colisiono con botiquin con vida llena 
	if(hit.gameObject.tag=="botiquin")
	{
		colBotiquin=false;
		var infoPlayer:vida = GetComponent("vida");
	}
}


function Update () 
{
	// Debug.Log(herramientasRecogidas);
	// Debug.Log(garrafasRecogidas);
	// Debug.Log("fuegoMotores: " + fuegoMotores);
	// Debug.Log("fuegoCabinas: " + fuegoCabinas);
	// Debug.Log("fuegoEnAlas: " + fuegoEnAlas);
	
	// temporizador
	tiempo=tiempo+1;
	if(tiempo>1000){tiempo=1000;}
	//Debug.Log(tiempo);
	
	// ocultar raton 
	Cursor.visible=false;
	
	// tecla escape sale del juego
	if(Input.GetKey("escape"))
	{
		// vuelve menu de juego
		Application.LoadLevel(0);
		Cursor.visible=true;
	}
	
	// Debug.Log(colBotiquin);
	
	// mando mensaje nulo al separarme de botiquines
	if(GameObject.FindWithTag("botiquin"))
	{
		if(colBotiquin==false)
		{
			if(tiempo>200)
			{
				var infoPlayer:vida = GetComponent("vida");
				infoPlayer.infoJuego = "";
			}
		}
	}
	
	// quitar oxigeno continuamente
	var oxigenoPlayer:vida = GetComponent("vida");
	oxigenoPlayer.oxigeno = oxigenoPlayer.oxigeno - gastoOxigeno;
	
	//aviso de nivel bajo de oxigeno
	if(oxigenoPlayer.oxigeno<20.0 && tiempo>100)
	{
		tiempo=0;
		infoPlayer.infoJuego = "Bajo nivel de Oxigeno, rellenalo Inmediatamente !!";
	}
	
	// restamos vida cuando se acabe oxigeno
	if(oxigenoPlayer.oxigeno<1.0)
	{
		// resta vida por falta de oxigeno en traje
		var vidaPlayer:vida = GetComponent("vida");
		vidaPlayer.vida-=faltaOxigeno;
		
		// salud de soldado para su movimiento
		var saludSoldado:health = GetComponent("health");
		saludSoldado.health-=faltaOxigeno;
		
		// mensaje de oxigeno agotado
		GetComponent.<AudioSource>().PlayOneShot(oxigenoAlarma);
		infoPlayer.infoJuego = "Tu traje se ha quedado sin Oxigeno rellenalo Inmediatamente !!";
	}
	
	// finalizar juego con exito
	if(faseUno==true && faseDos==true)
	{
			finJuego=true;
			// carga nivel de despegue
			Application.LoadLevel(2);
	}
}


// funcion para mensaje de nave sin herramientas
function OnControllerColliderHit(hit:ControllerColliderHit)
{
	
	// colisionamos con nuestra nave y faltan herramientas y garrafas
	if(hit.gameObject.tag=="nave" && herramientasRecogidas==false && garrafasRecogidas==false)
	{
		if(tiempo>100)
		{
			tiempo=0;
			var infoPlayer:vida = GetComponent("vida");
			// sonido de alarma
			GetComponent.<AudioSource>().PlayOneShot(alarma);
			infoPlayer.infoJuego = "La nave esta averiada, busca herramientas para repararla y combustible, " + 
			"Te quedan: " + garrafasCombustible.ToString() + " garrafas combustible y " + herramientas.ToString()
			+ " cajas de herramientas";
			
		}
	}
	
	// colisionamos con la nave con herramientas recogidas
	if(hit.gameObject.tag=="nave" && herramientasRecogidas==true && garrafasRecogidas==false  && fuegoCabinas==false && fuegoEnAlas==false)
	{
		if(tiempo>100)
		{
			tiempo=0;
			infoPlayer.infoJuego = "Reparando zona de cabina y zona de carga...";
			
			// eliminar fuego de particulas en la nave en cabina y alas
			if(gameObject.FindWithTag("fuegoNave"))
			{
				Destroy(gameObject.FindWithTag("fuegoNave"));
				fuegoEnAlas=true;
			}
			
			if(gameObject.FindWithTag("fuegoCabina"))
			{
				Destroy(gameObject.FindWithTag("fuegoCabina"));
				fuegoCabinas=true;
			}
		}
	}
	
	// colisionamos con la nave con garrafas recogidas
	if(hit.gameObject.tag=="nave" && garrafasRecogidas==true && herramientasRecogidas==false && fuegoMotores==false)
	{
		if(tiempo>100)
		{
			tiempo=0;
			infoPlayer.infoJuego = "Reparando zona de los motores...";
			
			// eliminar fuego de particulas en la zona de motores
			if(gameObject.FindWithTag("fuegoMotor"))
			{
				Destroy(gameObject.FindWithTag("fuegoMotor"));
				fuegoMotores=true;
			}
		}
	}
	
	// si tienes todo recogido , repara toda la nave a la vez
	if(hit.gameObject.tag=="nave" && garrafasRecogidas==true && herramientasRecogidas==true)
	{
		if(tiempo>100)
		{
			tiempo=0;
			infoPlayer.infoJuego = "Reparadas todas las zonas de la nave y fuegos apagados...";
			faseUno=true;
			faseDos=true;
		}
		
		// eliminamos todos los fuegos si aun siguen activos
		if(fuegoEnAlas==false && gameObject.FindWithTag("fuegoNave"))
		{
			Destroy(gameObject.FindWithTag("fuegoNave"));
			fuegoEnAlas=true;
		}
			
		if(fuegoCabinas==false && gameObject.FindWithTag("fuegoCabina"))
		{
			Destroy(gameObject.FindWithTag("fuegoCabina"));
			fuegoCabinas=true;
		}
			
		if(fuegoMotores==false && gameObject.FindWithTag("fuegoMotor"))
		{
			Destroy(gameObject.FindWithTag("fuegoMotor"));
			fuegoMotores=true;
		}
			
	}
	
	// mensaje fuego motores reparado
	if(hit.gameObject.tag=="nave" && fuegoMotores==true)
	{
		if(tiempo>100)
		{
			tiempo=0;
			faseUno=true;
			infoPlayer.infoJuego = "El fuego de los motores ha sido reparado,  buen trabajo !!";
		}
	}
	
	// mensaje fuego cabina y alas reparado
	if(hit.gameObject.tag=="nave" && fuegoCabinas==true && fuegoEnAlas==true)
	{
		if(tiempo>100)
		{
			tiempo=0;
			faseDos=true;
			infoPlayer.infoJuego = "El fuego de la cabina y de la zona de carga estan apagados, buen trabajo !!";
		}
	}
	
	// rellenando oxigeno al acercarse a un tanque de oxigeno
	if(hit.gameObject.tag=="tanqueOxigeno")
	{
		var capacTanque:capacidadTanque = GetComponent("capacidadTanque");
		var oxigenoPlayer:vida = GetComponent("vida");
		
		if(capacTanque.capacidadTanque>1 && oxigenoPlayer.oxigeno<124)
		{
			// sonidos de rellenado de oxigeno
			GetComponent.<AudioSource>().PlayOneShot(cogerOxigeno);
			oxigenoPlayer.oxigeno = oxigenoPlayer.oxigeno + velocidadRelleno;
			capacTanque.capacidadTanque-=velocidadRelleno;
		}
		// Debug.Log(capacTanque.capacidadTanque);
	}
	
	// los tanques estan agotados
	if(capacTanque.capacidadTanque<=1)
	{
		GameObject.FindWithTag("luzOxigeno0").GetComponent.<Light>().intensity=0.0;
		GameObject.FindWithTag("luzOxigeno1").GetComponent.<Light>().intensity=0.0;
		GameObject.FindWithTag("luzOxigeno2").GetComponent.<Light>().intensity=0.0;
		GameObject.FindWithTag("luzOxigeno3").GetComponent.<Light>().intensity=0.0;
	}
	
	// mensaje de tanques oxigeno agotados
	if(hit.gameObject.tag=="tanqueOxigeno" && capacTanque.capacidadTanque<=1)
	{
		if(tiempo>100)
		{
			tiempo=0;
			// sonido de oxigeno se acabo
			GetComponent.<AudioSource>().PlayOneShot(acaboOxigeno);
			infoPlayer.infoJuego = "Los tanques de Oxigeno se han agotado";
		}
	}
}