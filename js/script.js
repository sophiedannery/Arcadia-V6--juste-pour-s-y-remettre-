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
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//Récupérer un cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
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