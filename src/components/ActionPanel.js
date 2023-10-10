import {useState } from 'react'
import  ModalPanel  from './ModalPanel'
import '../styles.css';

const METHODOLIGIES = ["Agile", "WaterFall"]

const emptyForm =
{                
  productName: "",         
  productOwnerName: "",      
  Developers: [],          
  scrumMasterName: "",    
  startDate: "",          
  methodology:  METHODOLIGIES[0],    //default value of picklist                  
}


function ActionPanel({
    productCount, 
    selectedProduct, 
    saveProduct,
    editProduct,
    deleteProduct,
    getProductsByScrumMaster,
    getProductsByDeveloper,
    getProducts,
    loading
  }){
  
    const [actionType, setActionType] = useState(null);
    const [isOpen, toggleModel] = useState(false);
  
    function handleDelete(product){
      if (window.confirm(`Delete Product ${product.productId} ?`)) {
        deleteProduct(product.productId)
      } 
    }
  
    function handleSaveAction(product){
      saveProduct(product);
      setActionType(null);
    }
  
    function handleEditAction(product){
      editProduct(product);
      setActionType(null);
    }
  
    return(<>
     
      <div className="action_panel container_style">
        <div className="">
        <h1>Actions</h1>
        <span>{loading ? "loading....." : ""}</span>&#160;
        </div>
        <div className="actions container_style">
              <span>Product Count:</span>{productCount}
              <button onClick={e=>{getProducts()}}  disabled={loading}>Get All Records</button>
              <button onClick={e=>{setActionType("ADD");toggleModel(true);} } disabled={loading}>Add</button>
              <button disabled={!selectedProduct || loading} onClick={e=>{setActionType("EDIT");toggleModel(true); }} >Edit</button>
              <button disabled={!selectedProduct || loading} onClick={e=>{handleDelete(selectedProduct)}}>Delete</button>
              <SearchPanel searchCB={getProductsByDeveloper} btnName={"Search Products By Developer Name"} loading={loading}/>
              <SearchPanel searchCB={getProductsByScrumMaster} btnName={"Search Products By ScrumMaster Name"} loading={loading}/>
        </div>
  
        {isOpen ? (actionType === "ADD" ? 
           <ModalPanel 
            close={()=>{toggleModel(!isOpen)}}
            submitAction={handleSaveAction}
            actionType = {actionType }
            formData={ emptyForm}
            formTitle={"Add Product"}
            /> 
          : (actionType === "EDIT") ?  
          <ModalPanel 
            close={()=>{toggleModel(!isOpen)}}
            submitAction={handleEditAction}
            formData={{...selectedProduct, Developers: [...selectedProduct.Developers]}}
            actionType = {actionType }
            formTitle={"Edit Product"}/> 
        : <></>): <></>}  
  
      </div></>);
  }
  
  function SearchPanel({ searchCB, btnName, loading }){
  
    const [input, setInput] = useState("");
  
    const handleOnChange = (e) => setInput(e.target.value)
     
     function handleSubmit(e){
       e.preventDefault();
       searchCB(input.trim());
     }
  
    return (
    <div className="search_container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleOnChange} required/>
        <input type="submit" value={btnName} disabled={loading} />
      </form>
  </div>)
  }

  export default ActionPanel;
  