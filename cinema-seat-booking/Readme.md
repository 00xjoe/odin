<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=yes">
  <title>🎬 Cinema Seat Booking</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: linear-gradient(135deg, #1a1e2b 0%, #2a2f3f 100%);
      font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      margin: 0;
    }

    .cinema-container {
      max-width: 700px;
      width: 100%;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-radius: 3.5rem;
      padding: 2rem 1.8rem 2.5rem;
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.2s ease;
    }

    h1 {
      text-align: center;
      font-size: 2.2rem;
      font-weight: 600;
      letter-spacing: 2px;
      color: #f7e3af;
      text-shadow: 0 4px 10px rgba(0,0,0,0.5);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }
    h1 span {
      font-size: 2rem;
    }

    .movie-selector {
      background: rgba(0, 0, 0, 0.35);
      border-radius: 3rem;
      padding: 0.9rem 1.8rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
    }

    .movie-selector label {
      color: #ddd;
      font-weight: 500;
      font-size: 1rem;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    select {
      background: #1e2330;
      color: #f0e6c5;
      border: 1px solid #5a5f72;
      padding: 0.7rem 2.2rem 0.7rem 1.5rem;
      border-radius: 2.5rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      outline: none;
      appearance: none;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23f7e3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>');
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1.2rem;
      transition: 0.2s;
    }

    select:hover {
      border-color: #f7b32b;
      background-color: #262d3a;
    }

    .screen-curved {
      perspective: 400px;
      margin: 1.2rem 0 2.2rem;
    }

    .screen {
      background: #e8e9f3;
      height: 70px;
      width: 85%;
      margin: 0 auto;
      border-radius: 50% / 80% 80% 0 0;
      box-shadow: 0 12px 30px rgba(255, 255, 200, 0.5), 0 0 20px #f7e3af;
      background: radial-gradient(circle at 50% 0%, #ffffff, #c0c5d0);
      transform: rotateX(2deg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1e1e2a;
      font-weight: 700;
      letter-spacing: 4px;
      font-size: 1rem;
      text-transform: uppercase;
      border: 1px solid rgba(255,255,200,0.6);
    }

    .seats-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.7rem;
      margin: 1.8rem 0 1.5rem;
    }

    .row {
      display: flex;
      gap: 0.6rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .seat {
      width: 38px;
      height: 38px;
      background: #3f9e5e; /* available green */
      border-radius: 10px 10px 6px 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 6px 0 #1e4d2b, 0 8px 12px rgba(0,0,0,0.4);
      border: 1px solid #81c784;
      position: relative;
    }

    .seat:hover:not(.occupied):not(.selected) {
      background: #5fc47a;
      transform: scale(1.06);
      box-shadow: 0 6px 0 #266335, 0 10px 16px rgba(0,0,0,0.5);
    }

    .seat.selected {
      background: #4a90e2;
      box-shadow: 0 6px 0 #1f3b60, 0 0 18px #5b9cf5;
      border-color: #a0c4ff;
      transform: scale(1.02);
    }

    .seat.occupied {
      background: #c44b4b;
      cursor: not-allowed;
      box-shadow: 0 6px 0 #6b2c2c, 0 4px 8px rgba(0,0,0,0.6);
      border-color: #d97c7c;
      opacity: 0.9;
    }

    .seat.occupied:hover {
      transform: none;
      background: #c44b4b;
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 2.2rem;
      margin: 1.5rem 0 1.8rem;
      flex-wrap: wrap;
      background: rgba(0,0,0,0.25);
      padding: 0.8rem 1.5rem;
      border-radius: 2.5rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #e0e0e0;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .legend-color {
      width: 22px;
      height: 22px;
      border-radius: 6px 6px 4px 4px;
      box-shadow: 0 3px 0 rgba(0,0,0,0.4);
    }

    .legend-color.available { background: #3f9e5e; border: 1px solid #81c784; }
    .legend-color.selected { background: #4a90e2; border: 1px solid #a0c4ff; }
    .legend-color.occupied { background: #c44b4b; border: 1px solid #d97c7c; }

    .info-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(20, 22, 30, 0.8);
      border-radius: 3rem;
      padding: 1rem 2rem;
      backdrop-filter: blur(8px);
      margin-top: 0.6rem;
      flex-wrap: wrap;
      gap: 1.2rem;
      border: 1px solid rgba(255,255,255,0.15);
    }

    .count-price {
      display: flex;
      gap: 2rem;
      color: #f7e3af;
      font-weight: 600;
      font-size: 1.2rem;
    }

    .count-price span {
      color: white;
      background: #2f354a;
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      margin-left: 0.4rem;
    }

    .reset-btn {
      background: #ffb347;
      border: none;
      color: #1a1e2b;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.7rem 1.8rem;
      border-radius: 2.5rem;
      letter-spacing: 0.6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      transition: 0.2s;
      box-shadow: 0 6px 0 #cc8a2a, 0 6px 12px black;
      border: 1px solid #ffcd94;
    }

    .reset-btn:hover {
      background: #ffa01c;
      transform: translateY(-1px);
      box-shadow: 0 7px 0 #b46f1a, 0 10px 16px black;
    }

    .reset-btn:active {
      transform: translateY(2px);
      box-shadow: 0 3px 0 #b46f1a, 0 6px 10px black;
    }

    @media (max-width: 500px) {
      .cinema-container {
        padding: 1.5rem 1rem;
      }
      .seat {
        width: 32px;
        height: 32px;
      }
      .info-panel {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="cinema-container">
    <h1>
      <span>🎬</span> CINEMA SEAT BOOKING <span>🍿</span>
    </h1>

    <div class="movie-selector">
      <label>🎟️ Pick a movie</label>
      <select id="movie-select">
        <option value="12">🍿 The Grand Adventure ($12)</option>
        <option value="14">🦸‍♂️ Hero's Journey ($14)</option>
        <option value="10">🎥 Retro Classics ($10)</option>
        <option value="16">🌌 Space Odyssey ($16)</option>
      </select>
    </div>

    <div class="screen-curved">
      <div class="screen">SCREEN</div>
    </div>

    <div class="seats-grid" id="seats-container">
      <!-- Seats will be generated by JavaScript -->
    </div>

    <div class="legend">
      <div class="legend-item"><div class="legend-color available"></div> Available</div>
      <div class="legend-item"><div class="legend-color selected"></div> Selected</div>
      <div class="legend-item"><div class="legend-color occupied"></div> Occupied</div>
    </div>

    <div class="info-panel">
      <div class="count-price">
        <div>🪑 <span id="seat-count">0</span> Seats</div>
        <div>💰 $<span id="total-price">0</span></div>
      </div>
      <button class="reset-btn" id="reset-button">🧹 Reset</button>
    </div>
  </div>

  <script>
    (function() {
      // ----- DOM elements -----
      const seatsContainer = document.getElementById('seats-container');
      const movieSelect = document.getElementById('movie-select');
      const seatCountSpan = document.getElementById('seat-count');
      const totalPriceSpan = document.getElementById('total-price');
      const resetBtn = document.getElementById('reset-button');

      // ----- State -----
      let ticketPrice = parseInt(movieSelect.value, 10); // default 12

      // ----- Generate seat layout (8 rows, 10 seats each) with some occupied -----
      function generateSeats() {
        seatsContainer.innerHTML = '';
        const rows = 8;
        const seatsPerRow = 10;
        
        // Predefine occupied indices (row, col) - fixed pattern but dynamic feel
        const occupiedSet = new Set();
        // Create some random-looking but stable occupied seats
        const occupiedPositions = [
          [0, 3], [0, 7], [1, 1], [1, 5], [2, 8], [3, 2], [3, 9],
          [4, 4], [4, 6], [5, 0], [5, 7], [6, 3], [6, 8], [7, 1], [7, 5]
        ];
        occupiedPositions.forEach(([r, c]) => {
          if (r < rows && c < seatsPerRow) {
            occupiedSet.add(`${r}-${c}`);
          }
        });

        for (let row = 0; row < rows; row++) {
          const rowDiv = document.createElement('div');
          rowDiv.className = 'row';
          
          for (let col = 0; col < seatsPerRow; col++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            const seatId = `${row}-${col}`;
            seat.dataset.row = row;
            seat.dataset.col = col;
            
            if (occupiedSet.has(seatId)) {
              seat.classList.add('occupied');
            }
            // available by default (green)
            rowDiv.appendChild(seat);
          }
          seatsContainer.appendChild(rowDiv);
        }
      }

      // ----- Update UI: count selected seats & total price -----
      function updateSummary() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const count = selectedSeats.length;
        seatCountSpan.textContent = count;
        totalPriceSpan.textContent = (count * ticketPrice).toFixed(0);
      }

      // ----- Toggle seat selection (only for non-occupied) -----
      function handleSeatClick(event) {
        const seat = event.target;
        // Ensure we clicked on a seat div and not occupied
        if (!seat.classList.contains('seat') || seat.classList.contains('occupied')) {
          return;
        }
        
        // Toggle selected class
        seat.classList.toggle('selected');
        updateSummary();
      }

      // ----- Reset all selections -----
      function resetSelections() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeats.forEach(seat => seat.classList.remove('selected'));
        updateSummary();
      }

      // ----- Update ticket price when movie changes -----
      function handleMovieChange() {
        ticketPrice = parseInt(movieSelect.value, 10);
        updateSummary();
      }

      // ----- Attach event listeners (delegation for seats) -----
      function bindEvents() {
        // Use event delegation on seats container for dynamic seats
        seatsContainer.addEventListener('click', handleSeatClick);
        
        movieSelect.addEventListener('change', handleMovieChange);
        
        resetBtn.addEventListener('click', resetSelections);
      }

      // ----- Initialize everything -----
      function init() {
        generateSeats();
        bindEvents();
        // Ensure price is set from current select value
        ticketPrice = parseInt(movieSelect.value, 10);
        updateSummary();
      }

      // Start the app
      init();
    })();
  </script>
</body>
</html>
