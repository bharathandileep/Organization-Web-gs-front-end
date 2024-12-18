const API_URL = 'http://localhost:5000/api/kitchen'; // Update with your actual API URL

export interface Kitchen {
  _id: string;
  kitchen_id: string;
  f_name: string;
  l_name: string;
  username: string;
  password: string;
  phone_no: number;
  order_id?: any; // Optional, if applicable
  image_url: string;
  location_id: number;
  description:string,
  created_by: string; // Expecting a string that represents ObjectId
  created_at: Date;
  updated_by: string; // Expecting a string that represents ObjectId
  updated_at: Date;
}

interface KitchenResponse {
  data: Kitchen[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}


export const getKitchens = async (
  page: number = 1,
  limit: number = 4
): Promise<KitchenResponse> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch kitchens");
  }

  const data: KitchenResponse = await response.json();
  return data;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Network response was not ok');
  }
  return response.json();
};

export const useKitchenApi = () => {
  const fetchWithErrorHandling = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
    try {
      const response = await fetch(input, init);
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred while fetching data');
    }
  };

  // const getKitchens = async (): Promise<Kitchen[]> => {
  //   const response = await fetchWithErrorHandling(API_URL);
  //   return response.data; // Access the 'data' field containing the kitchens array
  // };
  
  const deleteKitchen = async (id: string): Promise<any> => {
    await fetchWithErrorHandling(`${API_URL}/${id}`, { method: 'DELETE' });
  };

  const updateKitchen = async (id: string, data: Partial<Kitchen>): Promise<Kitchen | null> => {
    const transformedData = {
      ...data,
      phone_no: data.phone_no ? Number(data.phone_no) : undefined,
      created_at: data.created_at ? new Date(data.created_at) : undefined,
      updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
    };

    return fetchWithErrorHandling(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    });
  };


  return {
    getKitchens,
    deleteKitchen,
    updateKitchen,
   
  };
};


export const addKitchen = async (data: Omit<Kitchen, '_id'>): Promise<Kitchen> => {
  const { phone_no, ...rest } = data;
  const newData = { ...rest, phone: Number(phone_no) };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (POST):', errorText);
    // Handle unique constraint error
    if (errorText.includes('employee_id must be unique')) {
      throw new Error('The employee ID must be unique. Please choose a different ID.');
    }
    throw new Error('Failed to add employee');
  }
  return response.json();

}
// export const addKitchen = async (data: Omit<Kitchen, '_id'>): Promise<Kitchen | null> => {
//   const transformedData = {
//     ...data,
//     phone_no: Number(data.phone_no), // Ensure phone_no is a number
//     created_at: new Date(data.created_at), // Ensure created_at is a Date
//     updated_at: new Date(data.updated_at), // Ensure updated_at is a Date
//   };

//   return fetchWithErrorHandling(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(transformedData),
//   });
// };

// const API_URL = 'http://localhost:5000/api/kitchen'; // Update with your actual API URL

// // Define a type for the API response
// export interface KitchenResponse {
//   status: number;
//   message: string;
//   data: {
//     kitchens: Kitchen[];
//     currentPage: number;
//     totalItems: number;
//     totalPages: number;
//   };
// }

// export interface Kitchen {
//   _id: string;
//   kitchen_id: string;
//   f_name: string;
//   l_name: string;
//   username: string;
//   password: string;
//   phone_no: number;
//   order_id?: string; // Optional, if applicable
//   image_url: string;
//   location_id: number;
//   description: string;
//   created_by: string; // Expecting a string that represents ObjectId
//   created_at: Date;
//   updated_by: string; // Expecting a string that represents ObjectId
//   updated_at: Date;
// }

// const handleResponse = async (response: Response) => {
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || 'Network response was not ok');
//   }
//   return response.json();
// };

// export const useKitchenApi = () => {
//   const fetchWithErrorHandling = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
//     try {
//       const response = await fetch(input, init);
//       return await handleResponse(response);
//     } catch (error: any) {
//       throw new Error(error.message || 'An error occurred while fetching data');
//     }
//   };

//   const getKitchens = async (): Promise<KitchenResponse> => {
//     return fetchWithErrorHandling(API_URL);
//   };

//   const deleteKitchen = async (id: string): Promise<void> => {
//     await fetchWithErrorHandling(`${API_URL}/${id}`, { method: 'DELETE' });
//   };

//   const updateKitchen = async (id: string, data: Partial<Kitchen>): Promise<Kitchen | null> => {
//     const transformedData = {
//       ...data,
//       phone_no: data.phone_no ? Number(data.phone_no) : undefined,
//       created_at: data.created_at ? new Date(data.created_at) : undefined,
//       updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
//     };

//     return fetchWithErrorHandling(`${API_URL}/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(transformedData),
//     });
//   };

//   const addKitchen = async (data: Omit<Kitchen, '_id'>): Promise<Kitchen | null> => {
//     const transformedData = {
//       ...data,
//       phone_no: Number(data.phone_no), // Ensure phone_no is a number
//       created_at: new Date(data.created_at), // Ensure created_at is a Date
//       updated_at: new Date(data.updated_at), // Ensure updated_at is a Date
//     };

//     return fetchWithErrorHandling(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(transformedData),
//     });
//   };

//   return {
//     getKitchens,
//     deleteKitchen,
//     updateKitchen,
//     addKitchen,
//   };
// };
