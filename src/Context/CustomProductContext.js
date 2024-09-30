import { createContext, useContext } from "react";
import { useState, useEffect} from "react";
import productJson from "./../Data/Products.json"
import { useUserCustomHook } from "./CustomUserContext";

//For Notification
import { toast } from 'react-toastify';
import { updateDoc , doc, onSnapshot} from "firebase/firestore";
import { db } from "../FireBase/FireBaseConfig";

//Todo 1. Create Context
const ProductContext = createContext();

//Todo 2. Custom Context
function CustomProductContext({children }){
  //Product
    const [productArr, setProductArr] = useState([])
    const [isAdding, setIsAdding] = useState(null);

    //Cart
    const [cartArr, setCartArr] = useState([]);
    const [isRemoving, setIsRemoving] = useState(null);

    //My Order
    const [myOrder, setMyOrder] = useState([]);

    //Filter and Search State
    const [filterProductArr, setFilterProductArr] = useState([])
    const [isFiltered, setIsfiltered] = useState(false);
    const [searchName, setsearchName] = useState("");
    const [filterPrice, setfilterPrice] = useState(0);
    const [categoryProduct, setcategoryProduct] = useState({})

    //loading 
    const [loadProduct, setLoadProduct] = useState(false);
    const [loadCart, setLoadCart] = useState(false);
    const [loadMyOrder, setLoadMyOrder] = useState(false)

    
    // 1. Extract Unique Categories
    const categories = [...new Set(productArr.map(product => product.category))]; // (...) convert set to Array
    // console.log("categories",categories);

    //user 
    const {signedUser, isLogin} = useUserCustomHook();
    console.log("signedUser, isLogin", signedUser, isLogin)

    //! Initialy setting ProductArr from data/product.json()
    useEffect(()=>{
      // Simulate loading products
      setLoadProduct(true); // Start loading when component mounts
      const newProductJson = productJson.map((product)=>{
        return{
          ...product,
          price: Math.floor(product.price * 84),
        }
      });
      const timer = setTimeout(() => {
        setProductArr(newProductJson);
        setLoadProduct(false); // Stop loading after products are "fetched"
      }, 2000);
      // Cleanup timer to prevent memory leaks
      return () => clearTimeout(timer);
      
    },[])

    //! CartArr store from Firebase Based on User id
    useEffect(()=>{
      // console.log("store");
      // console.log(signedUser.id);
      if(signedUser && signedUser.id){
        onSnapshot(doc(db,"Users", signedUser.id), (SnapShot)=>{
          if(SnapShot.exists()){
            // console.log(SnapShot.data().cartArr)
            setCartArr(SnapShot.data().cartArr || []);
            setMyOrder(SnapShot.data().MyOrder || []);
          }
        })
      }
    },[signedUser.id])
    
    
    //! ...............................................Filter All...........................................
    useEffect(()=>{
      //! VVIP
      // const tt = Object.values(categoryProduct).some(value => {
      //   console.log(value)
      //   return value});
      // console.log("tt",tt);
      // Check if any category is selected
      const isCategoryFiltered = Object.values(categoryProduct).some(value => value);
      // console.log("Supriya isCategoryFiltered",isCategoryFiltered)
      const isSearchActive = searchName.trim() !== "";
      const isPriceFiltered = filterPrice > 0;
      // console.log(isPriceFiltered, filterPrice)

      if(isSearchActive || isPriceFiltered || isCategoryFiltered){
        setIsfiltered(true);
      }else{
        setIsfiltered(false);
      }

      let filterProductArr = [];
      // console.log(filterProductArr)

      //1. If user Only Search cliked
      if(isSearchActive && !isPriceFiltered && !isCategoryFiltered){
        filterProductArr = productArr.filter((product)=> product.title.toLowerCase().includes(searchName.toLowerCase()))
      }
      //2. If user Only Price filter cliked
      else if(!isSearchActive && filterPrice>0 && !isCategoryFiltered){
        console.log("In search")
        filterProductArr = productArr.filter((product)=>product.price <= filterPrice)
        console.log("x",filterProductArr)
      }
      //3. If user Only Category Filter cliked
      else if(!isSearchActive && !isPriceFiltered && isCategoryFiltered){
        filterProductArr = productArr.filter((product)=>categoryProduct[product.category])
        console.log("filterProductArr",filterProductArr);
      }
      //4. If user given All category cliked
      else if(isSearchActive && filterPrice>0 && isCategoryFiltered){
        filterProductArr = productArr.filter(
          (product)=> product.title.toLowerCase().includes(searchName.toLowerCase()) 
          && product.price <= filterPrice && categoryProduct[product.category])
      }
      //5. if user Price filter and Search cliked
      else if(isSearchActive && filterPrice>0 && !isCategoryFiltered){
        filterProductArr = productArr.filter(
          (product)=> product.title.toLowerCase().includes(searchName.toLowerCase())
          && product.price <= filterPrice
        )
      }
      //6. if user search and category cliked
      else if(isSearchActive && !isPriceFiltered && isCategoryFiltered){
        filterProductArr = productArr.filter(
          (product)=>product.title.toLowerCase().includes(searchName.toLowerCase())
          && categoryProduct[product.category]
        )
      }
      //7. if user price filter and category cliked
      else if(!isSearchActive && filterPrice>0 && isCategoryFiltered){
        filterProductArr = productArr.filter((product)=>product.price <= filterPrice && categoryProduct[product.category])
      }
      // after filter collected Data set in setFilterProductArr
      setFilterProductArr(filterProductArr)
    },[searchName,filterPrice,categoryProduct])

    // //! ...............................................Loading.......................

    //! Loading Cart and notify toast message
    const handleCartNavigation = ()=>{
      const currentUrl = window.location.pathname;
      if(currentUrl === "/cart"){
        setLoadCart(false)
      }else{
        setLoadCart(true)
      }
      console.log("click Link to=/cart", loadCart);
      if(cartArr.length === 0){
        if(currentUrl !== "/cart"){
          toast.error('No Products in Cart!');
        }
      }
      setTimeout(()=> setLoadCart(false),1000);
    }
    // ! Loading Myorder
    const handleMyOrderNavigation = ()=>{
      const currentUrl = window.location.pathname;
      if(currentUrl === "/myOrder"){
        setLoadMyOrder(false)
      }else{
        setLoadMyOrder(true)
      }
      setTimeout(()=> setLoadMyOrder(false),1000)
    }

    // ! Loading Home
    const handleHomeNavigation = ()=>{
      const currentUrl = window.location.pathname;
      if(currentUrl === "/"){
        setLoadProduct(false);
      }else{
        setLoadProduct(true)
      }
      setTimeout(()=>setLoadProduct(false),1000) 
    }

    //!.................................................Cart...................................................
    //! Add to Cart
    const handleAddToCart = async (oneProduct)=>{
      if(isLogin === false){return}
      setIsAdding(oneProduct.id)
      setTimeout(()=>{
        // console.log(cartArr);
        
        const CartIndex = cartArr.findIndex((cart)=> cart.id === oneProduct.id);
        // console.log(CartIndex)
        if(CartIndex === -1){
          setCartArr([...cartArr, {...oneProduct, quantity: 1}]);
          //Update firebase
          const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: [...cartArr, {...oneProduct, quantity: 1}],
          })
        }
        else{
          const index = cartArr.findIndex((cart)=> cart.id === oneProduct.id);
          const newArr = [...cartArr];
          newArr[index].quantity += 1;
          setCartArr(newArr);
          //Update firebase
          const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: newArr,
          })
        }
        setIsAdding(null)
        toast.success('Increase product count');
      },1000)
      }
      //! Total Purchess
      const totalPurchess = ()=>{
        const total = cartArr.reduce((past, present)=>{
          return past + present.quantity * present.price
        },0)
        return total;
      }
      // ! Remove To Cart
      const handleRemoveToCart = (ID)=>{
        // console.log(ID)
        // console.log("cartArr", cartArr)
        setIsRemoving(ID);
        setTimeout(() => {
          const newArr =  cartArr.filter((cart)=> cart.id !== ID);
          setCartArr(newArr);
          //todo Update firebase
          const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: newArr,
          })
          setIsRemoving(null);
          toast.success('Product Remove Successfull');
        }, 800);
      }
      //! Handle Incress Cart
      const handleIncress = (oneCart, index)=>{
        // console.log(index,oneCart);
        const newArr = [...cartArr];
        // console.log(newArr)
        newArr[index] = {...newArr[index], quantity: newArr[index].quantity + 1}
        setCartArr(newArr)
        //todo Update firebase
        const user = doc(db, "Users", signedUser.id);
        updateDoc(user,{
          cartArr: newArr,
        })
      }
      //! Handle decress Cart
      const handledecress = (oneCart, index)=>{
        // console.log(index,oneCart);
        const newArr = [...cartArr];
        if(newArr[index].quantity > 1){
          newArr[index] = {...newArr[index], quantity: newArr[index].quantity - 1}
          setCartArr(newArr)
          // todo Update firebase
          const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: newArr,
          })
        }else{
          const newArr =  cartArr.filter((cart)=> cart.id !== oneCart.id);
          setCartArr(newArr);
          // todo Update firebase
          const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: newArr,
          })
          toast.success('Product Remove Successfull');
        }
      }
      //! Click Purchess Button
      const handlePurchess = (navigate)=>{
        // const updatedMyOrder = [[...cartArr], ...myOrder];
        const updatedMyOrder = [{ orderItems: [...cartArr], orderDate: new Date().toISOString() }, ...myOrder];
        // console.log("Smart Sankar", updatedMyOrder)
        setMyOrder(updatedMyOrder);
        setCartArr([]);
        const user = doc(db, "Users", signedUser.id);
          updateDoc(user,{
            cartArr: [],
            MyOrder: updatedMyOrder,
          })
        toast.error('Product Cart is Empty!');
        navigate("/myOrder")
      }
      //! ............................................My Order.................................................
      //! Total Card Order
      const handleTotalOrder = (ind)=>{
        return myOrder[ind].orderItems.reduce((past, present)=>{
          return past + present.price*present.quantity;
        },0)
      }
      // console.log("signedUser", signedUser)
      // console.log("A vai", totalPurchess())
      // console.log("myOrder", myOrder)
    return(
        <ProductContext.Provider value={{
            productArr, 
            setProductArr,
            cartArr, 
            setCartArr, 
            handleAddToCart,
            loadProduct, 
            setLoadProduct,
            totalPurchess,
            handleRemoveToCart,
            handleIncress,
            handledecress,
            isRemoving, 
            setIsRemoving,
            loadCart,
            isAdding,
            handlePurchess,
            myOrder, 
            setMyOrder,
            handleTotalOrder,    
            searchName, setsearchName,    
            filterPrice, setfilterPrice,
            categoryProduct, setcategoryProduct,
            filterProductArr, setFilterProductArr,
            isFiltered, setIsfiltered,
            categories,handleCartNavigation,
            loadMyOrder, setLoadMyOrder,
            handleMyOrderNavigation,
            handleHomeNavigation
            }}>
            {children }
        </ProductContext.Provider>
    )
}

//Todo 3.  Custom Hook
function useCustomHook(){
  const value = useContext(ProductContext);
  return value;
}

export {CustomProductContext, useCustomHook};