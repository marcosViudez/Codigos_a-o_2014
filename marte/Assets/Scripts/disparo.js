#pragma strict

public var proyectil:Rigidbody;
public var velocidadBala:float=20.0;


function Update () 
{
	if(Input.GetButtonDown("Fire1"))
	{
		var bala:Rigidbody = Instantiate(proyectil,transform.position,transform.rotation);
		bala.velocity = transform.TransformDirection(Vector3(0,0,velocidadBala));
		bala.name =  "proyectil";
		Physics.IgnoreCollision(bala.GetComponent.<Collider>(),transform.root.GetComponent.<Collider>());
	}
}