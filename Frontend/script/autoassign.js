import { doc, updateDoc,arrayUnion } from "firebase/firestore";
import { collection, query, where, getDocs,getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function autoAssign(studentID) {


        var temp;
        let min = 31000
        var id

        

          const assignToTA = async (id,assigned) => {

            if(assigned==false) {
              const refTA = doc(db, "Users", id);
              // Set the "capital" field of the city 'DC'
              updateDoc(refTA, {
              assigned_reports: arrayUnion(studentID)
              });
              assignStudent()

            }
            else {
            }
                
            

        }
          function myFunction(value) {
            //console.log("ASSIGNED REPORT IS "+value?.assigned_reports)
            temp = (value?.assigned_reports).length
            if(temp<min) {
                min=temp
                id = value?.uid
            }
        }

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
            isAssigned: true,
            process:2
            });
      }

        const data = await getData();
        const student = await getStudent()
        
        
        data.forEach(myFunction);

        
        assignToTA(id,student?.isAssigned)
        

   


    
    
}
