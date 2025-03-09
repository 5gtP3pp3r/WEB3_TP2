
export async function FecthListeNomsApi() {
    
    const reponse = await fetch(`https://jsonplaceholder.typicode.com/users`
    );
    if (!reponse.ok) {
        throw new Error(`Erreur code ${reponse.status}`);
    }
    const donnees = await reponse.json();
    console.log(donnees);
    return donnees;
}
