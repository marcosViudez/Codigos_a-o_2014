using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class enemigo : MonoBehaviour
{
    Transform objetivo;
    float velocidad = 1.0f;
    float distancia = 50;

    Transform flecha;		//Objeto a lanzar
    Transform lanzador;	// Punto desde el que lanzamos las flechas

    bool creado;
    GameObject puenteCaido;
    public bool destruirArquero = false;

    private int sonando = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Alcance())
        {
            //seguimiento del objetivo
            Quaternion rotacionE = Quaternion.LookRotation(objetivo.position - transform.position, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, rotacionE, Time.deltaTime * velocidad);
        }

        if (puenteCaido.GetComponent<puente>().puenteDerribado == true)
        {
            destruirArquero = true;
        }
    }

    public bool Alcance()
    {
        if (Vector3.Distance(transform.position, objetivo.position) > distancia)
        {
            // print("Huelo a espartano");
            return false;
        }
        else
        {

            //Detectamos si esta en el campo de vision
            RaycastHit vision;

            if (Physics.Raycast(transform.position, objetivo.position, vision))
            {
                if (vision.collider.gameObject.tag != "espartano")
                {
                    // print("Te huelo pero no te veo");
                }
                else
                {
                    // print("Te tengo!");
                    ataque1();
                    return true;
                }
            }

            return true;

        }
    }

    public void ataque1()
    {
        if (!creado)
        {
            Instantiate(flecha, lanzador.position, lanzador.rotation);
            creado = true;
            if (sonando == 0)
            {
                sonando = 1;
                GetComponent<AudioSource>().Play();
            }
            yield return new WaitForSeconds(2);
            creado = false;
            sonando = 0;
        }
    }
}
