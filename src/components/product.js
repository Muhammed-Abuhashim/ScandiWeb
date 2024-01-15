import React,{useState,useEffect} from 'react'
import '../css/product.css'
import axios from 'axios'
import Header from './header';
import Footer from './footer';

const Product = () => {
  const[item, setItem] = useState([]);
  const[isChecked, setisChecked] = useState([]);
  

  const FetchData = ()=>{
    try{
      fetch("http://localhost/api.php")
      .then(res =>res.json())
      .then(
          (result)=>{
              setItem(result);
          }
      )
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(()=>{
      FetchData();
  },[])

  const handlecheckbox =(e)=>{
    const {value, checked}= e.target;
    console.log(value);
    if(checked){
      setisChecked([...isChecked,value]);
    }
    else{
      setisChecked(isChecked.filter((e)=>e!== value));
    }
  }

  const alldelete = async()=>{
    await axios.post('http://localhost/delete.php', { ids: isChecked }).then(FetchData()).catch(error=> alert(error));  
  }
  return (
    <div> 
    <div><Header path ={'/ProductsAdd'} btn={'ADD'} btn2={'MASS DELETE'} headertext={"Product List"} onClickHandle={alldelete} /></div>
    <div className='PContainer-0'>
        {
          item.map( item =>(
            <div className='PContainer' key={item.sku} >
              <input id='check' className='delete-checkbox' type="checkbox" value={item.sku} checked={item.isChecked} onChange={(e)=>{handlecheckbox(e)}} ></input>
              <div className='PContent' >
                  <div className='items'>
                    <label>{item.sku}</label>
                    <label>{item.name}</label>
                    <label>{item.price}$</label>
                    <label>{item.size}</label>
                  </div>
              </div>
            </div>    
          ))
        }
    </div>
    <div><Footer/></div>
    </div>
  )
}

export default Product;
