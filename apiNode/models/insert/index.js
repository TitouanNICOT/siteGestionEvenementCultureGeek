import user from "./user.js";
import stand from "./stand.js";
import evenement from "./evenement.js";
import boutique from "./boutique.js";
import tournoi from "./tournoi.js";

const insert = async (db) => {
    await user(db)
    await stand(db)
    await evenement(db)
    await boutique(db)
    await tournoi(db)
}
export {insert};