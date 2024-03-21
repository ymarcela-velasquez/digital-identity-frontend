import { clsx } from "clsx"
import axios from 'axios'
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const baseURL = `${process.env.API_URL}/`
console.log();
export const apiRequest = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      // authorization: `bearer ${getToken()}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
}
