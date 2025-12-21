const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/Home.html', { root: __dirname});
});

app.get('/explorers', async (req, res) => {
  console.log('Attempting to GET all explorers');

  const { data, error } = await supabase.from('explorer').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
    return;
  } else {
    res.send(data);
  }
});

app.post('/explorer', async (req, res) => {
  console.log('Adding explorer');
  console.log('Request:', req.body);

  const place = req.body.place;
  const funFact = req.body.funFact;
  const language = req.body.language;

  const { data, error } = await supabase
    .from('explorer')
    .insert({
      explorer_place: place,
      explorer_fun_fact: funFact,
      explorer_language: language,
  })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
    return;
  } else {
    res.send(data);
  }
  res.send(req.body);
});

app.listen(port, () => {
  console.log('App is available on port:', port);
});
