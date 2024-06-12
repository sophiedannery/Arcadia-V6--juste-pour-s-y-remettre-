
const galerieImage = document.getElementById("allImages");

//Récupérer les infos des images

let titre = "La jungle";
let imgSource = "/Média/lajungle.jpg";

let monImage = getImage(titre, imgSource);

galerieImage.innerHTML = monImage;



function getImage(titre, urlImage){

    titre = sanitizeHtml(titre);
    urlImage = sanitizeHtml(urlImage);
    


    return ` <div class="col p-3">
                    <div class="image-card text-white">
                        <img src="${urlImage}" class="rounded w-100 img-homepage">
                        <p class="titre-image">${titre}</p>
                        <div class="action-image-buttons" data-show="admin">
                            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EdiitonPhotoModal"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>`;
}