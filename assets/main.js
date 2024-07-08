// *********************************************************************************
// *********************************************************************************
const movies = [
  {
    value: 10,
    text: "Attach On Tian ($10)",
    url: "./assets/video/attachontitan.mp4",
  },
  {
    value: 12,
    text: "Demon Slayer ($12)",
    url: "./assets/video/demonslayder.mp4",
  },
  {
    value: 8,
    text: "Doraemon ($8)",
    url: "./assets/video/doraemon.mp4",
  },
  {
    value: 9,
    text: "One Piece ($9)",
    url: "./assets/video/onepiece.mp4",
  },
];

const movieSelect = document.getElementById("movie");

movies.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.value;
  option.textContent = movie.text;
  movieSelect.appendChild(option);
});

const videoPlayer = document.getElementById("video");

movieSelect.addEventListener("change", () => {
  const selectedVideoId = movieSelect.value;
  const selectedVideo = movies.find((movie) => movie.value == selectedVideoId);

  if (selectedVideo) {
    videoPlayer.src = selectedVideo.url;
    videoPlayer.load();
  }
});
// *********************************************************************************
// *********************************************************************************

const times = [
  { value: "08:00 AM", text: "08:00 AM" },
  { value: "09:00 AM", text: "09:00 AM" },
  { value: "10:00 AM", text: "10:00 AM" },
  { value: "10:00 AM", text: "11:00 AM" },
  { value: "12:00 PM", text: "12:00 PM" },
  { value: "01:00 PM", text: "01:00 PM" },
  { value: "02:00 PM", text: "02:00 PM" },
  { value: "03:00 PM", text: "03:00 PM" },
  { value: "04:00 PM", text: "04:00 PM" },
  { value: "05:00 PM", text: "05:00 PM" },
  { value: "06:00 PM", text: "06:00 PM" },
  { value: "07:00 PM", text: "07:00 PM" },
  { value: "08:00 PM", text: "08:00 PM" },
  { value: "09:00 PM", text: "09:00 PM" },
  { value: "10:00 PM", text: "10:00 PM" },
  { value: "11:00 PM", text: "11:00 PM" },
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

const submitButton = document.getElementById("myBtn");

submitButton.addEventListener("click", function () {
  // const selectedValue = movieSelect.value;
  const selectedText = movieSelect.options[movieSelect.selectedIndex].text;
  const selectedTime = timePicker.value;
  const selectedDate = datePicker.value;

  // localStorage.setItem("selectedMovieValue", selectedValue);
  localStorage.setItem("selectedMovieText", selectedText);
  localStorage.setItem("selectedTime", selectedTime);
  localStorage.setItem("selectedDate", selectedDate);

  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  const selectedPostion = localStorage
    .getItem("selectedSeats")
    .replace(/\[|\]/g, "");
  const selectedSeatsCount = localStorage.getItem("selectedSeatsCount");
  const selectedSeatsCountTotal = localStorage.getItem(
    "selectedSeatsCountTotal"
  );

  const billElement1 = document.getElementById("billdetail1");
  const billElement2 = document.getElementById("billdetail2");
  const billElement3 = document.getElementById("billdetail3");
  const billElement4 = document.getElementById("billdetail4");
  const billElement5 = document.getElementById("billdetail5");
  const billElement6 = document.getElementById("billdetail6");
  const billElement7 = document.getElementById("billdetail7");

  let movieInfo = `Selected Movie: ${selectedText}\n`;
  let timeInfo = `Selected Time: ${selectedTime}\n`;
  let dateInfo = `Selected Date: ${selectedDate}\n`;
  let movieInfovalue = `Number of Seats Booked: ${selectedSeatsCount}\n`;
  let postionInfo = `Position of Seats Booked: ${selectedPostion}\n`;
  let ticketPrice = `Ticket Price: ${selectedMoviePrice} $`;
  let totalPrice = `Total Price: ${selectedSeatsCountTotal} $\n`;

  billElement1.textContent = movieInfo;
  billElement2.textContent = dateInfo;
  billElement3.textContent = timeInfo;
  billElement4.textContent = movieInfovalue;
  billElement5.textContent = postionInfo;
  billElement6.textContent = ticketPrice;
  billElement7.textContent = totalPrice;
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
  localStorage.setItem("selectedSeatsCount", selectedSeatsCount);
  localStorage.setItem(
    "selectedSeatsCountTotal",
    selectedSeatsCount * ticketPrice
  );
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

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
