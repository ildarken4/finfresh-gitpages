// Модальное окно
const modals = document.querySelectorAll('.modal');
const popup = document.querySelector('.popup');
let modalName;
let scrollPosition;

// Открыть модальное окно
function openModal(modalName) {
    let modal = document.getElementById(modalName);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Клик вне .popup
    document.addEventListener('mouseup', function (e) {
        if (!popup.contains(e.target)) {
            closeModal()
        }
    });
}

// Переключить модальное окно
let modal1, modal2;
function changeModal(modal1, modal2) {
    let openingModal = document.getElementById(modal2);
    let closingModal = document.getElementById(modal1);
    openingModal.classList.add("active");
    closingModal.classList.remove("active");
    // Клик вне .popup
    document.addEventListener('mouseup', function (e) {
        if (!popup.contains(e.target)) {
            closeModal()
        }
    });
}

// Закрыть модальное окно
function closeModal() {
    
    modals.forEach(function(item) {
        item.classList.remove("active");
    })
    document.body.style.overflow = "auto";
}

// Input маски
let phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs) {
    Inputmask({"mask": "+7 (999) 999-99-99"}).mask(phoneInputs);
}

let verifyInputs = document.querySelectorAll('.verify-input');
if (verifyInputs) {
    Inputmask("9 9 9 9 9", {placeholder: "-"}).mask(verifyInputs);
}

let seriesInput = document.getElementById('passport-series');
if (seriesInput) {
    Inputmask({"mask": "99 99"}).mask(seriesInput);
}

let numberInput = document.getElementById('passport-number');
if (numberInput) {
    Inputmask({"mask": "99 99 99"}).mask(numberInput);

}

let dateInputs = document.querySelectorAll('.masked-date');
if (dateInputs) {
    Inputmask({"mask": "99.99.9999"}).mask(dateInputs);
}

let codeInput = document.getElementById('passport-code');
if (codeInput) {
    Inputmask({"mask": "999-999"}).mask(codeInput);
}

let incomeInput = document.getElementById('reg-income');
if (incomeInput) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(incomeInput);
}

// Таймер на странице верификации

const smsTimer = document.getElementById('sms-timer');
const timerBlock = document.querySelector('.timer-block');
let timerCount = 59;
let timerInterval;

function updateTimer() {
    if (timerCount >= 0) {
        smsTimer.textContent = timerCount < 10 ? '0' + timerCount : timerCount;
        timerCount--;
    } else {
        timerBlock.style.display = 'none';
        clearInterval(timerInterval);
    }
}

if (smsTimer) {
    timerInterval = setInterval(updateTimer, 1000);

    function sendSms() {
        timerCount = 59;
        timerInterval = setInterval(updateTimer, 1000);
        timerBlock.style.display = 'inline';
    }
}


// Звезды рейтнга (оценка сервиса)
const ratingItems = document.querySelectorAll('.rating__item');
const sendRatingBtn = document.getElementById('send-rating');
let lastActiveIndex = -1;

ratingItems.forEach(function(item, index) {
    item.addEventListener('mouseenter', function() {
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
        
    });

    item.addEventListener('mouseleave', function() {
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        if (lastActiveIndex !== -1) {
            for (let i = 0; i <= lastActiveIndex; i++) {
                ratingItems[i].classList.add('active');
            }
        }
    });

    item.addEventListener('click', function() {
        lastActiveIndex = index;
        sendRatingBtn.classList.remove('btn-disabled');
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
    });
});


// Чаевые

const tipsItems = document.querySelectorAll('.tips__item');

tipsItems.forEach(function(tip) {
    tip.addEventListener('click', function() {
        tipsItems.forEach(function(tip) {
            tip.classList.remove('active');
        });

        tip.classList.add('active');

    });
});