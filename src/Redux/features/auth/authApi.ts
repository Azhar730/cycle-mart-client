import { baseApi } from "@/Redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-user-status",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
    updateUserRole: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-user-role",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation
} = authApi;
