const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
let MatteoBarcellonaLibrary = require('./functions.js');
let data = require('./data/person.json');
let app = express(); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/immagini', express.static(path.join(__dirname, 'immagini')));
app.use('/expl', express.static(path.join(__dirname, 'expl')));
app.use(express.static('public'));

// Funzione per autenticare l'utente
function authenticate(username, password) {
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
  console.log('Utenti nel file:', users);

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    console.log('Autenticazione riuscita:', user);
  } else {
    console.log('Autenticazione fallita per', username);
  }

  return user;
}



app.get('/', (req, res) => {
  res.render('home');
});
app.post('/', function (req, res) {
  res.render('home');
});
app.get('/hh', function (req, res) {
  res.render('htmle');
});
app.get('/hh2', function (req, res) {
  res.render('csse');
});
app.get('/hh3', function (req, res) {
  res.render('javae');
});
app.get('/hh4', function (req, res) {
  res.render('c++e');
});
app.get('/hh5', function (req, res) {
  res.render('jse');
});
app.get('/hh6', function (req, res) {
  res.render('pye');
});
app.get('/hh7', function (req, res) {
  res.render('phpe');
});
app.get('/hh8', function (req, res) {
  res.render('nodejse');
});
app.get('/hh9', function (req, res) {
  res.render('jj');
});
app.get('/hh10', function (req, res) {
  res.render('webse');
});
app.get('/hh11', function (req, res) {
  res.render('c#e');
});
app.get('/hh12', function (req, res) {
  res.render('tse');
});
app.get('/hh13', function (req, res) {
  res.render('an');
});
app.get('/hh14', function (req, res) {
  res.render('reac');
});
app.get('/hh15', function (req, res) {
  res.render('sql');
});
app.get('/hh16', function (req, res) {
  res.render('XMLep.html');
});

app.get('/p1', function (req, res) {
  res.render('certificati');
});
app.get('/p2', function (req, res) {
  res.render('videogame');
});
app.get('/p3', function (req, res) {
  res.render('sd');
});
app.get('/p4', function (req, res) {
  res.render('sd');
});
app.get('/p5', function (req, res) {
  res.render('wde');
});
app.get('/p6', function (req, res) {
  res.render('bs5');
});
app.get('/p7', function (req, res) {
  res.render('si');
});
app.get('/p8', function (req, res) {
  res.render('wbs');
});
app.get('/p9', function (req, res) {
  res.render('app');
});
app.get('/p10', function (req, res) {
  res.render('datab');
});
app.get('/r', function (req, res) {
  res.render('registrati');
});
app.get('/w', function (req, res) {
  res.render('win');
});


app.get('/log', (req, res) => {
  res.render('login');
});

//1
app.post('/log', function (req, res) {
  res.render('login');
});

app.get('/postit', (req, res) => {
  var data1;
  data1 = fs.readFileSync('./data/person.json', 'utf8', (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  res.render('postit', { data: JSON.parse(data1) });
});

//
app.get('/postit2', (req, res) => {
  var data1;
  data1 = fs.readFileSync('./data/users.json', 'utf8', (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  res.render('postit2', { data: JSON.parse(data1) });
});

app.get('/json', function (req, res) {
  res.sendFile(__dirname + '/data/person.json');
});

app.post('/scrivi', function (req, res) {
  let size = Object.keys(data).length;
  let datoJSON = JSON.parse(
    fs.readFileSync('./data/person.json', 'utf8', function (err) {
      if (err) {
        console.log('');
      }
    })
  );
  let person = {
    Nome: req.body.Nome,
    Cognome: req.body.Cognome,
    Num:req.body.Num,
    Gmail:req.body.Gmail,
    Domanda:req.body.Domanda
  };
  datoJSON.push(person);
  console.log(datoJSON);
  
  fs.writeFile('./data/person.json', JSON.stringify(datoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log('i dati li ho scritti nel file person.json');
  });
  res.redirect('/');
});


//registrati
app.post('/s22', function (req, res) {
  let size = Object.keys(data).length;
  let datoJSON = JSON.parse(
    fs.readFileSync('./data/users.json', 'utf8', function (err) {
      if (err) {
        console.log('');
      }
    })
  );
  
  let person = {
    username:req.body.username,
    password:req.body.password,
  };
  
  datoJSON.push(person);
  console.log(datoJSON);

  fs.writeFile('./data/users.json', JSON.stringify(datoJSON), (err) => {
    if (err) {
      throw err;
    }
    console.log('i dati li ho scritti nel file person.json');
  });
  res.redirect('/');
});


app.post('/s2', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = authenticate(username, password);

  if (user) {
    // Se l'autenticazione ha successo, reindirizza alla pagina App_GrantedUser
    res.redirect('/w');
  } else {
    // Se l'autenticazione fallisce, reindirizza a notPermission.htm
    res.sendFile(__dirname + '/public/notPermission.htm');
  }
});


// Codice di autenticazione
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

