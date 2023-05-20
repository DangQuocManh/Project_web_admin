import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../admin/table/Table'

import accountApi from '../../../api/account'

const productTableHead = [
    '',
    'product code',
    'brand code',
    'name_product',
    'image',
    'price',
    'product_parameters',
    'description',
    'action'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.product_code}</td>
        <td>{item.brand_code}</td>
        <td>{item.name_product}</td>
        <td style={{ width: '12%' }}>
            <img src={item.image} alt="" />
        </td>
        <td>{item.price ? new Intl.NumberFormat('en').format(item.price) + 'đ' : 0}</td>
        <td>{item.product_parameters}</td>
        <td>{item.description}</td>
        <td>
            <Link to={`/admin/products/${item.id}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

const Products = () => {

    // const [productsData, setProductsData] = useState([
    //     {
    //         id: 1, product_code: "product_code", brand_code: "brand_code", name_product: "name_product",
    //         image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889.jpg", price: "price",
    //         product_parameters: `"Chip I5-10300H cùng card đồ họa rời GeForce GTX 1650 edit video thoải mái, chiến game hiệu năng hàng đầu/n
    //         Ram 8GB, nâng cấp tối đa 32GB cùng ổ cứng SSD có không gian lưu trữ lên tới 512GB mang lại thời gian khởi động hay load ứng dụng nhanh chóng/n
    //         Màn hình 15.6 inches với độ phân giải Full HD, độ phủ màu SRGB 62.5% chất lượng hiển thị rõ ràng/n
    //         Đa dạng cổng giao tiếp, dễ dàng sử dụng
    //         Bàn phím được tích hợp đèn nền LED RGB - sống động trong từng trận đấu/n
    //         Vỏ nhựa cứng cáp, trọng lượng máy 2.30 kg cho cảm giác cầm chắc tay/n
    //         Máy đi kèm Windows 11 Home bản quyền"`,
    //         description: `Laptop ASUS TUF Gaming F15 FX506LHB-HN188W - Tuyệt phẩm gaming đồ họa nặng
    //         Với những tựa game "bom tấn" gay cấn và hấp dẫn hiện nay, game thủ sẽ cần đến laptop ASUS TUF Gaming F15 FX506LHB-HN188W chứa đựng CPU Intel thế hệ 10 cùng đồ họa GeForce GTX để có được trải nghiệm gaming tối ưu ở thiết lập đồ họa cao./n

    //         Thiết kế nổi trội, màn hình 144 Hz
    //         Laptop ASUS TUF Gaming F15 FX506LHB-HN188W hấp dẫn các game thủ nhờ ngoại hình nổi trội và tông màu đen ấn tượng. Chiếc máy được chế tác với lớp vỏ cứng cáp và gia cố cho độ bền chuẩn quân đội, sẵn sàng đồng hành cùng game thủ cho những ván đấu. Bàn phím trên laptop ASUS TUF Gaming F15 FX506LHB-HN188W mang chuẩn full-size với dãy NumPad tiện lợi.
    //         Laptop ASUS TUF Gaming F15 FX506LHB-HN188W là dòng laptop làm đồ họa mang đến hình ảnh mượt nét với màn hình 15.6 inch độ phân giải Full HD (1920x1080). Tần số quét lên đến 144 Hz đảm bảo chuyển động mượt mà trên màn hình của máy. Công nghệ Adaptive Sync cũng giúp đồng bộ tần số quét với hiệu năng GPU để giảm giật lag và xé hình, đảm bảo trải nghiệm đắm chìm vào thế giới game./n

    //         Hiệu năng chuyên gaming với Intel Gen 10 và GeForce GTX/n
    //         Laptop ASUS TUF Gaming F15 FX506LHB-HN188W được chế tác cho trải nghiệm "phá đảo" trò chơi một cách thoải mái. Sức mạnh của máy đến từ bộ đôi CPU Intel Core i5 thế hệ 10 dòng H và GPU NVIDIA GeForce GTX series đáp ứng được hàng loạt trò chơi thế giới mở phiêu lưu hấp dẫn. Bộ nhớ RAM 8 GB và dung lượng ổ cứng SSD 512 GB giúp cho laptop ASUS TUF Gaming F15 FX506LHB-HN188W phục vụ tốt không chỉ giải trí, mà còn cả công việc và học tập./n
    //         Ngoài ra, bên trong ASUS TUF Gaming F15 FX506LHB-HN188W còn chứa đựng hệ thống tản nhiệt hiệu năng cao, giúp phần cứng vận hành tối đa công suất mà vẫn giữ được độ bền. Âm thanh trên laptop gaming giá rẻ này được cường hóa với hệ thống Smart Amplifier và chuẩn âm DTS cao cấp. Chiếc máy cũng tích hợp hệ điều hành Windows 11 giúp giữ laptop tiếp cận với những tính năng từ Windows./n`
    //     },
    const [productsData, setProductsData] = useState([])
    const [render, setRender] = useState(false)
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await accountApi.getAllProductAdmin()
                setProductsData(res.data)
                setRender(true)
            } catch (err) {
                console.log(err)
            }
        }
        getProductApi()
    }, [])
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Product list</p>
                <Link to="/admin/products/new_product">
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
                                    limit='6'
                                    headData={productTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={productsData}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
