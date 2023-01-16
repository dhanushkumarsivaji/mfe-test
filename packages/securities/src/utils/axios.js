import axios from "axios";
import { API_END_POINT } from "../constants/API";
export let API = axios.create({ baseURL: API_END_POINT, timeout: 5000 });