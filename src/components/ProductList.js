import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5050/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct=async(id)=>{
    let result=await fetch(`http://localhost:5050/product/${id}`,
    {
      method:"Delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result= await result.json()
    if(result){
     // alert(`data is deleted having id :${id}`)
      getProducts();
    }

  }
  const searchHandle=async(event)=>{
          
          let key=event.target.value;
          if(key){
            let result=await fetch(`http://localhost:5050/search/${key}`,
            { headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }}
            )
            result =await result.json()
            
              setProducts(result)
            
          }
         
          else{
            getProducts()
          }
  }
  return (
    <div className="product_list">
      <h3>Products List</h3>
      <input className="search_product" type="text" placeholder='Search Product'
        onChange={searchHandle}
      />
      <ul>
        <li>S. no</li>
        <li>Name</li>
        <li>price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length>0?   products.map((item,index) => {
       return (
        <ul key={index}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li><button onClick={()=>deleteProduct(item._id)} className="deletebtn">delete</button>
            <button>  <Link to={`/update/${item._id}`} className="updatebtn">Update</Link></button> 
          </li>
          
        </ul>
       )
      }
 ):<h1>No result found</h1>}

    </div>
  );
};

export default ProductList;
