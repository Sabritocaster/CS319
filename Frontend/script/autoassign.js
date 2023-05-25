'use client'
import { useState,useEffect } from "react"
import { doc, updateDoc,arrayUnion } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function autoAssign({studentID}) {

    var data = [];

        const getData = async () => {
          var docs = [];
          const q = query(collection(db, "Users"), where("type", "==", "Teaching Assistant")); 
          const querySnapshot = await getDocs(q); //process: 0 no file uploads, 1 all files uploaded, 2 preevaluated, 3 evaluated, 4 done       
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            docs.push(doc.data())
          });          
          let i = -1;
          while (++i < docs.length) {
            data[i] = docs[i];
          }
          console.log(data)
        }
        getData()
        var temp;
        let min = 31000
        var id
        console.log(data)



        
        
        /*console.log('CU')
        function myFunction(value) {
            console.log("ANIANI AMI")
            //console.log("ASSIGNED REPORT IS "+value?.assigned_reports)
            temp = (value?.assigned_reports).length
            if(temp<min) {
                min=temp
                id = value?.uid
            }
        }
        
        data.forEach(myFunction); */

        /*console.log(data)
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
          }*/

        /*const assignToTA = async (id) => {
            
        
            const refTA = doc(db, "Users", id);
            // Set the "capital" field of the city 'DC'
            await updateDoc(refTA, {
            assigned_reports: arrayUnion(studentID)
            });
    
        }
        assignToTA(id) */
        

   


    
    
}
