import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const webApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Replace '/api' with your API endpoint
  endpoints: (builder) => ({
    getfree: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `web`, // Update the endpoint URL
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
    }),

    createWeb: builder.mutation({
      query: (newWeb) => ({
        url: "web",
        method: "POST",
        body: newWeb,
      }),
    }),
  }),
});

export const { useGetwebQuery, useCreatewebMutation } = webApi;
export { webApi };
