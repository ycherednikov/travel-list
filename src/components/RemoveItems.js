import app from "./DatabaseConfig";
import { getDatabase, ref, remove } from "firebase/database";
 
const removeItems = async (id, bucket, removeAll = false) =>{
    const db = getDatabase(app);
    const dbRef = removeAll ? ref(db, bucket) : ref(db, bucket  + id);
    await remove(dbRef);
 
}
 
export default removeItems;