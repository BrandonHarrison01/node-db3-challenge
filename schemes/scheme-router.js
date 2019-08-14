const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();


// GET scheme

router.get('/', (req, res) => {
  Schemes
    .find()
    .then(scheme => res.status(200).json(scheme))
    .catch(error => res.status(500).json({ error: 'there was an error getting data' }))
});


// GET scheme by id

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes
    .findById(id)
    .first()
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    })
});


// GET steps by id

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes
    .findSteps(id)
    .then(scheme => {res.status(200).json(scheme);})
    .catch (err => {
      res.status(500).json({ message: 'Failed to get steps' });
    })
});


// POST new scheme

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes
    .add(schemeData)
    .then(scheme => 
      res.status(201).json(scheme)
    )
    .catch (err =>
      res.status(500).json({ message: 'Failed to create new scheme' })
    )
});


// POST new step (stretch)

router.post('/:id/steps', async (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new step' });
  }
});


// PUT edit scheme

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes
    .update(id, changes)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
    })
});


// DELETE remove a scheme

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  Schemes
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to delete scheme' });
    })
});

module.exports = router;