// === Меню и навигация ===
function toggleMenu() {
  document.getElementById('menu').classList.toggle('open');
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('menu').classList.remove('open');
}

// === Фейковые запросы ===
function fakeRequest() {
  const status = document.getElementById('status');
  status.textContent = "Запрос отправлен. Ожидание ответа сервера...";
  setTimeout(() => {
    status.textContent = "Ответ не получен. Повторите попытку позже.";
  }, 4000);
}

// === Декодирование У.Ф.С. ===
const alphabet = [
  "А","Б","В","Г","Д","Е","Ж","З","И","Й","К","Л","М","Н","О","П",
  "Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"
];

function decodeUFS() {
  const input = document.getElementById("ufsInput").value.toUpperCase().trim();
  const status = document.getElementById("ufsStatus");
  const output = document.getElementById("ufsOutput");

  if (!input) {
    status.textContent = "Ошибка: данные отсутствуют.";
    output.textContent = "";
    return;
  }

  const len = input.length;
  const base = alphabet.length + 1; // 33
  let result = [];

  for (let char of input) {
    if (alphabet.includes(char)) {
      let encoded = alphabet.indexOf(char) + 1;
      let a = Math.max(encoded, len);
      let b = Math.min(encoded, len);
      let restored = a + b;
      result.push(restored <= alphabet.length ? alphabet[restored - 1] : "?");
    } else if (!isNaN(char)) {
      let num = parseInt(char);
      let a = Math.max(num, base);
      let b = Math.min(num, base);
      result.push((a - b).toString());
    } else {
      result.push("?");
    }
  }

  status.textContent = "Расшифровка завершена.";
  output.textContent = "Фрагмент: " + input + "\nДлина: " + len + "\nРезультат: " + result.join("");
}

// === Архивы ===
function activateArchive() {
  const input = document.getElementById("archiveInput").value.trim().toUpperCase();
  const status = document.getElementById("archiveStatus");
  const output = document.getElementById("archiveOutput");

  output.textContent = "";
  if (!input) {
    status.textContent = "Ошибка: код не введён.";
    return;
  }

  const knownCodes = {
    "31517А": { record: "Запись 002", word: "ФРАГМЕНТ", guaranteedDigit: 4 },
    "73952J": { record: "Запись 004", word: "ПРОТОКОЛ", guaranteedDigit: 8 }
  };

  function generatePersonalCode(guaranteedDigit) {
    let code = [];
    for (let i = 0; i < 5; i++) code.push(Math.floor(Math.random() * 10));
    code[3] = guaranteedDigit;
    return code.join("");
  }

  if (knownCodes[input]) {
    const archive = knownCodes[input];
    const personalCode = generatePersonalCode(archive.guaranteedDigit);
    status.textContent = "Код архива успешно активирован.";
    output.textContent =
      "Доступ подтверждён.\n\n" +
      "Связанный фрагмент: " + archive.record + "\n" +
      "Ключевое слово: " + archive.word + "\n\n" +
      "Отправьте фотографию этого индивидуального кода\n" +
      "тому, от кого вы получили доступ к сайту.\n\n" +
      "Ваш индивидуальный код:\n" + personalCode;
  } else {
    const fakeCode = generatePersonalCode(Math.floor(Math.random() * 10));
    status.textContent = "Архив не найден.";
    output.textContent =
      "Код не распознан.\n\nСистема сгенерировала временный идентификатор:\n" +
      fakeCode + "\n\nКонтекст отсутствует.";
  }
}
