import express from 'express';

const app = express();
app.use(express.json());
const port = 3000;


const posts = [
  { id: 1, text: 'Das ist von mir' },
  { id: 2, text: 'Hallo Welt!' },
  { id: 3, text: 'Test123' },
];


app.get('/hello-world', (req, res) => {
  res.send('Hello World!');
});



// Aufgabe e)
app.get('/posts', (req, res) => {
  res.json(posts);
});


/* 
//Aufgabe g) Wiedergabe der Eingabe
app.post('/posts', (req, res) => {
  res.send(req.body)
  console.log(req.body)
})
*/


//Aufgabe g) ID zählt nach oben 
app.post('/posts', (req, res) => {
  console.log(req.body)
  const { text } = req.body; // Text aus dem Request-Body auslesen

  // Letzte Id ermitteln (0 wenn kein Post vorhanden)
  const lastId = posts.length > 0 ? posts[posts.length - 1].id : 0;
  const newId = lastId + 1;

  // Neuen Post mit inkrementierter Id erstellen
  const newPost = { id: newId, text };

  // Neuen Post zum Array hinzufügen
  posts.push(newPost);

  // Neue Ressource als JSON zurückgeben mit Status 201 (Created)
  res.status(201).json(newPost);

  console.log('Neuer Post erstellt:', newPost);
});

//Aufgabe h)
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Id aus Route-Parameter extrahieren
  const { text } = req.body;              // Neuen Text aus Request-Body lesen

  // Index des Posts im Array finden
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    // Wenn kein Post mit dieser Id existiert
    return res.status(404).json({ error: 'Post nicht gefunden' });
  }

  // Post aktualisieren
  posts[postIndex].text = text;

  // Aktualisierten Post zurückgeben
  res.status(200).json(posts[postIndex]);
});


//Aufgabe i)
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Id als Zahl aus Parametern

  // Index des Posts mit passender Id suchen
  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    // Post mit solcher Id nicht gefunden
    return res.status(404).json({ error: 'Post nicht gefunden' });
  }

  // Post aus Array entfernen
  posts.splice(postIndex, 1);

  // Erfolgsnachricht zurückgeben
  res.status(200).json({ message: 'Post gelöscht' });
});



app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});