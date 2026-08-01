const LAYOUT = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const ROW_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const cinemaEl  = document.getElementById('cinema');
const countEl   = document.getElementById('count');
const totalEl   = document.getElementById('total');
const movieSel  = document.getElementById('movie-sel');
const clearBtn  = document.getElementById('clear-btn');

let ticketPrice = +movieSel.value;
let seatEls = [];   // 2D array matching LAYOUT

function buildCinema() {
  cinemaEl.innerHTML = '';
  seatEls = [];

  LAYOUT.forEach((row, ri) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const label = document.createElement('span');
    label.className = 'row-label';
    label.textContent = ROW_LABELS[ri];
    rowDiv.appendChild(label);

    const rowSeats = [];
    row.forEach((occupied, si) => {
      const seat = document.createElement('div');
      seat.className = 'seat' + (occupied ? ' occupied' : '');
      // Aisle gaps after column index 1 and 5
      if (si === 1 || si === 5) seat.classList.add('gap-right');
      rowDiv.appendChild(seat);
      rowSeats.push(seat);
    });

    seatEls.push(rowSeats);
    cinemaEl.appendChild(rowDiv);
  });

  restoreState();
}

function getSelected() {
  return seatEls.flat().filter(s => s.classList.contains('selected'));
}

function updateCount() {
  const n = getSelected().length;
  countEl.textContent = n;
  totalEl.textContent = '$' + (n * ticketPrice);
  saveState();
}

function saveState() {
  try {
    const indices = [];
    seatEls.flat().forEach((s, i) => {
      if (s.classList.contains('selected')) indices.push(i);
    });
    localStorage.setItem('seat_selection', JSON.stringify(indices));
    localStorage.setItem('seat_movie',     movieSel.selectedIndex);
  } catch (e) {}
}

function restoreState() {
  try {
    const savedMovie = localStorage.getItem('seat_movie');
    if (savedMovie !== null) {
      movieSel.selectedIndex = +savedMovie;
      ticketPrice = +movieSel.value;
    }

    const saved = JSON.parse(localStorage.getItem('seat_selection') || '[]');
    const flat  = seatEls.flat();
    saved.forEach(i => {
      if (flat[i] && !flat[i].classList.contains('occupied'))
        flat[i].classList.add('selected');
    });
  } catch (e) {}

  updateCount();
}

// Event: click a seat
cinemaEl.addEventListener('click', e => {
  const seat = e.target.closest('.seat');
  if (!seat || seat.classList.contains('occupied')) return;
  seat.classList.toggle('selected');
  updateCount();
});

// Event: change movie
movieSel.addEventListener('change', () => {
  ticketPrice = +movieSel.value;
  updateCount();
});

// Event: clear all
clearBtn.addEventListener('click', () => {
  getSelected().forEach(s => s.classList.remove('selected'));
  updateCount();
});

// Boot
buildCinema(); 