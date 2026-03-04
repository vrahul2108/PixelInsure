export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  SUPER_ADMIN: "/superadmin/dashboard",
  ADMIN: "/admin/dashboard",
  CUSTOMER: "/dashboard",
};

export const ROLE_LOGIN_PAGES: Record<UserRole, string> = {
  SUPER_ADMIN: "/superadmin/login",
  ADMIN: "/admin/login",
  CUSTOMER: "/",
};

export function getDashboardPath(role: string | null): string {
  if (role && role in ROLE_DASHBOARDS) {
    return ROLE_DASHBOARDS[role as UserRole];
  }
  return "/";
}

export function getLoginPath(role: string | null): string {
  if (role && role in ROLE_LOGIN_PAGES) {
    return ROLE_LOGIN_PAGES[role as UserRole];
  }
  return "/";
}
