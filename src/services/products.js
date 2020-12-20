import http from "../http-common";

class ProductService {

    PRODUCT_ENDPOINT = '/products';

    getAll() {
        return http.get(this.PRODUCT_ENDPOINT);
    }

    get(id) {
        return http.get(this.PRODUCT_ENDPOINT + `/${id}`);
    }

    create(data) {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        return http.post(this.PRODUCT_ENDPOINT, data, config);
    }

    update(id, data) {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        data.append("_method", "put");
        return http.post(this.PRODUCT_ENDPOINT + `/${id}`, data, config);
    }

    delete(id) {
        return http.delete(this.PRODUCT_ENDPOINT + `/${id}`);
    }

    deleteAll() {
        return http.delete(this.PRODUCT_ENDPOINT);
    }

    findByTitle(title) {
        return http.get(this.PRODUCT_ENDPOINT + `?title=${title}`);
    }
}

export default new ProductService();