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
let rating = 0;
let tipsValue = 0;
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
        rating = item.getAttribute("data-rate");
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

if(tipsItems) {
    tipsItems.forEach(function(tip) {
        tip.addEventListener('click', function() {
            tipsItems.forEach(function(tip) {
                tip.classList.remove('active');
            });
            if (!tip.classList.contains("checked")) {
                tip.classList.add('active','checked');
                tipsValue = tip.getAttribute('data-tip');
            } else {
                tip.classList.remove('active','checked');
                tipsValue = 0;
            }
        });
    });
}

// Вывод значения оценки и чаевых (просто в консоль)
if (sendRatingBtn) {
    sendRatingBtn.addEventListener('click', function () {
        console.log('rating: ', rating);
        console.log('tipsValue: ', tipsValue);
    })
}


// Для input type=range
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

// Ползунок - выбор суммы
function updateSum() {
    let inp = document.getElementById("sum-input");
    let out = document.getElementById("sum-output");
    let sumResults = document.querySelectorAll('.result-sum');
    let formattedValue = parseFloat(inp.value).toLocaleString('ru-RU');
    out.textContent = formattedValue + " ₽";
    sumResults.forEach(function (sumResult) {
        sumResult.textContent = formattedValue + " ₽";
    })
    out.style.left = (inp.value - inp.min) / (inp.max - inp.min) * 100 + "%";
}

document.getElementById("sum-input").addEventListener('input', updateSum);
updateSum();

// Ползунок - выбор кол-ва дней
function updateTerm() {
    let inp = document.getElementById("term-input");
    let out = document.getElementById("term-output");
    let calcDays = document.getElementById("calc-days");
    let dateResults = document.querySelectorAll(".result-date");
    let value = inp.value;
    let today = new Date();
    let futureDate = new Date(today.getTime() + value * 24 * 60 * 60 * 1000);

    let day = futureDate.getDate();
    let month = futureDate.getMonth() + 1; 
    let year = futureDate.getFullYear().toString().substr(2,2);
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let formattedDate = day + '.' + month + '.' + year;

    let lastDigit = value % 10;
    let termText;
    if (value > 10 && value < 20) {
        termText = "дней";
    } else if (lastDigit === 1) {
        termText = "день";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        termText = "дня";
    } else {
        termText = "дней";
    }

    out.textContent = value + " " + termText;
    calcDays.textContent = value + " " + termText;
    dateResults.forEach(function (dateResult) {
        dateResult.textContent = formattedDate;
    });
    out.style.left = (inp.value - inp.min) / (inp.max - inp.min) * 100 + "%";
}

document.getElementById("term-input").addEventListener('input', updateTerm);
updateTerm();


// faq на главной
const questions = document.querySelectorAll('.faq__question');
  const answers = document.querySelectorAll('.faq__answer');

  questions.forEach(function(question) {
    question.addEventListener('click', function() {
      const toggler = this.querySelector('.burger-toggler');
      const answer = this.nextElementSibling;

      if (answer.classList.contains('opened')) {
        answer.classList.remove('opened');
        toggler.classList.remove('active');
      } else {
        answers.forEach(function(answer) {
          answer.classList.remove('opened');
        });

        answer.classList.add('opened');

        document.querySelectorAll('.burger-toggler').forEach(function(toggler) {
          toggler.classList.remove('active');
        });

        toggler.classList.add('active');
      }
    });
  });

// Бургер меню 

const mobNavToggler = document.querySelector('.mob-nav-toggler');
const headerNav = document.querySelector('.header__nav');

mobNavToggler.addEventListener('click', function() {
    this.classList.toggle('active');
    headerNav.classList.toggle('opened');
});
