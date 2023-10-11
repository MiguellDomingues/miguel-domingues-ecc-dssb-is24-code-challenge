import '../styles.css';

//defines the column names and associated keys from left to right
const column_data_order = [
  {title: "Id", key: "productId"},
  {title: "Name",key: "productName"},
  {title: "Owner Name",key: "productOwnerName" },
  {title: "Developers",key:  "Developers",},
  {title: "ScrumMaster Name",key:"scrumMasterName",},
  {title: "Start Date",key: "startDate",},
  {title: "Methodology",key: "methodology",},
  {title: "Location",key: "location",},
];

//the table of products
function ProductList({products,selectProduct,selectedProduct}){
  
  function handleSelectProduct(row_product){ //the product when a user clicks on associated table row
    if(row_product.productId === selectedProduct?.productId ){
      selectProduct(null)
    }else{
      selectProduct(row_product)
    }
  }

  return(<>   
    <div className="product_table">
    <table>
      <thead>
        <tr>
        {column_data_order.map((cdo, idx)=><th key={idx}>{cdo.title}</th>)}
        </tr>
      </thead>
      {products.map((productRow, idx)=> 
      <tbody 
        onClick={e=>{handleSelectProduct(productRow)}}
        style={selectedProduct?.productId === productRow.productId ? {backgroundColor: "aqua"}: {}} //if the table row is selected, color it differenty
        key={idx}>
          <Product 
            columnKeys={column_data_order.map(k=>k.key)} //get the keys of the object to output to the row
            productRow={productRow}/>
        </tbody>)}   
    </table>
    </div>
  </>);
}

//a table row
function Product({productRow, columnKeys}){
  return(
    <tr> 
      {columnKeys.map((productColumn, idx)=>
      <td key={idx}>{
        Array.isArray(productRow[productColumn]) ?  //if the product key is an array (Developers)..
          productRow[productColumn].join(' , ') :     //seperate the data items with " , "
            productRow[productColumn]}</td>)}           
  </tr>);
}

export default ProductList;
  
  