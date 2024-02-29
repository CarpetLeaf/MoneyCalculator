import axios, { AxiosInstance } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:3000",
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
  async getMockRules() {
    const response = await this.axiosInstance.get("/getRules");
    return response.data;
  }
  async login(username: string, password: string) {
    const response = await this.axiosInstance.post("/login", {
      username,
      password,
    });
    return response.data;
  }
  async register(username: string, password: string) {
    const response = await this.axiosInstance.post("/register", {
      username,
      password,
    });
    return response.data;
  }
}

export default new ApiService();
