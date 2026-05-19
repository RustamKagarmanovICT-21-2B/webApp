const express = require('express');     //загрузка библиотеки, библиотекка предназначена для упрощенного создания серверов
const pwth = require('path');           //модуль для работы с папками  

const app = express();                  //создание самого приложения(обьекта)
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));      //для навигации по сайту - public/index.html  

let likeCount = 0;

app.get('/api/likes', (req, res) => {
  res.json({ likes: likeCount });
});

app.post('/api/like', (req, res) => {
  likeCount++;
  res.json({ likes: likeCount });
});