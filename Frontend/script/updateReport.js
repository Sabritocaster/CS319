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
            

        
         
        /*
        const getData = async () => {
          var docs = [];
          const q = query(collection(db, "Users"), where("type", "==", "Teaching Assistant")); 
          const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            docs.push(doc.data())
          });          
          return docs
        }

        const getStudent = async () => {
            const docRef = doc(db, "Users", studentID);
            const docSnap = await getDoc(docRef);
          return docSnap.data()
        }

        const assignStudent = async () => {
          const docRef = doc(db, "Users", studentID);
          updateDoc(docRef, {
            isAssigned: true
            });
      }

        const data = await getData();
        const student = await getStudent()
        
        
        data.forEach(myFunction);
        */

        updateCollection(url,studentID,type)
        

   


    
    
}
