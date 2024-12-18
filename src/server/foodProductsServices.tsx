const baseURL = 'http://localhost:5000/api/foodproducts'; // Update with your actual API URL

export interface FoodProduct {
  _id: any;
  food_id: string;
  food_name: string;
  food_price: number;
  food_description: string;
  image_url: string;
  kitchen_id: any;
  created_by: string;
  created_at: Date;    
  updated_by: any;
  updated_at: Date;
}
interface FoodProductResponse {
  data: FoodProduct[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}
export const getFoodProducts = async (
  page: number = 1,
  limit: number = 8
): Promise<FoodProductResponse> => {
  const response = await fetch(`${baseURL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data: FoodProductResponse = await response.json();
  return data;
};

// export const getFoodProducts = async (): Promise<FoodProduct[]> => {
//   const response = await fetch(baseURL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch food products');
//   }
//   return response.json();
// };

export const getFoodProductById = async (id: string): Promise<FoodProduct> => {
  const response = await fetch(`${baseURL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch food product');
  }
  return response.json();
};

export const deleteFoodProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (DELETE):', errorText);
    throw new Error('Failed to delete food product');
  }
};

export const updateFoodProduct = async (
  id: string,
  data: Partial<FoodProduct>
): Promise<FoodProduct> => {
  const { _id, ...rest } = data;

  console.log('Updated Data:', rest); // Log the data being sent

  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rest),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (PUT):', errorText);
    throw new Error('Failed to update food product');
  }

  return response.json();
};

export const addFoodProduct = async (data: Omit<FoodProduct, '_id'>): Promise<FoodProduct> => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (POST):', errorText);
    throw new Error('Failed to add food product');
  }
  return response.json();
};

// export interface FoodMenu {
//   _id:any;
//   food_id: string;
//   organization_id: any;
//   food_name: string;
//   food_price: string;
//   food_description: string;
//   image_url: string;
//   kitchen_id: any;
//   created_by: string;
//   created_at: any;
//   updated_by: string;
//   updated_at: any;
// }
// // Fetch all FoodMenu
// export const fetchFoodMenuApi = async (page: number, limit: number): Promise<{ foodproducts: FoodMenu[], pagination: { totalItems: number, totalPages: number, currentPage: number } }> => {
//   const response = await fetch(`${baseURL}/foodproducts?page=${page}&limit=${limit}`, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//   });
 
//   if (!response.ok) {
   
//       throw new Error(`HTTP error! Status: ${response.status}`);
//   }
 
//   return await response.json();
// };
// // console.log(fetchStaffsApi);
 
// // Delete a food
// export const deleteFoodMenuApi = async (food_id: string): Promise<FoodMenu[]> =>{
//   const response = await fetch(`${baseURL}/foodproducts/${food_id}`, {
//     method: 'DELETE',
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
 
//   const data: FoodMenu[] = await response.json();
//   return data;
// };
// // Define the POST API function
// export const postFoodMenuApi = async (newFood: Omit<FoodMenu, '_id'>): Promise<FoodMenu> => {
//   const response = await fetch(`${baseURL}/foodproducts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newFood),  
//   });
 
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
 
//   const data: FoodMenu = await response.json();
//   return data;
// };
 
// // Update a food product
// export const updateFoodMenuApi = async (id: string, updatedFood: Partial<Omit<FoodMenu, '_id'>>): Promise<FoodMenu> => {
//   const response = await fetch(`${baseURL}/foodproducts/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedFood),
//   });
 
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
 
//   const data: FoodMenu = await response.json();
//   return data;
// };