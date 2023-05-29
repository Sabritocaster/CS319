import { doc, updateDoc,addDoc } from "firebase/firestore";
import { collection, query, where, getDocs,getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function updateReport(studentID,url,type,file_id="",feedback="",grade=0) {


    const updateCollection = async (url,id) => {
         
              const docReff = doc(db, "Users", id, "Documents",file_id)
              await updateDoc(docReff, {
                feedback: feedback,
                grade:grade,
                updateAt:(new Date()).getTime(),
                feedback_url:url ? url : ""
              });
            
            }
            

        

        updateCollection(url,studentID,type)
        

   


    
    
}
