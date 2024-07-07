// *********************************************************************************
// *********************************************************************************
const movies = [
  {
    value: 10,
    text: "Attach On Tian ($10)",
    id: "video1",
  },
  {
    value: 12,
    text: "Demon Slayer ($12)",
    id: "video2",
  },
  {
    value: 8,
    text: "Doraemon ($8)",
    id: "video3",
  },
  {
    value: 9,
    text: "One Piece ($9)",
    id: "video4",
  },
];

const movieSelect = document.getElementById("movie");

movies.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.value;
  option.textContent = movie.text;
  option.id = movie.id;
  movieSelect.appendChild(option);
});

// *********************************************************************************
// *********************************************************************************

const times = [
  { value: "8", text: "08:00 AM" },
  { value: "9", text: "09:00 AM" },
  { value: "10", text: "10:00 AM" },
  { value: "11", text: "11:00 AM" },
  { value: "12", text: "12:00 PM" },
  { value: "13", text: "01:00 PM" },
  { value: "14", text: "02:00 PM" },
  { value: "15", text: "03:00 PM" },
  { value: "16", text: "04:00 PM" },
  { value: "17", text: "05:00 PM" },
  { value: "18", text: "06:00 PM" },
  { value: "19", text: "07:00 PM" },
  { value: "20", text: "08:00 PM" },
  { value: "21", text: "09:00 PM" },
  { value: "22", text: "10:00 PM" },
];

const timePicker = document.getElementById("timepicker");

times.forEach((time) => {
  const option = document.createElement("option");
  option.value = time.value;
  option.textContent = time.text;
  timePicker.appendChild(option);
});

// *********************************************************************************
// *********************************************************************************
const dates = [];
const today = new Date();

for (let i = 0; i <= 14; i++) {
  const currentDate = new Date(today);
  currentDate.setDate(today.getDate() + i);

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${day} - ${month} - ${year}`;
  dates.push(formattedDate);
}

const datePicker = document.getElementById("datepicker");

dates.forEach((date) => {
  const option = document.createElement("option");
  option.value = date;
  option.textContent = date;
  datePicker.appendChild(option);
});

// *********************************************************************************
// *********************************************************************************
const rows = document.querySelectorAll(".container .row");

const occupiedSeats = [
  [0, 7], // Row 1
  [3], // Row 2
  [4], // Row 3
  [2], // Row 4
  [5], // Row 5
  [4], // Row 6
];

rows.forEach((row, rowIndex) => {
  const seats = row.querySelectorAll(".seat");
  occupiedSeats[rowIndex].forEach((seatIndex) => {
    seats[seatIndex].classList.add("occupied");
  });
});
// *********************************************************************************
// *********************************************************************************
// const movieSelect = document.getElementById("movie")
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
// *********************************************************************************
// *********************************************************************************
const buttonstatus = document.getElementById("buynow");
buttonstatus.addEventListener("click", () => {
  alert(`Booking successful!!!`);
});

// *********************************************************************************
// *********************************************************************************
const videos = document.querySelectorAll('video');
  let currentVideoIndex = 0;
  
  videos[currentVideoIndex].play();
  
  videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
      video.style.display = 'none';
      currentVideoIndex = (index + 1) % videos.length;
      videos[currentVideoIndex].style.display = 'block';
      videos[currentVideoIndex].play();
    });
  });