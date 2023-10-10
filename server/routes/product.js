const express = require("express");
const router = express.Router();

let {data,  createRandomID}  = require('./data.js')

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productOwnerName
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *         - location
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: product title
 *         Developers:
 *            type: array
 *            items:
 *              type: string
 *              description: developers on the project
 *         scrumMasterName:
 *           type: string
 *           description: scrum master of the project
 *         startDate:
 *           type: string
 *           format: date
 *           description: start date of the project in (YYYY/MM/DD)
 *         methodology:
 *           type: string
 *           enum: ["Agile", "Waterfall"]
 *           description: project methodology (agile or waterfall)
 *         location:
 *           type: string
 *           description: the github repo link of the project
 *       example:
 *         productId: bb1eaf7c-a86c-4f7f-aa17-008821657518
 *         productName: ProductA
 *         productOwnerName: Susan Woo
 *         scrumMasterName: Scarlett
 *         startDate: 2010/10/10
 *         methodology: Agile
 *         location: https://github.com/NotifyBC
 *         Developers: ["Miguel Domingues", "Spider Man "]
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /:
 *   get:
 *     summary: access service status
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: service is functioning
 *       404:
 *         description: server error
 * /products:
 *   get:
 *     summary: fetch all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 * /products/{product}:
 *   post:
 *     summary: add a new product 
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product
 *         schema:
 *           type: string
 *         required: true
 *         description: The product object
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *                type: object
 *                properties:
 *                  ProductName:
 *                    type: string
 *                  ScrumMasterName:
 *                    type: string
 *                  ProductOwnerName:
 *                    type: string
 *                  Developer Names:
 *                    type: array
 *                    items:
 *                        type: string
 *                  StartDate:
 *                    format: date
 *                    type: string
 *                  Methodology:
 *                    type: string
 *                    enum: ["Agile", "Waterfall"]
 *     responses:
 *       200:
 *         description: The updated list of products
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
* /products/{Id}:
 *   patch:
 *     summary: Edit a product by Id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *                type: object
 *                properties:
 *                  ProductName:
 *                    type: string
 *                  ScrumMasterName:
 *                    type: string
 *                  ProductOwnerName:
 *                    type: string
 *                  Developer Names:
 *                    type: array
 *                    items:
 *                        type: string
 *                  location:
 *                    type: string
 *                  Methodology:
 *                    type: string
 *                    enum: ["Agile", "Waterfall"]
 *     responses:
 *       200:
 *         description: The updated list of products
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 *   delete:
 *     summary: Delete the product by Id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The updated list of products
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
* /products/scrum_master{name}:
 *   get:
 *     summary: Get the products which match the scrum master name in the scrumMasterName field
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: scrumMasterName
 *         schema:
 *           type: string
 *         required: true
 *         description: The scrummaster name
 *     responses:
 *       200:
 *         description: The products which contain the scrummaster name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
* /products/developer{name}:
 *   get:
 *     summary: Get the products which contain at least 1 occurance of the developer name in the Developers list
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: Developers
 *         schema:
 *           type: string
 *         required: true
 *         description: The developer name
 *     responses:
 *       200:
 *         description: The products which contain the developer name 
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 */



//health check
router.get('/', (req, res) => {
  res.status(200).send('OK');
})

//GET ALL PRODUCTS
router.get('/products/', (req, res) => {
console.log("/api/product/products/")
res.status(200).send(data);
})

//ADD NEW PRODUCT
router.post('/', (req, res) => {
  console.log("/api/product/ POST",req.body)

  data.push({
      ...req.body,
      productId: createRandomID(),  
      Developers: req.body.Developers
  });
  console.log("/api/product/",req.body)
  res.status(201).send(data);
})

//EDIT PRODUCT
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  console.log("EDIT /api/product/:id",req.body);

  const product = data.find((datas) => datas.productId === id);

  /*if the product was not found
  return a resource not found flag*/
  if(product){
      const {
          Developers,
          methodology,
          productName,
          productOwnerName,
          scrumMasterName,
          location,
      } = req.body;

      product.Developers = [...Developers];
      product.methodology =methodology;
      product.productName = productName;
      product.productOwnerName = productOwnerName;
      product.scrumMasterName =scrumMasterName;
      product.location =location;
  }  
  res.status(200).send(data);
})

//DELETE PRODUCT
router.delete('/:id', (req, res) => {
  console.log("DELETE /api/product/:id",req.body);
  const id = req.params.id
  data = data.filter((datas)=>datas.productId !== id);
  res.status(200).send(data);
})

//SEARCH PRODUCTS BY SCRUMMASTER
router.get('/products/scrum_master/:name', (req, res) => {
  console.log("GET PRODUCTS BY SCRUM MASTERER /api/product/:name");
  const sm_name = req.params.name;
  const result = data.filter((p)=>p?.scrumMasterName === sm_name);
  res.status(200).send(result);
})

//SEARCH PRODUCTS BY DEVELOPER
router.get('/products/developer/:name', (req, res) => {
  console.log("GET PRODUCTS BY DEV /api/product/:name");
  const dev_name = req.params.name;
  const result = data.filter((p)=>p.Developers?.includes(dev_name));
  res.status(200).send(result);
})

module.exports = router;
