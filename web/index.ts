import axios, { AxiosResponse } from "axios";
const getRes = async () => {
  const auth = await axios.get("api/auth");
  console.log(auth);
};
const button = document.createElement("button");
button.innerText = "click me";
button.addEventListener("click", getRes);
document.body.appendChild(button);
