import {useState, useRef} from 'react'
import  DeveloperPanel  from './DeveloperPanel'
import '../styles.css';

const METHODOLIGIES = ["Agile", "WaterFall"]

function ModalPanel({
    close,
    submitAction,
    formData,
    actionType,
    formTitle
  }){
  
    const [formValues, setFormValues] = useState(formData);
    const form_ref = useRef(null);

    function resetForm(e){
      e.preventDefault()
      setFormValues(formData)
    }
  
    function handleOnChange(e){
      setFormValues({...formValues, [e.target.name]: e.target.value })
     }
  
     function handleSubmit(e){
      e.preventDefault();
      submitAction(formValues);
      setFormValues({});
    }

    function updateDevelopers(developers){
      setFormValues({...formValues, Developers: developers});
    }
  
    return(<>
      <div className="model">
        <div className="model_content ">
              <h2 style={{textAlign: "center"}}>{formTitle}</h2>
              
              <form ref={form_ref} onSubmit={handleSubmit}>
                <div className="prop_values container_style">
                  <div className="form_value">
                    <span>ProductName:</span>
                    <input
                      type="text" 
                      name="productName" 
                      required={actionType === "ADD"} 
                      onChange={handleOnChange} 
                      value={formValues.productName}/>
                  </div>
                  <div className="form_value">
                    <span>Scrum Master:</span>
                    <input
                      type="text" 
                      name="scrumMasterName" 
                      required={actionType === "ADD"} 
                      onChange={handleOnChange} 
                      value={ formValues.scrumMasterName}/>
                  </div>
                  <div className="form_value">
                    <span>Product Owner:</span>
                    <input 
                      type="text" 
                      name="productOwnerName" 
                      required={actionType === "ADD"} 
                      onChange={handleOnChange} 
                      value={ formValues.productOwnerName}/>
                  </div>
                    
                  {actionType === "ADD" ?         //state date input only appears for adding products
                    <div className="form_value">
                      <span>Start Date</span>
                      <input 
                        type="date" 
                        name="startDate"
                        required={actionType === "ADD"} 
                        onChange={handleOnChange} 
                        value={ formValues.startDate}/>
                    </div> : actionType === "EDIT" ?   //location input only appears for editing products
                      <div className="form_value">
                        <span>Location</span>
                        <input 
                          type="url" 
                          name="location" 
                          value={formValues.location} 
                          onChange={handleOnChange}/>
                      </div> : <></>}      
  
                  <div className="form_value"><span>Methodology:</span> 
                  <select name="methodology" value={formValues.methodology} onChange={handleOnChange}>
                    {METHODOLIGIES.map((methodology,idx)=>
                      <option key={idx} value={methodology}>
                        {methodology}
                      </option>) }                   
                  </select>
                  </div>  
                </div>
              </form>  
  
              <div>
                <span>Developer Names:</span>
                <DeveloperPanel developers={[...formValues.Developers]} updateDevelopers={updateDevelopers}/>
              </div>
  
              <div className={"modal_panel_buttons"}>
                  <div> <button onClick={e=>{form_ref?.current.requestSubmit()}}>{formTitle}</button></div>
                  <div> <button onClick={resetForm}>Reset Form</button></div>
                  <div> <button onClick={close}>Cancel</button></div>       
              </div>
              
        </div>
      </div>       
    </>);
  }

  export default ModalPanel
  