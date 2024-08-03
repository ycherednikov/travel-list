import app from "./DatabaseConfig";
import { getDatabase, ref, update } from "firebase/database";
 
const updateDbItem = async (id, packed) =>{
    const db = getDatabase(app);
    const dbRef = ref(db,  "list/" + id);
    await update(dbRef, {packed:packed}).then(()=> console.log('updated'));
 
}
 
export default updateDbItem;