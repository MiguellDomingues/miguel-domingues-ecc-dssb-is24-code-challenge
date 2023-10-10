import '../styles.css';

import { useState } from 'react'

function DeveloperPanel({updateDevelopers, developers}){

    const keyed_developers = developers.map((d, idx)=>{return {id: idx,val: d}})
  
    const [inputNewDeveloper, setInputNewDeveloper] = useState("")
  
    function handleOnChange(e){ 
      setInputNewDeveloper(e.target.value)
     }
  
     function handleSaveDeveloper(e){
      e.preventDefault();
      setInputNewDeveloper("")
      updateDevelopers([...developers, inputNewDeveloper.trim()])
     }
  
     function handleDeleteDeveloper(keyed_developer_id){
      const deleted = keyed_developers.filter((kd)=>keyed_developer_id !== kd.id)
      updateDevelopers( deleted.map(kb=>kb.val) )
     }
  
     function handleEditDeveloper(new_dev, keyed_developer_id){
  
      const edited = keyed_developers.map((kd)=>{
        if(kd.id === keyed_developer_id){
          kd.val = new_dev;
        }
        return kd.val;
      })
  
      updateDevelopers(edited)
     }
  
    return(<div className="developer_list">
      <form onSubmit={handleSaveDeveloper} >
        <input type="text" value={inputNewDeveloper} onChange={handleOnChange}  required/>
        <input type="submit" value="Confirm New Developer"  disabled={developers.length >= 5} />
      </form>
        <div className="dev_list container_style">
          {keyed_developers.map((keyed_developer, idx)=><Developer keyed_developer={keyed_developer} key={idx} handleDeleteDeveloper={handleDeleteDeveloper} handleEditDeveloper={handleEditDeveloper}/>)}
        </div>
    </div>)
  }
  
  function Developer({keyed_developer,handleDeleteDeveloper,handleEditDeveloper}){
  
    const [actionType, setActionType] = useState("");
    const [editValue, setEditValue] = useState(keyed_developer.val);
  
    function handleOnChange(e){ 
      setEditValue(e.target.value)
     }
  
     function cancelEdit(e){
      e.preventDefault()
      setActionType("DEFAULT")
      setEditValue(keyed_developer.val)
     }
  
     function submitEdit(e){
      e.preventDefault()
      handleEditDeveloper(editValue, keyed_developer.id)
      setActionType("DEFAULT")
     }
  
    return(<div className="dev_row">
    { actionType === "EDIT" ? <>
     <form onSubmit={submitEdit}>
      <div>
        <input type="text" value={editValue} onChange={handleOnChange} required/>
        <input type="submit" value="Confirm Edit"/>
        <button onClick={cancelEdit}>Cancel Edit</button>
      </div>
    </form>
     
    </> : <> 
    {keyed_developer.val}
    <button onClick={ e=>handleDeleteDeveloper(keyed_developer.id)}>Delete</button>
    <button onClick={ e=>{setActionType("EDIT")}}>Edit</button> 
    </>
  }
  </div>)}

export default DeveloperPanel
  