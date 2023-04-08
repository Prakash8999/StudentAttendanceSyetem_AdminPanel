
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase_config";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";

const Attendance = () => {

  const [attendance, setatt] = useState([])
  const {data} = UserAuth()
  // useEffect(() => {
  //   const q = query(collection(db, "Com-3-CN"));
  //   const temp = [];
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       temp.push({...doc.data(), });

  //       console.log("Current attendance in CA: ", temp.join(", "));
  //       console.log("ehllo");
  //     });
  
  //     setatt(temp)
  //     console.log(attendance);
  //   });
  //   unsubscribe();
//   // }, []);
// console.log("department is " + `${data.department}-${data.year}-${data.subname}` );
// 	useEffect(() => {
// 		// const q = query(collection(db, "Com-3-CN"));
// 		const q = query(collection(db, `${data.department}-${data.year}-${data.subname}` ));
// 		const unsubscribe = onSnapshot(q, (querySnapshot) => {
// 			const temp = [];
// 			querySnapshot.forEach((document) => {
// 				temp.push({ ...document.data(), Id: document.id });
// 				console.log(document.data());
// 				console.log(document.id);
// 			});
// 			setatt(temp)
// 			console.log(attendance);
// 		});
// unsubscribe()
// 	}, [])

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return (
<>
{/* <p className="w-full h-fit flex justify-center font-bold text-2xl">Attedance</p>
<div className="flex justify-center">

<div className="flex justify-between w-[70vw] px-96 pb-4">
<p className="text-2xl">Name</p>
<p className="text-2xl">Roll</p>
</div>
</div>
{
  attendance?.map((value,index)=>{
    return <div key={"index" +index}>
      <div className="w-full flex justify-center">

<div className="flex justify-between px-96 w-[70vw] ">

<div>
  <p>{value?.name}</p>
</div>
<div>
<p>{value?.rollno}</p>
</div>
      </div>

      </div>
  </div>
  })
} */}


  </>

  )
}

export default Attendance