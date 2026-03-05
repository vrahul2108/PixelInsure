import { api } from "./client";

export const getSuperAdminDashboard = async () => {
  return api("/superadmin/dashboard");
};

export const getAllAdmins = async () => {
  return api("/superadmin/admins");
};

export const getAdminById = async (adminId: string) => {
  return api(`/superadmin/admins/${adminId}`);
};

export const createAdmin = async (data: {
  phone: string;
  name: string;
  email?: string;
  permissions?: {
    canCreateCustomer?: boolean;
    canEditCustomer?: boolean;
    canDeleteCustomer?: boolean;
    canViewReports?: boolean;
    canManageOnboarding?: boolean;
  };
}) => {
  return api("/superadmin/admins", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateAdmin = async (
  adminId: string,
  data: {
    name?: string;
    email?: string;
    status?: string;
    canCreateCustomer?: boolean;
    canEditCustomer?: boolean;
    canDeleteCustomer?: boolean;
    canViewReports?: boolean;
    canManageOnboarding?: boolean;
  }
) => {
  return api(`/superadmin/admins/${adminId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deactivateAdmin = async (adminId: string) => {
  return api(`/superadmin/admins/${adminId}/status`, {
    method: "PATCH",
  });
};

export const updateAdminPermissions = async (
  adminId: string,
  permissions: {
    canCreateCustomer?: boolean;
    canEditCustomer?: boolean;
    canDeleteCustomer?: boolean;
    canViewReports?: boolean;
    canManageOnboarding?: boolean;
  }
) => {
  return api(`/superadmin/admins/${adminId}/permissions`, {
    method: "PATCH",
    body: JSON.stringify(permissions),
  });
};
