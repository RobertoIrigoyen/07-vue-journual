import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyBmy4LYZUa9RAt9-hs0_lNP54Bm8-G0vBk",
  },
});

export default authApi;
