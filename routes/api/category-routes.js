const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbCategoryAllData => res.json(dbCategoryAllData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','category_name'],
    include: [
      {
        model: Product,
        attributes: ['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbSingleCategoryData => {
    if(!dbSingleCategoryData) {
      res.status(404).json({Message: "No Category with that id found!" });
      return;
    }
    res.json(dbSingleCategoryData)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCreateCategory => res.json(dbCreateCategory))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where: {
      id: req.params.id
    }
  })
  .then(dbUpdateCategory => {
    if(!dbUpdateCategory) {
      res.status(404).json({ message: "no Category with that id found!" });
      return;
    }
    res.json(dbUpdateCategory)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
 
});

module.exports = router;
