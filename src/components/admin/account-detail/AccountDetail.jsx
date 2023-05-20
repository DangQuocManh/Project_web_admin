import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import accountApi from '../../../api/account'

import './account-detail.scss'

const AccountDetail = () => {

    const { id } = useParams();
    console.log("id")
    console.log(id)

    const [accountData, setAccountData] = useState([])

    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getUserFromId(id)
                setAccountData(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getAccountApi()
    }, [id])

    console.log("Test")
    console.log(accountData)
    return (
        <div className='public__detail'>
            <div className="new__public--top">
                <h2 className="page-header">
                    Account Detail
                </h2>
            </div>
            <div className="form__create">
                <form className="formCreate" action="">
                    {
                        accountData[0] ? <AccountInfo account={accountData[0]} /> : null
                    }
                </form>
            </div>
        </div>
    )
}

export default AccountDetail

const AccountInfo = ({ account }) => {
    // console.log(account)
    // console.log("account name: ", account.username)
    const navigate = useNavigate();

    const selectFile = useRef()

    //
    // setId(account.id_user)
    // const [account.id, setaccount.id] = useState(account.id)

    const [name, setName] = useState(account.username)
    const [password, setPassword] = useState(account.password)
    const [email, setEmail] = useState(account.email)
    const [phone, setPhone] = useState(account.phone)
    const [address, setAddress] = useState(account.address)
    const [role, setRole] = useState(account.type)
    const updateAccount = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("idUser", account.id_user)
        formData.append("images", selectFile.current.files[0] || account.avatar)
        formData.append("username", name)
        formData.append("password", password)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("address", address)
        formData.append("type", role)

        const updateAccount = async () => {
            try {
                const res = await accountApi.updateAccount(formData)
                alert("Cập nhật thành công")
                navigate(`/admin/accounts`)
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        updateAccount()
    }

    const DeleteAccount = async (e) => {
        e.preventDefault();
        try {
            const res = await accountApi.deleteAccount(account.id_user)
            alert("Xóa thành công")
            navigate(`/admin/accounts`)
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
    // console.log(account)

    return (
        <>
            <div className='btn'>
                <button onClick={updateAccount}>update</button>
                <button onClick={DeleteAccount}>Delete</button>
            </div>
            <div className='row form__account__detail'>
                <div className="l-4 form__account__detail__left">
                    <div className="form-group">
                        <input type="file" ref={selectFile} onChange={onChangeImage} className="form-control" multiple required />
                        {stateFile === undefined ? <img src={account.avatar} alt="" width="350px" height="250px" /> : <div className="result">{renderPhotos(stateFile)}</div>}
                    </div>
                </div>
                <div className="l-8 form__account__detail__right">
                    <div className="row">
                        <div className="l-6">
                            <div className="form-group">
                                <input disabled value={account.id_user} type="text" name="id" id="id" placeholder=" " />
                                <label className='label' htmlFor="id">Id Account</label>
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
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder=" " />
                                <label className='label' htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" id="password" placeholder=" " />
                                <label className='label' htmlFor="password">password</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" placeholder=" " />
                                <label className='label' htmlFor="phone">phone</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" placeholder=" " />
                                <label className='label' htmlFor="address">address</label>
                            </div>
                        </div>
                        <div className="l-6">
                            <div className="form-group">
                                <input value={role} onChange={(e) => setRole(e.target.value)} type="text" name="role" id="role" placeholder=" " />
                                <label className='label' htmlFor="role">Role</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
