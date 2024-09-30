import style from "./ProductList.module.css"
import Product from "../Product/Product";
import { useCustomHook } from "../../Context/CustomProductContext";
import Loader from "../Loader/Loader";
import { useState } from "react";

function ProductList() {
  const {productArr, loadProduct, searchName, setsearchName, filterPrice, setfilterPrice,
    categoryProduct, setcategoryProduct, filterProductArr, isFiltered, categories} = useCustomHook();
    
    const [clear, setclear] = useState(false)
  // console.log("loadProduct",loadProduct);
  // console.log("categoryProduct", categoryProduct)
  // console.log("isFiltered", isFiltered);
  // console.log("A Don Vai",filterProductArr);
  // console.log("categoryProduct",categoryProduct);
  return (
    <>
    {loadProduct ? <Loader/> : 
    <div className={style.BodyContainer}>
      {/* Search Container */}
      <div className={style.searchBarContainer}>
        <input placeholder="Search By Name" value={searchName} onChange={(e)=>setsearchName(e.target.value)}
        onMouseOver={()=>{setclear(true)}} onMouseLeave={()=>{setclear(false)}} onClick={()=>{setclear(true)}}
        />
        {clear ? <span className={style.clearbutton} onClick={()=>setsearchName("")} 
        onMouseOver={()=>setclear(true)}>&times;</span> : null}
        {/* <span class={style.clearbutton} onClick={()=>setsearchName("")}>&times;</span> */}
      </div>
      {/* Filter Container */}
      <div className={style.filterContainer}>
        <h2>Filter</h2>
        <p>Price: <span id="priceValue">{filterPrice}</span></p>
        <input type="range" min="0" max="100000" className={style.slider} id="priceRange" value={filterPrice} 
        onChange={(e)=>setfilterPrice(Number(e.target.value))}/>

        {/* Dynamic Category Filtering */}
        <h3>Category</h3>
        <div className={style.category}>
          {categories.map((category)=>(
            <label key={category}><input type="checkbox" checked={categoryProduct[category] || false}
            onChange={(event)=> setcategoryProduct({...categoryProduct,[category]: event.target.checked})}
            />{category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
          ))}
        </div>
      </div>
      {/* ProductList */}
      <div className={style.ProductListContainer}>

        {isFiltered ? filterProductArr.map((prod, index)=>{
          return <Product key={prod.id} oneProduct={prod} index={index}/>
        }) 
        :
        productArr.map((prod, index)=>(
          <Product key={prod.id} oneProduct={prod} index={index}/>
        ))}

      </div>
      
    </div>}
    </>
  );
}

export default ProductList;
