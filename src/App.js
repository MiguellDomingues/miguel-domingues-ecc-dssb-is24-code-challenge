import './styles.css';

//import {_products, createRandomID} from './data.js'
import { API } from './api.js'

import  ProductList  from './components/ProductList'
import ActionPanel from './components/ActionPanel'

import {useState, useEffect} from 'react'

function App(){ 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({})
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(()=>{getProducts()},[])

  const getProducts = ()=>{
    setLoading(true);
    API.getProducts().then((result)=>{
      setProducts(result);
      setSelectedProduct(null);
    }).catch((err)=>{
      console.log("errrrrr", err)
      setError(true);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const selectProduct = (product)=>{
    if(product){
      setSelectedProduct({
        ...product, 
        Developers: product.Developers? [...product.Developers] : []}); //copy the object
    }else{
      setSelectedProduct(null);
    } 
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

  API.postProduct(_new_product).then((result)=>{
      setSelectedProduct( _new_product );
      setProducts(result); 
    }).catch((err)=>{
      setSelectedProduct( null );
      console.log(err)
    }).finally(()=>{

    })
    setSelectedProduct( _new_product );
  
  }

  const editProduct = (modified_product)=>{

    setLoading(true);
    API.editProduct(modified_product,modified_product.productId).then((result)=>{

      setProducts(result); 
    }).catch((err)=>{
      setError(err);
      console.log(err)
    }).finally(()=>{
      setSelectedProduct(null);
      setLoading(false);
    })

    /*
    const _product = products.find((product) => product.productId === modified_product.productId);

    _product.Developers =[...modified_product.Developers];
    _product.methodology = modified_product.methodology;
    _product.productName = modified_product.productName;
    _product.productOwnerName = modified_product.productOwnerName;
    _product.scrumMasterName = modified_product.scrumMasterName;
    _product.location = modified_product.location;

    setProducts([...products])
    */

  }

  const deleteProduct = (product_id)=>{

    setLoading(true);
    API.deleteProduct(product_id).then((result)=>{
      setSelectedProduct(null);
      setProducts(result); 
    }).catch((err)=>{
      setSelectedProduct( null );
      setError(err);
      console.log(err)
    }).finally(()=>{setLoading(false);})

  // setProducts([...products.filter((product)=>product.productId !== product_id)]);
  // setSelectedProduct( null );
  
  }

  const getProductsByDeveloper = (name)=>{

    setLoading(true);
    API.findProductsByDeveloper(name).then((result)=>{
      console.log("SEARCH DEV", result)
      setProducts(result); 
    }).catch((err)=>{

      setError(err);
      console.log(err)
    }).finally(()=>{
      setLoading(false);
    })

  }

  const getProductsByScrumMaster= (name)=>{

    setLoading(true);

    API.findProductsByScrumMaster(name).then((result)=>{
      setProducts(result); 
    }).catch((err)=>{
      setError(err);
      console.log(err)
    }).finally(()=>{
      setLoading(false);
    })
  }

  return (<>
    <div className="app_container">

          <ActionPanel 
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
    </> );
}

export default App;