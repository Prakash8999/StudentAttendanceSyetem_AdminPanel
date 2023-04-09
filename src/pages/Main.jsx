import React, { useState } from "react";
import Layout from "../components/Layout";
import Select from "../components/Select";
import { option_department, option_year, subjects } from "../components/Data";
import { UserAuth } from "../context/Auth_context";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Attendance from "./Attendance";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase_config";
import { Button } from '@material-ui/core';
import * as XLSX from 'xlsx';
const Main = () => {
  const {  user, setdata } = UserAuth();
  const navigate = useNavigate();
  const initialstate = {
    subname: "",
    department: "",
    year: "",
    date: "",
    starttime: "",
    endtime: "",
  };
  const [formstate, setformstate] = useState(initialstate);
  const [QRstate, setQRstate] = useState("");
  const [attendance, setatt] = useState([])
  const [date, setdate] = useState()
  const handlechange = (e) => {
    setformstate({
      ...formstate,
      [e.target.id]: e.target.value,
    });
  };

  // const attendance = () => {
  //   navigate("/attendance");
  // };
// formstate(setdata)
const generateqrcode = (fromstate) => {

  let currentDate = new Date();
  let currentDay = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  let finalDate = `${currentDay}-${month}-${year}`

  let obj = {
    AdminUID: user.uid,
    ...fromstate,
    date: finalDate,
    time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.setSeconds()
  }
  let QRstatefinal = JSON.stringify(obj)
  setQRstate(QRstatefinal);
  console.log("department is " + `${formstate.department}-${formstate.year}-${formstate.subname}` );
  // const q = query(collection(db, `${formstate.department}-${formstate.year}-${formstate.subname}` ), where(formstate.date , '==' ));
  const q = query(collection(db, `${formstate.department}-${formstate.year}-${formstate.subname}` ));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const temp = [];
			querySnapshot.forEach((document) => {
				temp.push({ ...document.data(), Id: document.id });
				console.log(document.data());
				console.log(document.id);
			});
			setatt(temp)
			console.log(attendance);
		});

  console.log(QRstatefinal)
  // setdata(fromstate)

};



  const handleExport = () => {
    // Convert the data to a worksheet
const filter = attendance.filter((item)=>{
  attendance.includes(item.name)
})
    const worksheet = XLSX.utils.json_to_sheet(attendance);

    // Create a workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, 'my-data.xlsx');
  };


  return (
    <Layout>
      <div className="flex ">
        <div>
          <div className=" w-[60vw] h-[90vh]  flex flex-col items-center justify-center rounded-lg gap-y-5">
            <form action="" className="contents w-[100vw]">
              <Select
                id="department"
                label="Department"
                value={formstate.department}
                options={option_department}
                onChange={handlechange}
              ></Select>
              <Select
                id="year"
                label="Year"
                value={formstate.year}
                options={option_year}
                onChange={handlechange}
              ></Select>
              <Select
                id="subname"
                label="Subject Name:"
                value={formstate.subname}
                options={subjects}
                onChange={handlechange}
              ></Select>
              <Input
                id="date"
                label="Select date"
                value={formstate.date}
                onChange={handlechange}
                type="date"
                className={"w-[30vw]"}
              />
              <Input
                id="starttime"
                label="Select Start Time"
                value={formstate.starttime}
                onChange={handlechange}
                type="time"
                className={"w-[30vw]"}
              />
              <Input
                id="endtime"
                label="Select End Time"
                value={formstate.endtime}
                onChange={handlechange}
                type="time"
                className={"w-[30vw]"}
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => generateqrcode(formstate, user)
                
                  }
                  type="button"
                  className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 mr-20"
                >
                  Generate QR
                </button>

                {/* <button
                  onClick={attendance}
                  type="button"
                  className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 ml-20"
                >
                  Attendance
                </button> */}
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-center items-center pr-12 pb-10">
          <QRCode
            size={350}
            className="vh-[50%] vw-[50%]"
            value={QRstate}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>

      <div></div>
<hr />
    
        {/* <Attendance/>
        
        */}


<p className="w-full h-fit flex justify-center font-bold text-2xl pb-5">Attedance</p>
<div className="flex justify-center">

<div className="flex justify-between w-[70vw] px-72 pb-4">
  
<p className="text-2xl">Serial</p>
<p className="text-2xl">Name</p>
<p className="text-2xl">Roll</p>
</div>
</div>
{
  attendance?.map((value,index)=>{
    return <div key={"index" +index}>
      <div className="w-full flex justify-center pb-10">

<div className="flex justify-between px-72 w-[70vw] ">


<div>
  <p>{index+1}</p>
</div>

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
}
<div className="w-full flex justify-center pb-5">

      <Button variant="contained" color="primary" onClick={handleExport}>
        Export to Excel
      </Button>
</div>


  
    </Layout>
  );
};

export default Main;
