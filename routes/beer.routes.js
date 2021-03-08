const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Beer = require('../models/Beer')
const router = Router()

// /beer/beer
router.get('/beer', async (req, res) => {
    try {
			const beers = await Beer.find()
			res.json(beers)

    } catch (e) {
      res.status(500).json({ message: 'Something wrong' })
    }
})

// /beer/beerup
router.get('/beerup', async (req, res) => {
	try {
		const beers = await Beer.find().sort({ abv: 1 })
		res.json(beers)
		
	} catch (e) {
		res.status(500).json({ message: 'Something wrong' })
	}
})

// /beer/beerdown
router.get('/beerdown', async (req, res) => {
	try {
		const beers = await Beer.find().sort({ abv: -1 })
		res.json(beers)
		
	} catch (e) {
		res.status(500).json({ message: 'Something wrong' })
	}
})

// /beer/addbeer
router.post('/addbeer',
  [
		check('name', 'Minimal length of username 3 symbols').isLength({ min: 3 }),
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Invalid data in the fields'
			})
		}

		const { name, tagline, first_brewed, description, abv } = req.body
		const newbeer = await Beer.findOne({ name })

		if (newbeer) {
			return res.status(400).json({ message: 'The beer already exist' })
		}

		const beer = new Beer({ name, tagline, first_brewed, description, abv })

		await beer.save()

		res.status(201).json({ message: 'New beer recorded' })

	} catch (e) {
		res.status(500).json({ message: 'Something wrong' })
	}
})

// /beer/showbeer
router.get('/showbeer', async (req, res) => {
	try {
		const not_private_beer = await Beer.findOne()
		res.json(not_private_beer)

	} catch (e) {
		res.status(500).json({ message: 'Something wrong' })
	}
})

module.exports = router
