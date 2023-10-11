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

const trimStringProps = (product) => { //remove white space from edges and in-between words
  return{
    ...product,
    productName: product.productName.replace(/\s+/g, ' '),
    productOwnerName: product.productOwnerName.replace(/\s+/g, ' '),
    scrumMasterName: product.scrumMasterName.replace(/\s+/g, ' ')}
}

//the container for all the user inputs. also displays any errors, results of actions
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

    function handleDelete(product){ //the confirm delete popup window
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

    const err = "an error has occured when attempting to contact the server. Please contact your administrator" 

    return(<>    
      <div className="action_panel container_style">    

        <span className="result_text"> {loading ? "loading....." : (error ? <span style={{color: "red"}}>{err}</span> : "")}</span>
       
        <h1>Actions</h1>
        <div className="actions container_style">
              <span>Product Count:</span>{productCount}

              <button 
                disabled={loading} //disabled when loading
                onClick={e=>{getProducts()}}>Get All Records</button>
              <button 
                disabled={loading || error} //disabled when loading or there is an error
                onClick={e=>{setActionType("ADD")}}>Add</button>
              <button 
                disabled={!selectedProduct || loading || error} //disabled when loading or there is an error or the user hasnt selected anything
                onClick={e=>{setActionType("EDIT")}}>Edit</button>
              <button 
                disabled={!selectedProduct || loading || error} //disabled when loading or there is an error or the user hasnt selected anything
                onClick={e=>{handleDelete(selectedProduct)}}>Delete</button>

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
  
//the search boxes for developer, scrum master text searches
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
      <input 
        type="submit" 
        disabled={loading || error || input.trim().length === 0} // if we are performing a callout, there is an error, or the input are all spaces
        value={btnName}/>
    </form>
</div>)
}

export default ActionPanel;
  