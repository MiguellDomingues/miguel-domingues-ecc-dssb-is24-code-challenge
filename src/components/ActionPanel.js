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

const trimStringProps = (product) => {
  return{
    ...product,
    productName: product.productName.replace(/\s+/g, ' '),
    productOwnerName: product.productOwnerName.replace(/\s+/g, ' '),
    scrumMasterName: product.scrumMasterName.replace(/\s+/g, ' ')}
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
    loading,
    error
  }){
  
    const [actionType, setActionType] = useState(null);

    function handleDelete(product){
      if (window.confirm(`Delete Product ${product.productId} ?`)) {
        deleteProduct(product.productId)
      } 
    }
  
    function handleSaveAction(product){
      saveProduct(trimStringProps(product));
      setActionType(null);
    }
  
    function handleEditAction(product){
      editProduct(trimStringProps(product));
      setActionType(null);
    }

    return(<>    
      <div className="action_panel container_style">
        <div className="">
        <h1>Actions</h1>
        {loading ? "loading....." : (error ? " an error has occured " : "")}&#160;
        </div>
        <div className="actions container_style">
              <span>Product Count:</span>{productCount}

              <button onClick={e=>{getProducts()}}  disabled={loading}>Get All Records</button>
              <button onClick={e=>{setActionType("ADD")} } disabled={loading || error}>Add</button>
              <button disabled={!selectedProduct || loading || error} onClick={e=>{setActionType("EDIT")}} >Edit</button>
              <button disabled={!selectedProduct || loading || error} onClick={e=>{handleDelete(selectedProduct)}}>Delete</button>

              <SearchPanel searchCB={getProductsByDeveloper} btnName={"Search Products By Developer Name"} loading={loading} error={error}/>
              <SearchPanel searchCB={getProductsByScrumMaster} btnName={"Search Products By ScrumMaster Name"} loading={loading} error={error}/>
        </div>

        {(actionType === "ADD" ? 
           <ModalPanel //ADD FORM
            close={()=>{setActionType(null)}}
            submitAction={handleSaveAction}
            actionType = {actionType }
            formData={ emptyForm} //pass an empty form 
            formTitle={"Add Product"}
            /> 
          : (actionType === "EDIT") ?  
          <ModalPanel //EDIT form
            close={()=>{setActionType(null)}}
            submitAction={handleEditAction}
            formData={{...selectedProduct, Developers: [...selectedProduct.Developers]}} //deep copy the props
            actionType = {actionType }
            formTitle={"Edit Product"}/> 
        : <></>)}  
  
      </div></>);
  }
  
  function SearchPanel({ searchCB, btnName, loading, error }){
  
    const [input, setInput] = useState("");
  
    const handleOnChange = (e) => setInput(e.target.value)
     
     function handleSubmit(e){
       e.preventDefault();
       searchCB(input.trim());
     }
  
    return (
    <div className="search_container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleOnChange} required />
        <input type="submit" value={btnName} disabled={loading || error || input.trim().length === 0}/>
      </form>
  </div>)
  }

  export default ActionPanel;
  