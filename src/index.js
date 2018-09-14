document.addEventListener("DOMContentLoaded", () => {
  const showingContainer = document.getElementsByClassName("ui cards showings")[0]


  const theatreId = 2;

fetch(`https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`)
  .then(res => res.json())
  .then(theater => {
    theater.showings.forEach((showing) => {

        renderMovieCards(showing)
    })
    })

function renderMovieCards(filmInfo){
  let movieCard = document.createElement("div")
  movieCard.dataset.id = filmInfo.id
  movieCard.classList.add("card")
  let remainingTickets = filmInfo.capacity + filmInfo.tickets_sold
  movieCard.innerHTML = `
    <div class="content">
      <div class="header">
        ${filmInfo.film.title}
      </div>
      <div class="meta">
        ${filmInfo.film.runtime} minutes
      </div>
      <div class="description">
        <span class="ui label">
          ${filmInfo.showtime}
        </span>
        remaining tickets
        <span class="tickets-remaining">
        ${remainingTickets}
        </span>
      </div>
    </div>
    <div class="extra content">
      <div class="ui blue button">Buy Ticket</div>
    </div>
  `
  showingContainer.append(movieCard)
}

document.addEventListener("click", () => {
  if (event.target.className === "ui blue button") {
    let cardId = event.target.parentNode.parentNode.getAttribute("data-id")

    fetch(`https://evening-plateau-54365.herokuapp.com/tickets`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
      showing_id: cardId
      })
    })
    .then(res => {
      if (res.status === 400) {
        let error = document.createElement("h1")
        error.innerText = "That showing is sold out"
        showingContainer.append(error) }

    let remainingTix = event.target.parentNode.parentNode.children[0].children[2].children[1]

    remainingTix.innerText = parseInt(remainingTix.innerText) - 1

})

})
