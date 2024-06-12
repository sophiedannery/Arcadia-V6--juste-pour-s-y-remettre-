const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    //Ici il faudra appaler l'API pour vérifier les crédentials en BDD
    let dataForm = new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //body du fetch
    const raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });

    //recap du fetch
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    //appel de la méthode fetch sur l'URL demandé et récup des réponses au format json 
    fetch(apiUrl+"login", requestOptions)

    .then((response) => {
        if(response.ok){
            return response.json();
        } else {
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }
    })
    .then((result) => {
//Si le fetch est OK, on veut renvoyer le user sur la page de connexion
        const token = result.apiToken;
        setToken(token);

        // Placer ce token en cookie
        setCookie(RoleCookieName, result.roles[0], 7);

        window.location.replace("/");
    })
    .catch((error) => console.error(error));

}