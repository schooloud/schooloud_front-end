import Cookies from "universal-cookie";

export default async function removeCookies() {
  const cookies = new Cookies();
  for (let key in cookies.getAll()) {
    cookies.remove(key, { path: "/", domain: ".schooloud.cloud" });
  }
  await cookies.getAll();
}
