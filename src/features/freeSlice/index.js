import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const freeApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Replace '/api' with your API endpoint
  endpoints: (builder) => ({
    getfree: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `free`, // Update the endpoint URL
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
    }),

    createfree: builder.mutation({
      query: (newFree) => ({
        url: "free",
        method: "POST",
        body: newFree,
      }),
    }),
  }),
});

export const { useGetfreeQuery, useCreatefreeMutation } = freeApi;
export { freeApi };
