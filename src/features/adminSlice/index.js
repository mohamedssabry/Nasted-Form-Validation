import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "admins",
  baseQuery: fetchBaseQuery({ baseUrl: "http://20.124.245.198/api/website/" }),
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `products`, // Update the endpoint URL
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
    }),

    createAdmin: builder.mutation({
      query: (payload) => ({
        url: "InitTemplate",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAdminsQuery, useCreateAdminMutation } = adminApi;
export { adminApi };
