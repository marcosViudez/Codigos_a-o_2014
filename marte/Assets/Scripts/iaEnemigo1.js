#pragma strict

public var Player:GameObject;

function Update () 
{
	if(Vector3.Distance(Player.transform.position,transform.position)<2)
	{
		Debug.Log("golpea");
	}else{
		Debug.Log("persigue");
	}
}