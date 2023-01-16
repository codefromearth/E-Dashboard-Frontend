import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error,setError]=useState(false)
  const nevigate=useNavigate();
  const addproduct = async () => {
    if(!name || !price || !category ||!company)
    {
      setError(true)
      return false
    }
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const result =await fetch("http://localhost:5050/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

      },
    });
     const data=await result.json()
    if(data)
    {
      nevigate('/')    
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputbox"
        value={name}
        placeholder="Enter Product name"
        onChange={(e) => setName(e.target.value)}
      />
     {error&&!name&& <span className="invalid">Enter valid name</span>}
      <input
        type="text"
        className="inputbox"
        value={price}
        placeholder="Enter Product price"
        onChange={(e) => setPrice(e.target.value)}
      />
        {error&&!price&& <span className="invalid">Enter valid price</span>}
      <input
        type="text"
        className="inputbox"
        value={category}
        placeholder="Enter Product category"
        onChange={(e) => setCategory(e.target.value)}
      />
        {error&&!category&& <span className="invalid">Enter valid category</span>}
      <input
        type="text"
        className="inputbox"
        value={company}
        placeholder="Enter Product company"
        onChange={(e) => setCompany(e.target.value)}
      />
        {error&&!company&& <span className="invalid">Enter valid company</span>}
      <button className="btn" onClick={addproduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
