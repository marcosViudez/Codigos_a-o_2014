#pragma strict

public var enemigos:Rigidbody[];
public var retraso:int=1;
static public var viviendo:int=0;
private var creados:boolean=false;

function Start()
{
	for(var i:int=0; i<enemigos.length; i++)
	{
		// retraso de creacion de arannas
		yield WaitForSeconds(retraso);
    	Instantiate(enemigos[i], transform.position*Random.Range(3,0), transform.rotation);
    	enemigos[i].name = ("aranna" + i);
    	viviendo++;
 	}	
}

function Update()
{
		if(viviendo>45)
		{
			creados=true;
		}
		if(creados==true && viviendo<1)
		{
			renaciendo();
		}
}

function renaciendo()
{
	for(var i:int=0; i<enemigos.length; i++)
	{
		// retraso de creacion de arannas
		creados=false;
		yield WaitForSeconds(retraso);
    	Instantiate(enemigos[i], transform.position*Random.Range(10,0), transform.rotation);
    	enemigos[i].name = ("aranna" + i);
    	viviendo++;
 	}
}

