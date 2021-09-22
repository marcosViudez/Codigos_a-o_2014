#pragma strict

    public var meco:GameObject;
	public var cajilla:GameObject;
	
function OnControllerColliderHit(hit:ControllerColliderHit) 
{
	if(hit.gameObject.tag=="caja")
	{
		Debug.Log("colision");
	}else{
		Debug.Log("acercate");
	}
} 

function Update()
{
	if((meco.transform.position.x-cajilla.transform.position.x)<2.0)
	{
		Debug.Log("estas cerca de la caja");
	}
}
