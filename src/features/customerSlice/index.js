import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customerApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Replace '/api' with your API endpoint
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `customers`, // Update the endpoint URL
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
    }),

    createCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: "customer",
        method: "POST",
        body: newCustomer,
      }),
    }),
  }),
});

export const { useGetCustomersQuery, useCreateCustomerMutation } = customerApi;
export { customerApi };
