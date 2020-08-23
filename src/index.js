import { form } from "./variables";
import { init, addTransaction } from "./updates";
init();
form.addEventListener("submit", addTransaction);
