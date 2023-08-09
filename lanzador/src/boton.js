import React, { useState } from 'react';
const GITHUB_TOKEN = "";
const sha256 = async (data) => { 
  const textAsBuffer = new TextEncoder().encode(data);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return (digest);
}
const MyButton = () => {
  const [URL_ENDPOINT, setEndpoint] = useState('');
  
  const callWorkFlow = async (url, urlbin, modelname) => {
    let datakey = "i-love-adsoftsito|" + Date.now();
    console.log(datakey);
    let mysha = sha256(datakey);
    console.log("SHA : " + mysha);
    await fetch('https://api.github.com/repos/lokenmg/myMLOps_Hello-World/dispatches', {
      method: 'POST',
      body: JSON.stringify({
        event_type: "predictionjs",
        client_payload: {
          "codeurl": url,
          "codebin": urlbin,
          "MODEL_NAME": modelname,
          "sha": mysha
        }
      }),
      headers: {
        'Authorization': 'Bearer ' + GITHUB_TOKEN,
        'Accept': 'application/vnd.github.v3+json',
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => {
        console.log("data 2");
        console.log(data);
        URL_ENDPOINT = "https://linear-model-service-ia-lokenmg.cloud.okteto.net/v1/models/linear-model:predict";
        setEndpoint(URL_ENDPOINT)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
/**
 * .then((response) => {
            // response.json()
            console.log(response);
            //alert("response");

     })
     .then((data) => {
       console.log(data);
     //  URL_ENDPOINT = "https://" + PROJECT_NAME + "-service-adsoftsito.cloud.okteto.net/v1/models/" + PROJECT_NAME + ":predict";
       setEndpoint(URL_ENDPOINT)
     })
     .catch((err) => {
       console.log(err.message);
     });
   };
 */
  const handleClick = () => {
    // Llamar a la función callWorkFlow con los parámetros necesarios
    callWorkFlow("urlValue", "urlbinValue", "modelnameValue");
  };

  return (
    <button onClick={handleClick}>Activar función</button>
  );
};

export default MyButton;
