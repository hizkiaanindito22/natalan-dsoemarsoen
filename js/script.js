// FUNGSI UTAMA COUNTDOWN
function startCountdown(targetTime) {
    const timerEl = document.getElementById("lockdownCountdownTimer");
    
    const updateTimer = () => {
        const now = Date.now(); 
        const dist = targetTime - now;

        if (dist < 0) { 
            document.getElementById("countdownSection").style.display = 'none'; 
            return; 
        }
        
        const days = Math.floor(dist / (1000 * 60 * 60 * 24));
        const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dist % (1000 * 60)) / 1000);
        
        timerEl.innerHTML = `
            <div class="time-card"><span class="time-number">${days}</span><span class="time-label">Hari</span></div>
            <div class="time-card"><span class="time-number">${String(hours).padStart(2, '0')}</span><span class="time-label">Jam</span></div>
            <div class="time-card"><span class="time-number">${String(minutes).padStart(2, '0')}</span><span class="time-label">Menit</span></div>
            <div class="time-card"><span class="time-number" style="color:#ccc;">${String(seconds).padStart(2, '0')}</span><span class="time-label">Detik</span></div>
        `;
    };
    
    updateTimer(); 
    setInterval(updateTimer, 1000);
}

// FUNGSI ANIMASI KALENDER (SOBEK KALENDER)
function triggerCalendarAnim() {
    const wrapper = document.getElementById('calendarFlip');
    if(!wrapper) return;
    wrapper.querySelectorAll('.tear-anim').forEach(e => e.remove());
    
    const page = document.getElementById('calPage');
    const monthEl = page.querySelector('.cal-month');
    const dayEl = page.querySelector('.cal-day');
    
    let currentDay = 24; 
    let currentMonth = "NOV";

    const interval = setInterval(() => {
        const newPage = page.cloneNode(true);
        newPage.classList.add('tear-anim');
        wrapper.appendChild(newPage);
        setTimeout(() => newPage.remove(), 600);

        currentDay++;
        if(currentMonth === "NOV" && currentDay > 30) {
            currentMonth = "DES";
            currentDay = 1;
            monthEl.style.background = "var(--accent-gold)";
            monthEl.style.color = "#000";
        }
        
        monthEl.innerText = currentMonth;
        dayEl.innerText = currentDay;

        if(currentMonth === "DES" && currentDay === 28) {
            clearInterval(interval);
        }
    }, 150);
}

// FUNGSI SCROLL & UNLOCK CONTENT
window.scrollToDetails = () => {
    const details = document.getElementById('eventDetailsSection');
    const loginScreen = document.getElementById('loginScreen');

    // Aktifkan scrolling pada body
    document.body.style.overflowY = 'auto';
    loginScreen.style.height = 'auto';
    loginScreen.style.overflow = 'visible';

    // Smooth Scroll ke detail
    setTimeout(() => {
        details.scrollIntoView({ behavior: 'smooth' });
        // Jalankan animasi kalender setelah scroll
        setTimeout(triggerCalendarAnim, 500); 
    }, 50); 
};

// INISIALISASI SAAT PAGE LOAD
window.onload = function() { 
    // Target: 26 Desember 2025, 10:00:00 WIB
    const targetDate = new Date(2025, 11, 26, 10, 0, 0).getTime();
    startCountdown(targetDate);
};