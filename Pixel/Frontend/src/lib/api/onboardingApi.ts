import { api } from "./client";

export const saveOnboarding = async (data: any) => {
  return api("/onboarding/save", {
    method: "POST",
    body: JSON.stringify(data),
  });
};