const express = require('express');     //загрузка библиотеки, библиотекка предназначена для упрощенного создания серверов
const pwth = require('path');           //модуль для работы с папками  
const fs = require('fs');               //для файловой системы
const path = require('path');

const COUNTER_FILE = path.join(__dirname, 'counter.json'); // 

const app = express();                  //создание самого приложения(обьекта)
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));      //для навигации по сайту - public/index.html  

// Читает счётчик из файла. Если файла нет – возвращает 0.
function readCounter() {
  try {
    const data = fs.readFileSync(COUNTER_FILE, 'utf8');
    const json = JSON.parse(data);
    return typeof json.likes === 'number' ? json.likes : 0;
  } catch (err) {
    return 0;
  }
}

// Записывает счётчик в файл
function writeCounter(value) {
  const data = JSON.stringify({ likes: value });
  fs.writeFileSync(COUNTER_FILE, data, 'utf8');
}

let likeCount = readCounter(); 

app.get('/api/likes', (req, res) => { //если пользователь зашел на сайт отображение лайков
  res.json({ likes: likeCount });
});

app.post('/api/like', (req, res) => { //если пользователь нажал на кнопку +1
  likeCount++;
  writeCounter(likeCount);    // сохранить в файл
  res.json({ likes: likeCount });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

