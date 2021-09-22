#pragma strict

public var jugador:GameObject;
public var posz:float=1.0;
private var hit:RaycastHit;
private var col:boolean;

function Update () 
{
	
	if(Physics.Raycast(transform.position,transform.forward,hit,300))
	{
		Debug.DrawLine(transform.position,jugador.transform.forward,Color.red,5);
		
		if(hit.transform.tag=="Player")
		{
			transform.Translate(0.1,0,0.1);
		}
	}
	
	
}