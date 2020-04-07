const modalOverlay = document.querySelector('.modal-overlay')

const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener("click", function(){
        const videoId = card.getAttribute('id') /* Pegar o atributo ID*/
        window.location.href = `/video?id=${videoId}`
        // modalOverlay.classList.add('active')
        // modalOverlay.querySelector('iframe').src = `https://youtube.com/embed/${videoId}`
    })
}

//isnerindo a função de fechar o modal
// document.querySelector('.close-modal').addEventListener("click", function(){
//     modalOverlay.classList.remove('active')
//     modalOverlay.querySelector('iframe').src = "" /* remove o video */
// })

