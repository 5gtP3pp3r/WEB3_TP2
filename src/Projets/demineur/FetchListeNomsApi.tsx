
export function FecthListeNomsApi() {
    
    return fetch(`https://jsonplaceholder.typicode.com/users`        
      )
      .then((reponse) => {
        if (!reponse.ok) {
            throw new Error(`Erreur code ${reponse.status}`);
        }
        return reponse.json();
    })
    .then((donnees) => {
        console.log(donnees);
        return donnees      
    });
}
