const express = require('express')
const cors = require('cors');

let {data,  createRandomID}  = require('./data.js')

const app = express();
const port = 3000;

app.use(express.json());
app.use( cors() );    

// A DB.js FILE.  add a thin layer of adstraction
//between data processing and endpoints
//endpoints should be for param checking

// ie: name: "", name: "  ", name: null, (name not on obj at all)
//google 'sanitize rest inputs'


//health check
app.get('/api/product/', (req, res) => {
    res.status(200).send('OK');
})

//GET ALL PRODUCTS
app.get('/api/product/products/', (req, res) => {
  console.log("/api/product/products/")
  res.status(200).send(data);
})

//ADD NEW PRODUCT
app.post('/api/product/', (req, res) => {
    console.log("/api/product/ POST",req.body)

    data.push({
        ...req.body,
        productId: createRandomID(),  
        Developers: req.body.Developers
    });
    console.log("/api/product/",req.body)
    res.status(200).send(data);
})

//EDIT PRODUCT
app.patch('/api/product/:id', (req, res) => {
    const id = req.params.id;
    console.log("/api/product/:id",req.body);

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
app.delete('/api/product/:id', (req, res) => {
    console.log("DELETE /api/product/:id",req.body);
    const id = req.params.id
    data = data.filter((datas)=>datas.productId !== id);
    res.status(200).send(data);
})

//SEARCH PRODUCTS BY SCRUMMASTER
app.get('/api/product/products/scrum_master/:name', (req, res) => {
    console.log("GET PRODUCTS BY SCRUM MASTERER /api/product/:name");
    const sm_name = req.params.name;
    const result = data.filter((p)=>p?.scrumMasterName === sm_name);
    res.status(200).send(result);
})

//SEARCH PRODUCTS BY DEVELOPER
app.get('/api/product/products/developer/:name', (req, res) => {
    console.log("GET PRODUCTS BY DEV /api/product/:name");
    const dev_name = req.params.name;
    const result = data.filter((p)=>p.Developers?.includes(dev_name));
    res.status(200).send(result);
})

//GET DOCS
app.get('/api/products/api-docs', (req, res) => {
    res.send('Hello DOCS')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})