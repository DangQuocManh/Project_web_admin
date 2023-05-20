import axiosClient from './axiosClient'
import axios from 'axios'

const accountApi = {
    // getAll: () => axiosClient.get('user/ReadAccount.php'),
    // getTopAccount: () => axiosClient.get('user/ReadTopAccount.php'),
    // create: (params) => axiosClient.post('user/CreateAccount.php', params),
    // getOne: (id) => axios.get(`http://localhost/vinfast/vinfast-backend/api/user/showAccount.php?id=${id}`),
    // update: (params) => axiosClient.post(`user/UpdateAccount.php`, params),
    // delete: (id) => axiosClient.post(`admin/deleteProduct.php?id=${id}`),

    // createByAdmin: (params) => axiosClient.post('admin/createAccount.php', params),
    // updateByAdmin: (params) => axiosClient.post(`admin/updateAccount.php`, params),
    // deleteByAdmin: (id) => axiosClient.delete(`admin/deleteAccount.php?id=${id}`),

    getAllAccount: () => axiosClient.get('getAllUsersAdmin'),
    getUserFromId: (idUser) => axiosClient.post(`getOneUserFromId`, { idUser: idUser }),
    updateAccount: (params) => axiosClient.post(`updateAccount`, params),
    deleteAccount: (idUser) => axiosClient.post(`deleteAccountByAdmin`, { idUser: idUser }),
    createAccount: (params) => axiosClient.post(`createAccountByAdmin`, params),

    getAllProductAdmin: () => axiosClient.get('getAllProductAdmin'),
    getProductFromId: (idProduct) => axiosClient.post(`getOneProductFromId`, { idProduct: idProduct }),
    updateProduct: (params) => axiosClient.post(`updateProduct`, params),
    deleteProduct: (idPro) => axiosClient.post(`deleteProductByAdmin`, { idPro: idPro }),
    createProduct: (params) => axiosClient.post(`createProductByAdmin`, params),

    getAllOrder: () => axiosClient.get('getAllOrderAdmin'),
    getOneOrder: (idOrder) => axiosClient.post(`getOneOrder`, { idOrder: idOrder }),
    updateOrder: (idOrder, status) => axiosClient.post(`updateOrder`, { idOrder: idOrder, status: status }),

    getTopAccount: () => axiosClient.get(`getTopAccount`),
    getTopLatestOrder: () => axiosClient.get(`getTopLatestOrder`),

    getOrderStatistical: (from, to) => axiosClient.post(`getOrderStatistical`, { from: from, to: to }),
    getAccountStatistical: (from, to) => axiosClient.post(`getAccountStatistical`, { from, to })
}

export default accountApi