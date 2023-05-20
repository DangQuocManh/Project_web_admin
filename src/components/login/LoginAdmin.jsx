import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import cookies from 'react-cookies'
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/user/userSlice';

import accountApi from '../../api/account';
import './login.scss';
import RouteAdmin from '../../config/RouteAdmin';

const LoginAdmin = () => {

    const [userData, setUserData] = useState([{}])
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isShowPass, setIsShowPass] = useState(false)
    const [checkMail, setCheckMail] = useState(true)
    const [checkPass, setCheckPass] = useState(true)

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePass = (e) => {
        setPass(e.target.value);
    }

    const handleShowPass = () => {
        setIsShowPass(!isShowPass)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const onSubmit = (e) => {
        e.preventDefault();

        const getAccount = async () => {
            try {
                const res = await accountApi.getAllAccount()
                console.log("account")
                console.log(res.data)
                setUserData(res.data)
                console.log(userData)

                if (res.data) {
                    // console.log("userdata")
                    // console.log(userData)
                    const getUserData = (email) => res.data.find(e => e.email === email)
                    const user = getUserData(email)

                    if (user) {
                        console.log("user")
                        console.log(user)
                        setCheckMail(true)
                        if (pass === user.password) {
                            setCheckPass(true)
                            dispatch(login({
                                id: user.id_user,
                                name: user.username,
                                email: user.email,
                                password: user.password,
                                avatar: user.avatar,
                                loggedIn: true,
                            }))
                            navigate('/admin')
                            cookies.save("user", user)

                        } else {
                            setCheckPass(false)
                        }
                    } else {
                        setCheckMail(false)
                    }
                } else {
                    console.log("userdata null")
                }
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()

        // if (userData) {
        //     console.log("userdata")
        //     console.log(userData)
        //     const getUserData = (email) => userData.find(e => e.email === email)
        //     const user = getUserData(email)

        //     if (user) {
        //         setCheckMail(true)
        //         if (pass === user.password) {
        //             setCheckPass(true)
        //             dispatch(login({
        //                 id: user.id_user,
        //                 name: user.username,
        //                 email: user.email,
        //                 password: user.password,
        //                 avatar: user.avatar,
        //                 loggedIn: true,
        //             }))
        //             navigate('/admin')



        //             cookies.save("user", user)

        //         } else {
        //             setCheckPass(false)
        //         }
        //     } else {
        //         setCheckMail(false)
        //     }
        // } else {
        //     console.log("userdata null")
        // }
    }
    return (
        <form action method="POST" className="form" id="form-1">
            <div className="sign__in">
                <p className="sign__in--title">Đăng nhập</p>
                <div className="form-group">
                    <input className={checkMail ? '' : "check"} onChange={onChangeEmail} type="text" name="email" id="email" placeholder="Email" />
                    <div className="form-message">{checkMail ? "" : "Email không đúng. Vui lòng thử lại."}</div>
                </div>
                <div className="form-group">
                    <div className="password">
                        <input className={checkPass ? "" : "check"} onChange={onChangePass} type={isShowPass ? 'text' : 'password'} name="password" id="passwword" placeholder="Mật khẩu" />
                        <div onClick={handleShowPass} className="password__show">
                            <i className={isShowPass ? "icon__hide" : "icon__show"}></i>
                        </div>
                    </div>
                    <div className="form-message">{checkPass ? "" : "Mật khẩu không đúng. Vui lòng thử lại."}</div>
                </div>
            </div>
            <div className="remember">
                <div className="form-group">
                    <input type="checkbox" name="note" id="note" />
                    <span className="checkmark-box"></span>
                    <label htmlFor='note' className="save__pass">Ghi nhớ tài khoản</label>
                </div>
                {/* <div className="password__reset">Quên mật khẩu?</div> */}
            </div>
            <div className="submit">
                <button onClick={onSubmit} disabled={email !== '' && pass !== '' ? false : true}>Đăng nhập</button>
            </div>
            {/* <p className="no__account">Chưa có tài khoản</p>
            <div className="btn__sign__up">
                <Link to="/signin">Đăng ký tài khoản</Link>
            </div> */}
        </form>
    )
}

export default LoginAdmin
