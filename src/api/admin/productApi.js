import axiosClient from '../axiosClient'

const productApi = {
    getAll: () => axiosClient.get('getAllProductAdmin'),
    // create: (params) => axiosClient.post('admin/createProduct.php', params),
    // getOne: (id) => axiosClient.get(`admin/showProduct.php?id=${id}`),
    // update: (params) => axiosClient.post("admin/updateProduct.php", params),
    // delete: (id) => axiosClient.post(`admin/deleteProduct.php?id=${id}`),

}

export default productApi