import axios, { AxiosResponse } from "axios";
const getAuth = async () => {
  const auth = await axios.get("api/auth");
  const tab = window.open(auth.data, "_blank")!;
  tab.focus();
};
const getDaLoot = async () => {
  const response = await axios.get("api/loot");
  console.log(response);
};

const authButton = document.getElementById("auth")!;
authButton.innerText = "authenticate";
authButton.addEventListener("click", getAuth);

const lootButton = document.getElementById("loot")!;
lootButton.innerText = "gimme da loot";
lootButton.addEventListener("click", getDaLoot);
