import React,{useCallback, useState} from 'react'
import { Input,Button, CellGroup,Uploader,Toast} from '@nutui/nutui-react';
import "./manage.css"
import axios from 'axios';

export default function ItemPage() {
  // Item Form
  const [itemName,setItemName] = useState("")
  const [price,setPrice] = useState("")
  const [desc,setDesc] = useState("")

  const onItemNameChange = (value)=>{
    setItemName(value)
  }

  const onPriceChange = (value)=>{
    setPrice(value)
  }

  const onDescChange = (value)=>{
    setDesc(value)
  }

  // Uploader
  const uploadUrl = '/api/upload'
  const onStart = () => {
    console.log('start 触发')
  }
  const [imageURL, setImageURL] = useState("")
  const onUploadSuccess = useCallback( (response) => { 
    setImageURL(JSON.parse(response.responseText).url)
  },[])

  const onRemoveImage = useCallback( () =>{
    setImageURL("")
  },[])

  // Button
  const onItemButtonClick = ()=>{
    if (!itemName || !price || !desc || !imageURL){
      Toast.text('Please check your input')
      return
    }
    let data = {name:itemName,price:parseFloat(price),desc:desc,image:imageURL}
    axios.post('/api/item', data)
    .then(function (response) {
      Toast.success("Create Success!")
      window.location.reload()
    })
    .catch(function (error) {
      Toast.fail("Create Failed!")
    });
    
}

  return (
    <div className='manage'>
      <div className='item'>
        <h2>Add Item</h2>
        <CellGroup>
          <Input label="Name" placeholder='Please Input the Name' change={onItemNameChange} requireShow />
          <Input label="Price" placeholder='Please Input the Price' change={onPriceChange} type="digit" requireShow />
          <Input label="Desc" placeholder='Please Input the Description' change={onDescChange} requireShow />
        </CellGroup>
        <h2>Upload Item Image</h2>
        <div className='upload'>
          <Uploader removeImage={onRemoveImage} success={onUploadSuccess} name="image" accept="image/gif,image/jpeg,image/png,image/jpg,image/webp" url={uploadUrl} start={onStart} />
        </div>
        
        
        <div className='submit'> 
        
        <Button block type="primary" onClick={onItemButtonClick}>Submit</Button>
        </div>
      </div>
      
    </div>
  )
}
