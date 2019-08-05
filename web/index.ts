import axios, { AxiosResponse } from "axios";
(async () => {
  type Hello = { data: string };
  const greeting: AxiosResponse<Hello> = await axios.get("api/hello");
  console.log(greeting.data);
})();
