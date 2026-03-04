import { api } from "./client";

export const getAdminDashboard = async () => {
  return api("/admin/dashboard");
};

export const getAssignedCustomers = async () => {
  return api("/admin/customers");
};

export const getCustomerProfile = async (customerId: string) => {
  return api(`/admin/customers/${customerId}`);
};

export const createCustomer = async (phone: string) => {
  return api("/admin/customers", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
};
