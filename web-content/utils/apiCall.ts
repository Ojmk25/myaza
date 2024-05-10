import axios from 'axios';

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// utils/api.ts or directly in your component file


interface ApiResponse {
  message: string;
  data: any;
}

// export const postUserData = async (): Promise<ApiResponse> => {
//   const url = 'http://api.dev.cecurecast.com/open/v1/sign-up';
//   try {
//     const response = await axios.post(url, testData);
//     return response.data;
//   } 
//   catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Axios error:', error.response?.data);
//       // Handle error response (e.g., display an error message)
//       throw new Error(error.response?.data.message || 'Unknown error');
//     } else {
//       console.error('Unexpected error:', error);
//       throw new Error('An unexpected error occurred');
//     }
//   }
// };


const testData: User = {
  email: "abc",
  password: "abc",
  first_name: "xgfwtt3",
  last_name: "xgfwtt3"
}
export const postUserData = async () => {
  const response = await fetch('https://api.dev.cecurecast.com/open/v1/sign-up',
    {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },

      body: JSON.stringify({
        email: "abc",
        password: "abc",
        first_name: "xgfwtt3",
        last_name: "xgfwtt3"
      }),
    });

  // const data = await response.json();


  // return data;

};


export const getAPI = async () => {

  const response = await fetch('https://api.ipify.org/?format=json')
  // {
  // method: 'GET',
  // mode: 'no-cors',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   'Host': 'http://api.dev.cecurecast.com/open/v1/',
  // },
  // });

  // const data = await response.json();


  // return data;
  return response;

};
