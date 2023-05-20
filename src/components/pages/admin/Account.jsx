import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from '../../admin/table/Table'
import accountApi from '../../../api/account'

const loginTableHead = [
    '',
    'avatar',
    'username',
    'password',
    'email',
    'phone',
    'address',
    'type',
    'action'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index}</td>
        <td>
            <img src={item.avatar} alt="" />
        </td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.address}</td>
        <td>{item.type}</td>
        <td>
            <Link to={`/admin/accounts/${item.id_user}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

function Products() {

    // const [accountData, setAccountData] = useState([{
    //     id: 1, avatar: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889.jpg",
    //     name: "name", password: "password", email: "email", phone: "phone", address: "address", role: "role",
    // },
    // {
    //     id: 2, avatar: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889.jpg",
    //     name: "name", password: "password", email: "email", phone: "phone", address: "address", role: "role",
    // },

    const [accountData, setAccountData] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        const getAccountApi = async () => {
            try {
                const res = await accountApi.getAllAccount()
                // console.log(res)
                // console.log(res.data)
                setAccountData(res.data)
                // console.log('account data')
                // console.log(accountData)
                setRender(true)
            } catch (err) {
                console.log(err)
            }
        }
        getAccountApi()
    }, [])

    // setRender(true)
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Account list</p>
                <Link to="/admin/accounts/new_account">
                    <button className="productAddButton">Create</button>
                </Link>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                render &&
                                <Table
                                    limit='10'
                                    headData={loginTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={accountData}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products
