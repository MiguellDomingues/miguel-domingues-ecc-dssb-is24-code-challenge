const express = require("express");
const router = express.Router();

let {data,  createRandomID, validators }  = require('./data.js')

const {
  isDeveloperNameInvalid,
  isDevelopersInvalid,
  isProductNameInvalid,
  isMethodologyInvalid,
  isProductIdInvalid,
  isScrumMasterNameInvalid,
  isStartDateInvalid,
  isLocationInvalid,
} = validators


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
 *         description: The product was added successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 *       400:
 *         description: body params are malformed
 * /products/{Id}:
 *   put:
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
 *         description: The product was updated successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 *       400:
 *         description: body params or route Id are malformed
 *       410:
 *         description: the product Id was not found
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
 *         description: The product was deleted successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: server error
 *       400:
 *         description: route Id is malformred
 *       410:
 *         description: the product Id was not found 
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
 *       410:
 *         description: search has no results
 *       400:
 *         description: the route param is malformed
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
 *       410:
 *         description: search has no results
 *       400:
 *         description: the route param is malformed
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

  const product = req.body

  if(isDevelopersInvalid(product?.Developers) ||
     isProductNameInvalid(product?.productName) ||
     isMethodologyInvalid(product?.methodology) ||
     isScrumMasterNameInvalid(product?.scrumMasterName) ||
     isStartDateInvalid(product?.startDate)){
     res.status(400).send(data);
  }else{   
    data.push({...product,productId: createRandomID() });
    res.status(200).send(data);
  }
})

//EDIT PRODUCT
router.put('/:id', (req, res) => {
  
  console.log("EDIT /api/product/:id",req.body);

  const id = req.params.id;
  const new_product = req.body

  if(isDevelopersInvalid(new_product?.Developers) ||
     isProductNameInvalid(new_product?.productName) ||
     isMethodologyInvalid(new_product?.methodology) ||
     isScrumMasterNameInvalid(new_product?.scrumMasterName) ||
     isProductIdInvalid(id) ||
     isLocationInvalid(new_product?.location)){
      res.status(400).send(data);   //if the id or body contain missing keys/bad data
  }

  const product = data.find((datas) => datas.productId === id);

  if(!product){ 
    res.status(410).send(data); //if the product was deleted since the user last refreshed records
  }else{
    product.Developers = [...new_product.Developers];
    product.methodology =new_product.methodology;
    product.productName = new_product.productName;
    product.productOwnerName = new_product.productOwnerName;
    product.scrumMasterName = new_product.scrumMasterName;
    product.location = new_product.location;    
    res.status(200).send(data);  
  }
})

//DELETE PRODUCT
router.delete('/:id', (req, res) => {

  const id = req.params.id
  console.log("DELETE /api/product/:id", id)

  if(isProductIdInvalid(id)){
     res.status(400).send(data);
  }

  const data_length = data.length
  data = data.filter((datas)=>datas.productId !== id);

  if(data.length === data_length){ // id was not found
    res.status(410).send(data);
  }
  else{
    res.status(200).send(data);
  }
})

//SEARCH PRODUCTS BY SCRUMMASTER
router.get('/products/scrum_master/:name', (req, res) => {
  console.log("GET PRODUCTS BY SCRUM MASTERER /api/product/:name"); 
  const sm_name = req.params.name;
  if(isScrumMasterNameInvalid(sm_name)){
    res.status(400).send(data);
 }

 const result = data.filter((p)=>p?.scrumMasterName === sm_name);

 if(result.length === 0){
  res.status(410).send(result); //no results found
 }else{
  res.status(200).send(result);
 }
})

//SEARCH PRODUCTS BY DEVELOPER
router.get('/products/developer/:name', (req, res) => {
  console.log("GET PRODUCTS BY DEV /api/product/:name");
  const dev_name = req.params.name;

  if(isDeveloperNameInvalid(dev_name)){
    res.status(400).send(data);
  }

  const result = data.filter((p)=>p.Developers?.includes(dev_name));

  if(result.length === 0){
    res.status(410).send(result); //no results found
   }else{
    res.status(200).send(result);
   }
})

module.exports = router;
