import { baseApi } from "@/Redux/api/baseApi";

const bicycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBicycle: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/bicycles",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bicycles"],
    }),
    getSingleBicycle: builder.query({
      query: (id) => ({
        url: `/bicycles/${id}`,
        method: "GET",
      }),
      providesTags: ["bicycles"],
    }),
    deleteBicycle: builder.mutation({
      query: (id) => ({
        url: `/bicycles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bicycles"],
    }),
    addBicycle: builder.mutation({
      query: (formData) => ({
        url: "/bicycles/create-bicycle",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["bicycles"],
    }),
    updateBicycle: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/bicycles/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["bicycles"],
    }),
  }),
});
export const {
  useGetAllBicycleQuery,
  useGetSingleBicycleQuery,
  useAddBicycleMutation,
  useDeleteBicycleMutation,
  useUpdateBicycleMutation,
} = bicycleApi;
