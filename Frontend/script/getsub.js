import { doc, updateDoc,addDoc } from "firebase/firestore";
import { collection, query, where, getDocs,orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function getSub(setUrl,studentID) {
    
    var docs = [];
            //var q;
              const q = query(collection(db, "Users", studentID, "Documents"), orderBy("createdAt"))
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                docs.push(doc.data())
              });
    setUrl(docs) ;

    
}
