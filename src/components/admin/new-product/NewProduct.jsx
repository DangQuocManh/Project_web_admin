import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import accountApi from '../../../api/account'
import './new-product.scss'
const NewProduct = () => {

    const selectFile = useRef()
    const navigate = useNavigate();

    const [idProduct, setIdProduct] = useState('')
    const [productCode, setProductCode] = useState('')
    const [brandCode, setBrandCode] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [parameters, setParameters] = useState('')
    const [description, setDescription] = useState('')
    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("product_code", productCode)
        formData.append("brand_code", brandCode)
        formData.append("name_product", name)
        formData.append("images", selectFile.current.files[0])
        formData.append("price", price)
        formData.append("product_parameters", parameters)
        formData.append("description", description)
        try {
            alert("Thêm thành công")
            const res = await accountApi.createProduct(formData)
            navigate(`/admin/products`)
            // console.log(res)
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }

    const [stateFile, setStateFile] = useState([]);
    const onChangeImage = (e) => {
        setStateFile([]);
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setStateFile((prevImages) => prevImages.concat(filesArray))
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file))
        }
    }

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return <img key={index} src={photo} alt="" />
        })
    }

    return (
        <div className='new__product'>
            <div className="new__product--top">
                <h2 className="page-header">
                    Create product
                </h2>
                <div className='btn'>
                    <button onClick={() => navigate('/admin/products')}>Cancel</button>
                    <button onClick={createProduct}>Create</button>
                </div>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    <div className='row form__create__product'>
                        <div className="l-4 form__create__product__left">
                            <div className="form-group">
                                <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                                <div className="result">{renderPhotos(stateFile)}</div>
                            </div>
                        </div>
                        <div className="l-8 form__create__product__right">
                            <div className="row">
                                {/* <div className="l-6">
                                    <div className="form-group">
                                        <input disabled value={idProduct} type="text" name="id" id="id" placeholder=" " />
                                        <label className='label' htmlFor="id">Id product</label>
                                    </div>
                                </div> */}
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={productCode} onChange={(e) => setProductCode(e.target.value)} type="text" name="productCode" id="productCode" placeholder=" " />
                                        <label className='label' htmlFor="ProductCode">Product code</label>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={brandCode} onChange={(e) => setBrandCode(e.target.value)} type="text" name="brandCode" id="brandCode" placeholder=" " />
                                        <label className='label' htmlFor="BrandCode">Brand code</label>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder=" " />
                                        <label className='label' htmlFor="Name">Name</label>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" id="price" placeholder=" " />
                                        <label className='label' htmlFor="Price">Price</label>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={parameters} onChange={(e) => setParameters(e.target.value)} type="text" name="parameters" id="parameters" placeholder=" " />
                                        <label className='label' htmlFor="Parameters">Parameters</label>
                                    </div>
                                </div>
                                <div className="l-6">
                                    <div className="form-group">
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" placeholder=" " />
                                        <label className='label' htmlFor="id">Description</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewProduct
