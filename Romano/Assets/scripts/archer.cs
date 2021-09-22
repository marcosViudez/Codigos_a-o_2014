using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class archer : MonoBehaviour
{
    public GameObject muerteArquero;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if(muerteArquero.GetComponent<enemigo>().destruirArquero == true)
        {
            Destroy(this);
        }
    }
}
