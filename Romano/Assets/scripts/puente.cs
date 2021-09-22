using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class puente : MonoBehaviour
{
	Animator animator;
    GameObject esparta;
    public bool puenteDerribado = false;

    private int sonando = 0;

    void Start()
	{
		animator = GetComponent<Animator>();
	}

	void Update()
	{

	}

    void OnTriggerStay(Collider other)
	{
		if (other.gameObject.tag == "espada" && esparta.GetComponent<espartano>().atacando == true)
		{
			// print("puente derribado ganaste !!! ");
			if (sonando == 0)
			{
				sonando = 1;
				GetComponent<AudioSource>().Play();
			}
			yield return new WaitForSeconds(1);
			animator.SetBool("derribado", true);
			puenteDerribado = true;
			yield return new WaitForSeconds(3);
			//carga la fase de victoria
			Application.LoadLevel("victoria");

		}
		else
		{
			animator.SetBool("derribado", false);
			puenteDerribado = false;
		}
	}
}
