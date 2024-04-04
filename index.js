import express from 'express'
import mongoose from 'mongoose'

const app = express();
app.use(express.json());

const Plato = mongoose.model('Plato', new mongoose.Schema({
  nombre: String,
  tipo: String,
}));

mongoose.connect('mongodb://edu:testpass@imongo:27017/restaurante?authSource=admin');

app.get('/platos', async (_req, res) => {
  console.log('Mostrando lista de platos...')
  const platos = await Plato.find();
  return res.send(platos)
});

app.post('/platos', async (req, res) => {
  try {
    console.log('Creando plato...');
    const { nombre, tipo } = req.body;

    if (!nombre || !tipo) {
      return res.status(400).send('Los campos nombre y tipo son obligatorios');
    }

    await Plato.create({ nombre, tipo }); // Utiliza las variables extraídas para crear el plato
    return res.send('Plato creado con éxito');
  } catch (error) {
    console.error('Error creando el plato:', error);
    return res.status(500).send('Ocurrió un error al crear el plato');
  }
});

app.listen(3000, () => console.log('escuchando...'));
