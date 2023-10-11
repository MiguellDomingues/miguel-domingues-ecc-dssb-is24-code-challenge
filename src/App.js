import './styles.css';
import { API } from './api.js'
import  ProductList  from './components/ProductList'
import ActionPanel from './components/ActionPanel'
import {useState, useEffect} from 'react'

function App(){

const [loading, setLoading] = useState(false);
const [error, setError] = useState(false)
const [products, setProducts] = useState([]); 
const [selectedProduct, setSelectedProduct] = useState(null);

/* 
  sequence of then()/catch()/finally() actions for every callout
  
  CB:         a function which returns a Promise 
  successCB:  function to execute upon success
  errorCB:    function to execute upon failure
  finallyCB;  function to execute upon completion
*/
function APIWrapper(CB, successCB = ()=>{}, errorCB = ()=>{}, finallyCB = ()=>{}){ 
    setLoading(true)        //always set loading when callout begins
    CB().then((result)=>{
        setError(false)     //successfull callouts will clear the previous err
        successCB(result)
    }).catch((err)=>{
        console.log("ERROR: ", err)
        setError(true)      
        errorCB(err)
    }).finally(()=>{
        setLoading(false)  //always unset loading when callout ends
        finallyCB()
    })
}

useEffect(()=>{getProducts()},[]) //execute once on component mount

const selectProduct = (product)=>{
  if(product){
    setSelectedProduct({
      ...product, 
      Developers: product.Developers? [...product.Developers] : []}); //copy the object
  }else{
    setSelectedProduct(null);
  } 
}

const getProducts = ()=>{
    APIWrapper(
        API.getProducts,
          (results)=>{
              setProducts(results)
              setSelectedProduct(null);})
}

const saveProduct = (new_product)=>{ 
  const _new_product =  {
    Developers: new_product?.Developers && new_product.Developers.length > 0 ? new_product.Developers : [], 
    location: "",
    methodology: new_product.methodology || "",
    productName: new_product.productName || "",
    productOwnerName: new_product.productOwnerName || "",
    scrumMasterName: new_product.scrumMasterName || "",
    startDate: new_product.startDate || "",
  }

  APIWrapper(
    ()=>API.postProduct(_new_product),
      (results)=>{setProducts(results);},
      (err)=>setSelectedProduct(null))
}

const editProduct = (modified_product)=>{
  APIWrapper(
    ()=>API.editProduct(modified_product,modified_product.productId),
      (results)=>{setProducts(results);},
      (err)=>setSelectedProduct(null))
}

const deleteProduct = (product_id)=>{
  APIWrapper(
    ()=>API.deleteProduct(product_id),
      (results)=>{
          setProducts(results);
          setSelectedProduct(null);},
      (err)=>setSelectedProduct(null))
}

const getProductsByDeveloper = (name)=>{
  setSelectedProduct(null);
  APIWrapper(
    ()=>API.findProductsByDeveloper(name),
      (results)=>setProducts(results))
}

const getProductsByScrumMaster= (name)=>{
  setSelectedProduct(null);
  APIWrapper(
    ()=>API.findProductsByScrumMaster(name),
      (results)=>setProducts(results))
}

return (<>
  <div className="app_container">

        <ActionPanel 
          error={error}
          selectedProduct={selectedProduct} 
          productCount={products.length} 
          setSelectedProduct={setSelectedProduct}
          loading={loading}
          getProducts={getProducts}
          selectProduct={selectProduct}
          saveProduct ={saveProduct}
          editProduct ={editProduct}
          deleteProduct ={ deleteProduct }
          getProductsByDeveloper ={ getProductsByDeveloper}
          getProductsByScrumMaster={getProductsByScrumMaster}/>
      
        <ProductList 
          selectProduct={selectProduct} 
          selectedProduct={selectedProduct} 
          products={products}/> 
  </div>
</>);
}

export default App;