// Ce fichier JS est utilisable depuis n'importe qu'elle page (il est inclus dans la page index.html).



//GESTION DES COOKIES

//Placer le token en cookie 
const tokenCookieName = "accesstoken"

function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

// Récupérer le token
function getToken(){
    return getCookie(tokenCookieName);
}

//Placer un cookie
function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Récupérer un cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//Supprimer un cookie
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}








// SAVOIR SI UTILISATEUR EST CONNECTE
function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    } else {
        return true;
    }
}



// GERER LA DECONNEXION (supprimer le cookie)
const signoutBtn = document.getElementById("signout-btn");
const RoleCookieName = "role"

signoutBtn.addEventListener("click", signout);

function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName)
    window.location.reload();
}


// RECUPERER LE ROLE DE L'UTILISATEUR
//Si j'appelle cette méthode, je pourrais savoir quel est le rôle de l'utilisateur
function getRole(){
    return getCookie(RoleCookieName);
}

/*
LES ROLES
disconnected
connected (admin ou client)
*/


//FONOCTION POUR MONTRER OU CACHER LES ELEMENTS SELON LE ROLE
function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}



//CREATION CONSTANT POUR URL DE L'API
const apiUrl = "http://127.0.0.1:8000/api/"



//FONCTION POUR SANITIZE 
function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}



//RECUPERER LES INFOS DU USER CONNECTE 
function getInfosUser(){

    //header du fetch
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    //recap du fetch
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    
    //envoi de la requête au serveur
    fetch(apiUrl+"account/me", requestOptions)
    //Ce qu'on fait arpès que la requête soit exécuté :
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.log("Impossible de récupérer les informations utilisateur.");
        }
    })
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(error =>{
        console.error("Erreur lors de la récupération des données utilisateur", error);
    });
}



