import axios from "axios";

const ProductClient = {
    axiosInstance: axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        headers: { "Content-Type": "application/json" }
    }),

    // Add request interceptor to include auth token
    init() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const user = localStorage.getItem('user');
                if (user) {
                    const parsedUser = JSON.parse(user);
                    if (parsedUser.token) {
                        config.headers.Authorization = `Bearer ${parsedUser.token}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    },

    getProducts(limit, skip) {
        const params = {};
        if (limit) params.limit = limit;
        if (skip) params.skip = skip;
        return this.axiosInstance.get("/", { params });
    },

    getProductById(id) {
        return this.axiosInstance.get(`/${id}`);
    },

    createProduct(data) {
        return this.axiosInstance.post("/", data);
    },

    updateProduct(id, data) {
        return this.axiosInstance.put(`/${id}`, data);
    },

    deleteProduct(id) {
        return this.axiosInstance.delete(`/${id}`);
    }
};

export default ProductClient;
