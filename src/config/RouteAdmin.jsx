import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { selectUser } from '../redux/user/userSlice';
import { selectUser } from '../redux/user/userSlice';

import Sidebar from '../components/admin/sidebar/Sidebar';
import TopNav from '../components/admin/topNav/TopNav';

import Customers from '../components/pages/admin/Customers';
import Dashboard from '../components/pages/admin/Dashboard';
import Account from '../components/pages/admin/Account';
import Products from '../components/pages/admin/Products';

import NewProduct from '../components/admin/new-product/NewProduct';
import NewAccount from '../components/admin/new-account/NewAccount';
import ProductDetail from '../components/admin/product-detail/ProductDetail';
import AccountDetail from '../components/admin/account-detail/AccountDetail';

import NotFound from '../components/user/not-found/NotFound';

const RouteAdmin = () => {
    // // const navigate = useNavigate();
    // const user = useSelector(selectUser);
    // // const [user, setUser] = useState("admin")

    // const navigate = useNavigate();
    // // const user = useSelector(selectUser);

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    return (
        <>
            {
                user === undefined ? navigate('/admin/') : null
                // user === 'admin'
            }
            <div className='layout'>
                <Sidebar />
                <div className="layout__content">
                    <TopNav />
                    <div className="layout__content-main">
                        {
                            user && user.type === 'sell' ?
                                <Routes>
                                    <Route exact path='customers' element={<Customers />} />
                                    <Route exact path='products' element={<Products />} />
                                    <Route exact path='products/:id' element={<ProductDetail />} />
                                    <Route exact path='products/new_product' element={<NewProduct />} />
                                    <Route exact path='/' element={<Dashboard />} />
                                    <Route path='*' element={<NotFound />} />
                                </Routes> : null
                        }
                        {
                            // user.name === 'admin' ?
                            user && user.type === 'admin' ?
                                <Routes>
                                    <Route path='accounts' element={<Account />} />
                                    <Route exact path='customers' element={<Customers />} />
                                    <Route exact path='products' element={<Products />} />
                                    <Route exact path='products/:id' element={<ProductDetail />} />
                                    <Route exact path='accounts/:id' element={<AccountDetail />} />
                                    <Route exact path='products/new_product' element={<NewProduct />} />
                                    <Route exact path='accounts/new_account' element={<NewAccount />} />
                                    <Route exact path='/' element={<Dashboard />} />
                                    <Route path='*' element={<NotFound />} />
                                    {/* <Route path='/login' element={<LoginAdmin />} /> */}
                                </Routes> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RouteAdmin

