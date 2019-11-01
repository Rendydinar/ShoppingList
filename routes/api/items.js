const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

/**
 *  @route        GET api/items
 *  @description  Get All Items
 *  @access       Public
 */
router.get('/', (req, res) => {
	Item.find()
	  .sort({ date: -1 })
	  .then(items => res.json(items));
});

/**
 *  @route        POST api/items
 *  @description  Create A Post
 *  @access       Private
 */
router.post('/', auth, (req, res) => {
	const newItem = new Item({
		name: String(req.body.name)
	});

	newItem.save().then(item => res.json(item));
});

/**
 *  @route        DELETE api/items/:id
 *  @description  Delete A Item
 *  @access       Private
 */
router.delete('/:id', auth, (req, res) => {
	Item.findById(req.params.id)
	  .then(item => item.remove().then(() => res.json({ success: true })))
	  .catch(err => res.status(400).json({ success: false }));
});
 
module.exports = router;