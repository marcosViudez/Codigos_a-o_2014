#pragma strict

var velocidad : int = 20;

function Start () {

}

function Update () 
{
	transform.Translate(-Input.GetAxis("Horizontal")*velocidad*Time.deltaTime,0,-Input.GetAxis("Vertical")*velocidad*Time.deltaTime);
}