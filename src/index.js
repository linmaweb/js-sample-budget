import { form } from "./variables";
import { init, addTransaction } from "./transaction";

init();

form.addEventListener("submit", addTransaction);