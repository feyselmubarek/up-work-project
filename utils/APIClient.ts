import axios from "axios";

const WS_ROOT: string = process.env.WS_ROOT || "https://ws.agoraspeakers.org";

export const MEMBER_URL: string = "https://my.agoraspeakers.org/members/";

export const INFO_MAIL: string = "info@agoraspeakers.org";

export const CHANGE_PASSWORD_URL: string =
  process.env.NEXT_PUBLIC_CHANGE_PASSWORD_URL || "";

export const CHANGE_ACCOUNT_INFO_URL: string =
  process.env.NEXT_PUBLIC_CHANGE_ACCOUNT_INFO_URL || "";

export async function getUserDetail(
  username: string,
  locale: string
): Promise<any> {
  return await axios.get(
    `${WS_ROOT}/member/${username}/details?lang=${locale}`
  );
}

export async function editUserDetail(
  data: FormData,
  username: string,
  locale: string
): Promise<any> {
  return await axios.post(`${WS_ROOT}/member/${username}?lang=${locale}`, data);
}
