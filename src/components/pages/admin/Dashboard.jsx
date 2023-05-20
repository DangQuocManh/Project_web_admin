import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import accountApi from '../../../api/account';
import customerApi from '../../../api/depost/customerApi';
import dashboardApi from '../../../api/admin/dashboardApi';
import './dashboard.scss';

const topAccount = {
    head: [
        // 'id',
        'name',
        'email',
        'address',
        'role',
    ]
}

const renderAccountHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderAccountBody = (item, index) => (
    <tr key={index}>
        {/* <td>{item.id_user}</td> */}
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.type}</td>
    </tr>
)

const latestOrders = {
    header: [
        // "order id",
        "name",
        "detail",
        "total price",
        "status"
    ]
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        {/* <td>{item.id}</td> */}
        <td>{item.name_user}</td>
        <td>{item.detail}</td>
        <td>{item.price ? new Intl.NumberFormat('en').format(item.price) + 'đ' : 0}</td>
        <td>
            {
                item.status === "pending" ? <span className="badge badge-warning">{item.status}</span> : null
            }
            {
                item.status === "accept" ? <span className="badge badge-success">{item.status}</span> : null
            }
            {
                item.status === "reject" ? <span className="badge badge-danger">{item.status}</span> : null
            }
        </td>
    </tr>
)

const Dashboard = () => {

    const [customerData, setCustomerData] = useState([])
    const [customerData5, setCustomerData5] = useState([])
    const [accountData, setAccountData] = useState([])
    const [accountData5, setAccountData5] = useState([])
    const [statistical, setStatistical] = useState([])
    const [from, setFrom] = useState('2023-01-01')
    const [to, setTo] = useState('2023-12-30')

    useEffect(() => {
        let isApiSubscribed = true;
        const getTopCustomerApi = async () => {
            try {
                const res = isApiSubscribed && await accountApi.getTopLatestOrder()
                setCustomerData5(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const getCustomerApi = async () => {
            try {
                const res = isApiSubscribed && await accountApi.getAllOrder()
                setCustomerData(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const getTopAccountApi = async () => {
            try {
                const res = isApiSubscribed && await accountApi.getTopAccount()
                setAccountData5(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getCustomerApi()
        getTopCustomerApi()
        getTopAccountApi()

        return () => {
            isApiSubscribed = false;
        };

    }, [from, to])

    useEffect(() => {
        let isApiSubscribed = true;
        const getCustomerApi = async () => {
            try {
                const res = isApiSubscribed && await accountApi.getOrderStatistical(from, to)
                setStatistical(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        const getAccountApi = async () => {
            try {
                const res = isApiSubscribed && await accountApi.getAccountStatistical(from, to)
                setAccountData(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        if (from > to) {
            alert("Vui lòng chọn ngày đúng thứ tự")
        } else {
            getCustomerApi()
            getAccountApi()
        }

        return () => {
            isApiSubscribed = false;
        };

    }, [from, to])

    const chart = (month) => {
        return customerData.filter(item => item.status === 'accept' && item.date_create.slice(0, 7) === `2023-${month}`)
    }

    const month1 = chart('01').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month2 = chart('02').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month3 = chart('03').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month4 = chart('04').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month5 = chart('05').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month6 = chart('06').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month7 = chart('07').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month8 = chart('08').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month9 = chart('09').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month10 = chart('10').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month11 = chart('11').reduce((a, b) => Number(a) + Number(b.price), 0)
    const month12 = chart('12').reduce((a, b) => Number(a) + Number(b.price), 0)

    // console.log(customerData)
    // console.log("customerData1: ")
    // console.log(customerData1)
    const chartOptions = {
        series: [{
            name: 'Online Revenue',
            data: [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12],
        }],
        options: {
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return new Intl.NumberFormat('en').format(value) + " vnđ";
                    }
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }

    const chartPie = (status) => {
        return statistical.filter(item => item.status === status)
    }

    const charrtPieOptions = {
        series: [chartPie('accept').length, chartPie('pending').length, chartPie('reject').length],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Accept', 'Pending', 'Reject'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }

    const statusCards = [
        {
            "icon": <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
            </svg>,
            "count": new Intl.NumberFormat('en').format(statistical.filter(item => item.status === 'accept').reduce((previousValue, currentValue) => Number(previousValue) + Number(currentValue.price), 0)) + ' vnđ',
            "title": "Monthly Revenue",
            "path": "/admin/customers"
        },
        {
            "icon": <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>,
            "count": statistical.length,
            "title": "New Orders",
            "path": "/admin/customers"
        },
        {
            "icon": <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>,
            "count": statistical.filter(item => item.status === 'accept').length,
            "title": "Monthly",
            "path": "/admin/customers"
        },
        {
            "icon": <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>,
            "count": accountData.length,
            "title": "New Accounts",
            "path": "/admin/accounts"
        }
    ]

    return (
        <div>
            <h2 className="page-header page-header--product">
                <p>Dashboard</p>
                <div className='page-header--thongke'>
                    <div className='from'>
                        <label htmlFor="from">From : </label>
                        <input on onChange={(e) => setFrom(e.target.value)} type="date" value={from} name="from" id="from" />
                    </div>
                    <div className='to'>
                        <label htmlFor="to">To : </label>
                        <input onChange={(e) => setTo(e.target.value)} type="date" value={to} name="to" id="to" />
                    </div>
                    <div className="btn">
                        <button className='productAddButton'>Statistical</button>
                    </div>
                </div>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="l-6" key={index}>
                                    <div className='status-card'>
                                        <Link to={item.path}>
                                            <div className="status-card__icon">{item.icon}</div>
                                            <div className="status-card__info">
                                                <h4>{item.count}</h4>
                                                <span>{item.title}</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="l-5">
                    <div className="card full-height">
                        {/* chart Pie*/}
                        <Chart
                            options={charrtPieOptions.options}
                            series={charrtPieOptions.series}
                            type="pie"
                            width={380}
                        />
                    </div>
                </div>
                <div className="l-7">
                    <div className="card full-height">
                        {/* chart */}
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="l-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>top account</h3>
                        </div>
                        <div className="card__body">
                            <div className="table-wrapper">
                                <table>
                                    {
                                        topAccount.head ? (
                                            <thead>
                                                <tr>
                                                    {
                                                        topAccount.head.map((item, index) => renderAccountHead(item, index))
                                                    }
                                                </tr>
                                            </thead>
                                        ) : null
                                    }
                                    {
                                        accountData5 ? (
                                            <tbody>
                                                {
                                                    accountData5.map((item, index) => renderAccountBody(item, index))
                                                }
                                            </tbody>
                                        ) : null
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="card__footer">
                            <Link to='/admin/accounts'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="l-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card__body">
                            <div className="table-wrapper">
                                <table>
                                    {
                                        latestOrders.header ? (
                                            <thead>
                                                <tr>
                                                    {
                                                        latestOrders.header.map((item, index) => renderOrderHead(item, index))
                                                    }
                                                </tr>
                                            </thead>
                                        ) : null
                                    }
                                    {
                                        customerData5 ? (
                                            <tbody>
                                                {
                                                    customerData5.map((item, index) => renderOrderBody(item, index))
                                                }
                                            </tbody>
                                        ) : null
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="card__footer">
                            <Link to='/admin/customers'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
