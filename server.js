const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Plant = require('./models/Plant');
const express = require('express');

require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

async function connectionDB()
{
    try
    {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB connected...');
    }
    catch (error)
    {
        console.log('MongoDB connection error:', error);
    }
}
connectionDB();

app.get('/', (req, res) => 
{
    res.redirect('/plants');
});

app.get('/plants/new', (req, res) =>
{
    res.render('new');
});

app.get('/plants', async (req, res) =>
{
    try
    {
        const plants = await Plant.find({});
        res.render('index', { plants });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error retrieving plants');
    }
});

app.post('/plants', async (req, res) =>
{
    try
    {
        await Plant.create(req.body);
        res.redirect('/plants');
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error creating plant');
    }
});

app.get('/plants/:id', async (req, res) => 
{
    try
    {
        const plant = await Plant.findById(req.params.id);
        if (!plant)
        {
            return res.status(404).send('Plant not found');
        }
        res.render('show', { plant });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error retrieving plant');
    }
});

app.get('/plants/:id/edit', async (req, res) =>
{
    try
    {
        const plant = await Plant.findById(req.params.id);
        if (!plant)
        {
            return res.status(404).send('Plant not found');
        }
        res.render('edit', { plant });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error finding plant');
    }
});

app.put('/plants/:id', async (req, res) =>
{
    try
    {
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlant)
        {
            return res.status(404).send('Plant not found');
        }
        res.redirect('/plants');
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error updating plant');
    }
});

app.delete('/plants/:id', async (req, res) =>
{
    try
    {
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
        if (!deletedPlant)
        {
            return res.status(404).send('Plant not found');
        }
        res.redirect('/plants');
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send('Error deleting plant');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
    console.log(`use this url : http://localhost:${PORT}/`);
});