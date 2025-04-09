import { baseApi } from "@/Redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders/create-order",
        method: "POST",
        body: payload,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getMyOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
      verifyOrder: builder.query({
        query: (order_id) => ({
          url: "/orders/verify",
          params: { order_id },
          method: "GET",
        }),
      }),
    updateOrderStatus: builder.mutation({
      query: (payload) => ({
        url: "/orders/update-status",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrderQuery,
  useVerifyOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
