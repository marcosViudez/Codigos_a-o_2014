#pragma strict

var muros:Rigidbody;

function OnControllerColliderHit(hit:ControllerColliderHit)
{
	if(hit.gameObject.tag=="cajas")
	{
		Debug.Log("golpeas cajas");
	}
}