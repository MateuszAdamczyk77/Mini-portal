const samochody = [
  ["Toyota Supra MK4", "Legendarna japońska sportówka z silnikiem 2JZ-GTE."],
  ["BMW M3 E46", "Kultowe sportowe sedan z rzędową szóstką."],
  ["Ford Mustang GT", "Amerykański muscle car z silnikiem V8."],
  ["Nissan Skyline R34 GT-R", "Ikona japońskiej motoryzacji z napędem AWD."],
  ["Porsche 911 Turbo", "Klasyczny tylnosilnikowy sportowiec z Niemiec."],
  ["Mazda MX-5 Miata", "Lekki roadster idealny na kręte drogi."],
  ["Honda Civic Type R", "Hot hatch z legendarnym silnikiem VTEC."],
  ["Chevrolet Corvette C8", "Amerykański supercar ze środkowym silnikiem."],
  ["Audi RS6 Avant", "Sportowe kombi z silnikiem V8 twin-turbo."],
  ["Mercedes-AMG GT", "Luksusowy grand tourer od AMG."],
  ["Subaru Impreza WRX STI", "Rajdowa legenda z napędem symetrycznym AWD."],
  ["Lamborghini Huracán", "Włoski supercar z atmosferycznym V10."],
];

const ciekawostki = [
  "Czy wiesz, że pierwszy samochód osiągał prędkość zaledwie 16 km/h?",
  "Toyota Supra MK4 z filmu Fast & Furious sprzedała się za 550 000$!",
  "Bugatti Chiron potrzebuje zaledwie 2.4s do setki.",
  "Mazda MX-5 to najczęściej sprzedawany roadster na świecie.",
  "Silnik V12 w Lamborghini Aventador kręci się do 8500 obr/min!",
  "Nissan GT-R jest nazywany 'Godzillą' ze względu na swoją moc.",
  "Porsche 911 produkowane jest nieprzerwanie od 1963 roku.",
  "Koenigsegg Jesko osiąga teoretycznie ponad 530 km/h!",
];

const MotywBtn = document.querySelector("#przyciskMotyw");
const loginBtn = document.querySelector("#przyciskLogowania");
const powitanie = document.querySelector("#powitanieTekst");
const cytat = document.querySelector("#cytatDnia");
const szukajInput = document.querySelector("#szukajInput");
const loginInput = document.querySelector("#loginInput");
const loginZatwierdzBtn = document.querySelector("#loginZatwierdz");
const loginBlad = document.querySelector("#loginBlad");
const kontaktWyslijBtn = document.querySelector("#kontaktWyslij");
const kontaktImie = document.querySelector("#kontaktImie");
const kontaktEmail = document.querySelector("#kontaktEmail");
const kontaktWiadomosc = document.querySelector("#kontaktWiadomosc");
const kontaktBlad = document.querySelector("#kontaktBlad");

const loginPattern = /^[a-zA-Z0-9]{3,15}$/;
const imiePattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]{3,50}$/;
const emailPattern = /^[^\s]+@[^\s@]+\.[^\s@]+$/;
const wiadomoscPattern = /^[\s\S]{10,500}$/;

function wyswietlSamochody(lista) {
  let kontener = document.querySelector("#kartyKontener");
  if (!kontener) return;

  kontener.innerHTML = "";
  for (let i = 0; i < lista.length; i++) {
    kontener.innerHTML += `
        <div class="karta">
          <h3>${lista[i][0]}</h3>
          <p>${lista[i][1]}</p>
        </div>`;
  }

  if (lista.length === 0) {
    kontener.innerHTML =
      '<p class="brak-wynikow">Nie znaleziono samochodów.</p>';
  }
}

function losowyCytat(tablica) {
  return tablica[Math.floor(Math.random() * tablica.length)];
}

function wyloguj() {
  localStorage.removeItem("login");
  loginBtn.innerHTML = "Zaloguj się";
  powitanie.innerHTML = "";
}

// Wyswietl samochody
wyswietlSamochody(samochody);

// Wyswietl Losowy cytat
if (cytat) cytat.innerHTML = losowyCytat(ciekawostki);

// Filtrowanie na zywo
if (szukajInput) {
  szukajInput.addEventListener("input", () => {
    let tekst = szukajInput.value.toLowerCase();
    let wynik = samochody.filter((samochod) => {
      return samochod[0].toLowerCase().includes(tekst);
    });
    wyswietlSamochody(wynik);
  });
}

// Dark/light mode
MotywBtn.addEventListener("click", () => {
  if (document.body.className === "dark") {
    document.body.className = "";
    MotywBtn.innerHTML = "Tryb ciemny";
  } else {
    document.body.className = "dark";
    MotywBtn.innerHTML = "Tryb jasny";
  }
});

// Sprawdz stan logowania z localStorage
let login = localStorage.getItem("login")
if (login) {
  loginBtn.innerHTML = "Wyloguj"
  powitanie.innerHTML = `Witaj ${login}!`
}

loginBtn.addEventListener("click", () => {
  if (localStorage.getItem("login")) {
    wyloguj();
  } else {
    window.location.href = "login.html";
  }
});

// Strona logowania - zatwierdzenie
if (localStorage.getItem("login")) {
  window.location.href = "index.html";
}

loginZatwierdzBtn.addEventListener("click", () => {
  let login = loginInput.value.trim();
  if (login === "" || !loginPattern.test(login)) {
    loginBlad.innerHTML =
      "Login musi zawierać od 3 do 15 znaków i zawierać tylko litery i cyfry.";
  } else {
    localStorage.setItem("login", login);
    window.location.href = "index.html";
  }
});

// Formularz kontaktowy - walidacja
kontaktWyslijBtn.addEventListener("click", () => {
  let imie = kontaktImie.value.trim();
  let email = kontaktEmail.value.trim();
  let wiadomosc = kontaktWiadomosc.value.trim();

  if (!imiePattern.test(imie)) {
    kontaktBlad.innerHTML =
      "Imię musi zawierać od 3 do 50 znaków i tylko litery.";
  } else if (!emailPattern.test(email)) {
    kontaktBlad.innerHTML = "Podaj poprawny adres e-mail.";
  } else if (!wiadomoscPattern.test(wiadomosc)) {
    kontaktBlad.innerHTML =
      "Wiadomość musi zawierać od 10 do 500 znaków.";
  } else {
    kontaktBlad.innerHTML = "";
    kontaktImie.value = "";
    kontaktEmail.value = "";
    kontaktWiadomosc.value = "";
    alert("Wiadomość została wysłana!");
  }
});
