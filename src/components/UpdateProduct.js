import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params=useParams();
  const navigate=useNavigate();
  

  
   useEffect(()=>{
         getProductDetails()
   },[])

   const getProductDetails=async()=>{
    //console.log(params)
     let result=await fetch(`http://localhost:5050/product/${params.id}`
     ,
    {
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }
    )
    result=await result.json()
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
   }
   
   const updateProduct=async()=>{
    //console.log(name,price,category,company)
    let result=await fetch(`http://localhost:5050/product/${params.id}`,
    {
        method:'put',
        body:JSON.stringify({name ,price,category,company}),
        headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

        }
    })
    result=await result.json()
   // console.log(result)
   if(result){
    navigate('/')
   }
  
        

   }

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputbox"
        value={name}
        placeholder="Enter Product name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="inputbox"
        value={price}
        placeholder="Enter Product price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        className="inputbox"
        value={category}
        placeholder="Enter Product category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        className="inputbox"
        value={company}
        placeholder="Enter Product company"
        onChange={(e) => setCompany(e.target.value)}
      />
      <button className="btn" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
