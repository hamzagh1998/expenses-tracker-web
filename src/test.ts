// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import * as yup from 'yup';
// import Input from '../../../../components/Forms/Input/Input';
// import Select from '../../../../components/Forms/Select/Select';
// import { Hint } from './addProduct.styles';
export {}
// export default function AddProductModal({open=false,onSave,onCancel,defaultData=null,onCreateProvider,providers=[]}) {

//   const [show, setShow] = useState(open);
//   const [product,setProduct] = useState(defaultData || {name:'',category:'',buyPrice:null})
//   const [productError,setProductError] = useState({name:false,category:false})

//   useEffect(() => {
//     if (defaultData) setProduct(defaultData)
//   }, [defaultData])
  

//   let schema = yup.object().shape({
//     name: yup.string().required('Please enter a name').default(""),
//     category: yup.string().required('Please select a category'),
//     buyPrice: yup.number().required('Please enter a buy price'),
//     sellPrice: yup.number().required('Please enter a buy price'),
//     provider: yup.string().required('Please select a provider'),
//   });


//   const handleInput = async (attribute,value) => {
//     setProduct(product => ({...product,...{[attribute]:value}}))
//     schema.validateAt(attribute,{[attribute]:value})
//     .then(resp=> {
//       setProductError(productError => ({...productError,...{[attribute]:''}}))

//     })
//     .catch(err =>{
//       setProductError(productError => ({...productError,...{[err.path]:err.message}}))
//     })
//   }
  
//   const handleClose = async () => {
//     try { await schema.validate(product,{ abortEarly: false }) }
//     catch (err) {
//       const pathToMessage = err.inner.reduce((acc, error) => {
//         acc[error.path] = error.message;
//         return acc;
//       }, {});
//       setProductError(pathToMessage)
//     }
//     if(product.name && product.category) {
//       setShow(false);
//       onSave(product)
//     }

//   }
//   const handleCancel = () => {
//     setShow(false);
//     setProduct({name:'',category:''})
//     setProductError({name:false,category:false})
//     onCancel()

//   }
 
//   const onAddName = (event) => {
//     handleInput('name',event.target.value)
//   }
//   const onAddCategory = (event) => {
//     handleInput('category',event.target.value)
//   }
//   const onAddBuyPrice = (event) => {
//     handleInput('buyPrice',event.target.value)
//   }
//   const onAddSellPrice = (event) => {
//     handleInput('sellPrice',event.target.value)
//   }
//   const onAddProvider = (event) => {
//     handleInput('provider',event.target.value)
//   }
//   const mapProvider = (data) => {
//     const array = []
//     data.forEach((item)=> {
//       array.push({label:item.phone+' - '+item.name, value:item.id})
//     })
//     return array
//   }
//   useEffect(() => {
//     setShow(open)
//   }, [open])
  
//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add a Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form >
//             <Input 
//               placeholder='name'
//               value={product.name}
//               onChange={onAddName}
//               isInvalid={productError.name}
//               isValid={!productError.name && product.name}
//             />
//             <Input 
//               placeholder="category"
//               value={product.category}
//               onChange={onAddCategory}
//               isInvalid={productError.category}
//               isValid={!productError.category && product.category}
//             />
//             <Select 
//               placeholder='Select a provider'
//               onChange={onAddProvider}
//               options={mapProvider(providers)}
//               isInvalid={productError.provider}
//               isValid={!productError.provider && product.provider}
//             />
//             <Input 
//               type="number"
//               placeholder="buy price"
//               value={product.buyPrice}
//               onChange={onAddBuyPrice}
//               isInvalid={productError.buyPrice}
//               isValid={!productError.buyPrice && product.buyPrice}
//             />
//             <Input 
//               type="number"
//               placeholder="sell price"
//               value={product.sellPrice}
//               onChange={onAddSellPrice}
//               isInvalid={productError.sellPrice}
//               isValid={!productError.sellPrice && product.sellPrice}
//             />
//           </Form>
//           <hr />
//           <Hint>You dont have a provider ? <a onClick={()=>onCreateProvider(product)} href='#AddProvider'>Click here to add a new one</a> </Hint>
          
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }