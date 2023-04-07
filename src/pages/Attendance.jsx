import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../Firebase_config";

const Attendance = () => {
  useEffect(() => {
    const q = query(collection(db, "Com-3-CN"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const attendance = [];
      querySnapshot.forEach((doc) => {
        attendance.push(doc.data().name);
      });
      console.log("Current attendance in CA: ", attendance.join(", "));
    });
    unsubscribe();
  }, []);

  return <div>hello attendance</div>;
};

export default Attendance;
