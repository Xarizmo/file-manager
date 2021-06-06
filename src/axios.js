import axios from "axios";

const instance = axios.create({
  baseURL: "http://164.90.161.80:3000/api/content",
});

export default instance;
