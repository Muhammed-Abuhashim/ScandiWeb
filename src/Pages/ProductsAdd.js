import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/productadd.css';
import Header from '../components/header';
import Footer from '../components/footer';


const ProductsAdd = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const [sku, setsku] = useState('');
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [size, setsize] = useState('');
    const [weight, setweight] = useState('');
    const [height, setheight] = useState('');
    const [width, setwidth] = useState('');
    const [length, setlenght] = useState('');
    const [msg, setmsg] = useState('');
    const [isDuplicate, setisDuplicate] = useState([]);
    const navigate = useNavigate();

    let fData = new FormData();
    fData.append('sku',sku);
    fData.append('name',name);
    fData.append('price',price);
    fData.append('size',size);
    fData.append('weight',weight);
    fData.append('height',height);
    fData.append('width',width);
    fData.append('length',length);
    
    const url = 'http://localhost/formsubmit.php';
    
    const FetchData = ()=>{
      try{
        fetch("http://localhost/api.php")
        .then(res =>res.json())
        .then(
            (result)=>{
              setisDuplicate(result);
            }
        )
      }
      catch(error){
        console.log(error);
      }
    };
    
    useEffect(()=>{
        FetchData();
    },[]);
    
    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    }
    const handleSubmit = async (e) => { 
      e.preventDefault();
      if(sku.length === 0){
        setmsg("SKU is Empity");
      }
      else if(name.length === 0){
        setmsg("Name is Empity!");
      }
      else if(price.length === 0){
        setmsg("Price is Empity!");
      }
      else if(selectedValue === ""){
        setmsg("Select an Option!");
      }    
      else if(selectedValue){
        if(selectedValue === "dvd" && size.length === 0){
          setmsg("Size is Empity!");
        }
        else if(selectedValue === "book" && weight.length === 0){
          setmsg("Weight is Empity!");
        }
        else if(selectedValue === "furniture"){
          if(height.length === 0){
            setmsg("Height is Empity!");
          }
          else if(width.length === 0){
            setmsg("Width is Empity!");
          }
          else if(length.length === 0){
            setmsg("Length is Empity!");
          }
          else{
            if(isDuplicate.some((item)=>item.sku===sku)){
              setmsg("SKU is Duplicate");
              return;
            }
            axios.post(url, fData).then(navigate('/')).then(window.location.reload());            
          }
        }
        else{
          if(isDuplicate.some((item)=>item.sku===sku)){
            setmsg("SKU is Duplicate");
            return;
          }
          console.log(weight);
          axios.post(url, fData).then(navigate('/')).then(window.location.reload());
        }
      } 
    }
  return (
    <>
    <Header path ={'/'} path2 ={'/'} btn={"Save"}  btn2={"Cancel" } headertext={"Product Add"} onClickSubmit={handleSubmit}/>
    <div className="container">  
      <form onSubmit={handleSubmit} id="product_form"  action="" method="post">
        <h3>Add Product</h3>
        <h4 id='add-h4'>Welcome 🥰🥰</h4>
        <h4 className='errormsg'>{msg}</h4>
        <fieldset>
          <label htmlFor="sku" className='label1'>SKU</label>
          <input placeholder="#sku" id='sku' type="text" value={sku} tabIndex="1" onChange={(e)=>(setsku(e.target.value))} required autoFocus />
        </fieldset>
        <fieldset>
          <label htmlFor="name" className='label2'>Name</label>
          <input placeholder="#name" id='name' type="text" value={name} tabIndex="2" onChange={(e)=>(setname(e.target.value))} required />
        </fieldset>
        <fieldset>
          <label htmlFor="price" className='label3'>Price ($)</label>
          <input placeholder="#price" id='price' type="number" min="0" value={price} tabIndex="3" onChange={(e)=>(setprice(e.target.value))} required />
        </fieldset>
        <fieldset className='drop1'>
          <label htmlFor="dropdown" >Select an option:</label>
          <div className='dropdown'>
          <select id="productType" className='dropdown-select' value={selectedValue} onChange={(e)=>(handleSelectChange(e))} required>
            <option value=""></option>
            <option id='' value="dvd">DVD</option>
            <option id='' value="book">Book</option>
            <option id='' value="furniture">Furniture</option>
          </select>
          </div>
        </fieldset>
          {
            selectedValue === 'dvd' &&(
              <div>
                <fieldset>
                  <label htmlFor="size" className='label4'>Size (MB)</label>
                  <input placeholder="#size" id='size' type="number" min="0" value={size} tabIndex="4" onChange={(e)=>(setsize(e.target.value))} required />
                  <label  className='label5'>Please, provide disc space in MB.</label>
                </fieldset>
              </div>
            )
          }
          {
            selectedValue === 'book' &&(
              <div>
                <fieldset>
                  <label htmlFor="weight" className='label6'>Weight (KG)</label>
                  <input placeholder="#weight" id='weight' type="number" min="0" value={weight} tabIndex="5" onChange={(e)=>(setweight(e.target.value))} required />
                  <label  className='label7'>Please, provide weight in KG.</label>
                </fieldset>
              </div>
            )
          }
          {
            selectedValue === 'furniture' &&(
              <div>
                <fieldset>
                  <label htmlFor="height" className='label8'>Height (CM)</label>
                  <input placeholder="#height" id='height' type="number" min="0" value={height} tabIndex="6" onChange={(e)=>(setheight(e.target.value))} required />
                  <label htmlFor="width" className='label9'>Width (CM)</label>
                  <input placeholder="#width" id='width' type="number" min="0" value={width} tabIndex="7" onChange={(e)=>(setwidth(e.target.value))} required />
                  <label htmlFor="length" className='label10'>Length (CM)</label>
                  <input placeholder="#length" id='length' type="number" min="0" value={length} tabIndex="8" onChange={(e)=>(setlenght(e.target.value))} required />
                  <label  className='label11'>Please, provide dimensions in CM.</label>
                </fieldset>
                
              </div>
            )
          }
        <fieldset></fieldset>
      </form>
    </div>
    <Footer/>
    </>
  )
}

export default ProductsAdd;
