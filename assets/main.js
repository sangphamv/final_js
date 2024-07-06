// Hiển thị thời gian là hôm nay
const movies_data = [
  { id: "movie_item_1", title: "One Piece", price: 10},
  { id: "movie_item_2", title: "Naruto", price: 15 },
  { id: "movie_item_3", title: "Attack on Titan", price: 18 },
  { id: "movie_item_4", title: "Demon Slayer: Kimetsu no Yaiba", price: 20 },
];
const movieSelect = document.getElementById("movie");

movies_data.forEach((movies_data) => {
  const option = document.createElement("option");
  option.id = movies_data.id;
  option.textContent = movies_data.title;
  option.value = movies_data.price; 
  movieSelect.appendChild(option);
});

const pickTime = document.getElementById("picktime");
pickTime.value = new Date().toISOString().slice(0, 10);

// const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

populateUI();

let ticketPrice = +movieSelect.value;

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

updateSelectedCount();
