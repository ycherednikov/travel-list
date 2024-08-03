import app from "./DatabaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
 
const addItem = async (item, bucket) =>{
  const db = getDatabase(app);
  const newDoc = push(ref(db, bucket));
  set( newDoc, item);
}

export default addItem;