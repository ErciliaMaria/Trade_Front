import axios from "axios";

const API_URL = "http://localhost:8888"; 

export const executeTrade = async (tradeData) => {
  try {
    const response = await axios.post(`${API_URL}/trade`, tradeData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
