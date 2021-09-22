#pragma strict

public var enem:Rigidbody;
private var crear:boolean=false;
private var enemigos:Array;

function Start () 
{
	// transform.Translate(0,0,0);
		if(crear==false)
		{
			var n:int=0;
			crear=true;
			if(n<10)
			{
			Instantiate(enem,transform.position,transform.rotation);	
				n++;
			}
		}
}