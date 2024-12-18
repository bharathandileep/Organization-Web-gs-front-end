// // const API_URL = 'http://localhost:5000/api/employee'; // Update with your actual API URL

// // export interface Employee {
// //   _id: string;
// //   employee_id: string;
// //   f_name: string;
// //   l_name: string;
// //   email: string;
// //   phone: number;
// //   parent_org: string;
// //   hire_date: Date;
// //   job_title: string;
// //   created_by: string;
// //   created_at: Date;
// //   updated_by: string;
// //   updated_at: Date;
// // }

// // export const getEmployees = async (): Promise<Employee[]> => {
// //   const response = await fetch(API_URL);
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }
// //   return response.json();
// // };

// // export const deleteEmployee = async (id: string): Promise<void> => {
// //   const response = await fetch(`${API_URL}/${id}`, {
// //     method: 'DELETE'
// //   });
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }
// // };

// // export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee> => {
// //   const { phone, ...rest } = data;
// //   const updatedData = { ...rest, phone: Number(phone) };

// //   const response = await fetch(`${API_URL}/${id}`, {
// //     method: 'PUT',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(updatedData)
// //   });
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }
// //   return response.json();
// // };

// // export const addEmployee = async (data: Omit<Employee, '_id'>): Promise<Employee> => {
// //   const { phone, ...rest } = data;
// //   const newData = { ...rest, phone: Number(phone) };

// //   const response = await fetch(API_URL, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(newData)
// //   });
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok');
// //   }
// //   return response.json();
// // };

// const API_URL = 'http://localhost:5000/api/employee'; // Update with your actual API URL

// export interface Employee {
//   _id: string;
//   employee_id: string;
//   f_name: string;
//   l_name: string;
//   email: string;
//   phone: number;
//   parent_org: string;
//   hire_date: Date;
//   job_title: string;
//   created_by: string;
//   created_at: Date;
//   updated_by: string;
//   updated_at: Date;
// }

// export const getEmployees = async (): Promise<Employee[]> => {
//   const response = await fetch(API_URL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch employees');
//   }
//   return response.json();
// };

// export const deleteEmployee = async (id: string): Promise<void> => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error('Server Error (DELETE):', errorText);
//     throw new Error('Failed to delete employee');
//   }
// };

// export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee> => {
//   const { phone, ...rest } = data;
//   const updatedData = { ...rest, phone: Number(phone) };

//   console.log('Updated Data:', updatedData); // Log the data being sent

//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updatedData)
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error('Server Error (PUT):', errorText);
//     throw new Error('Failed to update employee');
//   }
//   return response.json();
// };

// export const addEmployee = async (data: Omit<Employee, '_id'>): Promise<Employee> => {
//   const { phone, ...rest } = data;
//   const newData = { ...rest, phone: Number(phone) };

//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newData)
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error('Server Error (POST):', errorText);
//     throw new Error('Failed to add employee');
//   }
//   return response.json();
// };

const API_URL = 'http://localhost:5000/api/employee'; // Update with your actual API URL

export interface Employee {
  _id: any;
  employee_id: string;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  parent_org: string;
  hire_date: Date;
  job_title: string;
  status:string;
  created_by: string;
  created_at: Date;
  updated_by: string;
  updated_at: Date;
}
interface EmployeeResponse {  
  data: Employee[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}


export const getEmployees = async (
  page: number = 1,
  limit: number = 4
): Promise<EmployeeResponse> => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data: EmployeeResponse = await response.json();
  return data;
};

// export const getEmployee = async (): Promise<Employee[]> => {
//   const response = await fetch(API_URL);
//   if (!response.ok) {
//     throw new Error('Failed to fetch employees');
//   }
//   return response.json();
// };
// export const getEmployee = async (): Promise<Employee[]> => {
//   const response = await fetch(API_URL);
//   if (!response.ok) {   
//     throw new Error('Failed to fetch employees');
//   }

//   const result = await response.json();
//   // Assuming the data is wrapped in a property named 'data'
//   if (result && Array.isArray(result.data)) {
//     return result.data;
//   } else {
//     throw new Error('Unexpected response format');
//   }
// };



export const deleteEmployee = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (DELETE):', errorText);
    throw new Error('Failed to delete employee');
  }
};

// export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee> => {
//   const { phone, ...rest } = data;
//   const updatedData = { ...rest, phone: Number(phone) };

//   console.log('Updated Data:', updatedData); // Log the data being sent

//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updatedData)
//   });
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error('Server Error (PUT):', errorText);
//     throw new Error('Failed to update employee');
//   }
//   return response.json();
// };

export const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<Employee> => {
  // Exclude the _id field from the update data
  const { _id, phone, ...rest } = data;
  const updatedData = { ...rest, phone: Number(phone) };

  console.log('Updated Data:', updatedData); // Log the data being sent

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Server Error (PUT):', errorText);
    throw new Error('Failed to update employee');
  }
  
  return response.json();
};


export const addEmployee = async (data: Omit<Employee, '_id'>): Promise<Employee> => {
  const { phone, ...rest } = data;
  const newData = { ...rest, phone: Number(phone) };

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
};
