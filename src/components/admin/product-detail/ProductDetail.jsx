import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './product-detail.scss'
import accountApi from '../../../api/account'
const ProductDetail = () => {

    const { id } = useParams();

    console.log("id")
    console.log(id)

    const [productData, setProductData] = useState([{}])
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await accountApi.getProductFromId(id)
                setProductData(res)
                console.log("res")
                console.log(res)

            } catch (err) {
                console.log(err)
            }
        }
        getProductApi()

    }, [id])
    console.log("Test")
    console.log(productData.data)
    return (
        <div className='public__detail'>
            <div className="new__public--top">
                <h2 className="page-header">
                    Product Detail
                </h2>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    {
                        productData.data ? <ProductInfo product={productData.data[0]} /> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default ProductDetail

const ProductInfo = ({ product }) => {
    const navigate = useNavigate();

    const selectFile = useRef()
    const [idProduct, setIdProduct] = useState(product.id)
    const [productCode, setProductCode] = useState(product.product_code)
    const [brandCode, setBrandCode] = useState(product.brand_code)
    const [name, setName] = useState(product.name_product)
    const [price, setPrice] = useState(product.price)
    const [parameters, setParameters] = useState(product.product_parameters)
    const [description, setDescription] = useState(product.description)

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("idPro", idProduct)
        formData.append("product_code", productCode)
        formData.append("brand_code", brandCode)
        formData.append("name_product", name)
        formData.append("imgsrc", selectFile.current.files[0] || product.image)
        formData.append("price", price)
        formData.append("product_parameters", parameters)
        formData.append("description", description)

        const updateProductApi = async () => {
            try {
                alert("Cập nhật thành công")
                const res = await accountApi.updateProduct(formData)
                navigate(`/admin/products`)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        updateProductApi()
    }

    const DeleteProduct = async (e) => {
        e.preventDefault();
        try {
            alert("Xóa thành công")
            const res = await accountApi.deleteProduct(idProduct)
            navigate(`/admin/products`)
            // console.log(res)
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }

    const [stateFile, setStateFile] = useState();
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
            return <img key={index} src={photo} alt="" width="350px" height="250px" />
        })
    }
    return (
        <>
            <div className='btn'>
                <button onClick={updateProduct}>update</button>
                <button onClick={DeleteProduct}>Delete</button>
            </div>
            <div className='row form__product__detail'>
                <div className="l-4 form__product__detail__left">
                    <div className="form-group">
                        <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                        {stateFile === undefined ? <img src={product.image} alt="" width="350px" height="250px" /> : <div className="result">{renderPhotos(stateFile)}</div>}
                    </div>
                </div>
                <div className="l-8 form__product__detail__right">
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
        </>
    )
}
