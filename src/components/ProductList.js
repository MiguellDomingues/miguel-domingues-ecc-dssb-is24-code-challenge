import '../styles.css';

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

function ProductList({products,selectProduct,selectedProduct}){
  
    function handleSelectProduct(row_product){
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
          key={idx} style={ selectedProduct?.productId === productRow.productId ?{backgroundColor: "aqua"} : {}}>
            <Product productRow={productRow} columnKeys={column_data_order.map(k=>k.key)}/>
          </tbody>)}   
      </table>
      </div>
      </>);
}

function Product({productRow, columnKeys}){

  return(
    <tr> 
      {columnKeys.map((productColumn, idx)=>
      <td key={idx}>{ Array.isArray(productRow[productColumn]) ?  productRow[productColumn].join(' , ') : productRow[productColumn]}</td>)}
    </tr>);
}

export default ProductList;
  
  