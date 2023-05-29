import { doc, updateDoc,addDoc, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs,getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function addReport(studentID,url) {

          //const newID = (new Date()).getTime()

          const addCollectionn = async (id,url) => {
              const docRef = doc(collection(db, "Users", `${id}`, "Documents"))

              await setDoc(docRef, {
                report: url,
                feedback:"",
                grade:0,
                createdAt:(new Date()).getTime(),
                feedback_url:"",
                uid:docRef.id
              });                
            
            

        }
         
        
        addCollectionn(studentID,url)
        

   


    
    
}
