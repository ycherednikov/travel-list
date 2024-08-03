  
import app from "./DatabaseConfig";
import { getDatabase, ref, get } from "firebase/database";

const getData = async () =>{
    const db = getDatabase(app);
    const dbRef = ref( db, 'list' );

    try {
        const snapshot = await get(dbRef);
 
        return snapshot.exists() ? { 
                db:Object.values(snapshot.val()), 
                keys:Object.keys(snapshot.val()) 
            } :{ 
                db:[], 
                keys:[] 
        };
      } catch (error) {
        return error
      }


 
 
     
}
//const getItems = await getData();

export default getData;