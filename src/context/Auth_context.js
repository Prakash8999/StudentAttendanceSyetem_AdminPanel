import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase_config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
	const [user, setuser] = useState()
	const [QRstate, setQRstate] = useState("");
	const [data, setdata] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid
				console.log(uid)
				setuser(user)
			} else {
			}
		});
	}, [])

	const handleSignup = async (fromstate) => {
		await createUserWithEmailAndPassword(auth, fromstate.email, fromstate.password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				setDoc(doc(db, "Teachers", user.uid), {
					email: user.email,
					uid: user.uid
				})
				setuser(user)
				console.log(user)
				console.log(user.uid + "" + user.email)
				// ...
			}).then(() => {
				toast.success("Signup Sucessfully!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: false,
					theme: "light",
				});
				navigate("/main")
			}).catch((err) => {
				console.error(err);
				alert(err)
			})
	}
	const handleLogin = async (fromstate) => {
		await signInWithEmailAndPassword(auth, fromstate.email, fromstate.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user)
			})
			.then(() => {
				toast.success("Login Sucessfully!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: false,
					theme: "light",
				});
				navigate("/main");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				console.log(errorCode);
			});
	};
	// const generateqrcode = (fromstate) => {

	// 	let currentDate = new Date();
	// 	let currentDay = currentDate.getDate()
	// 	let month = currentDate.getMonth() + 1
	// 	let year = currentDate.getFullYear()
	// 	let finalDate = `${currentDay}-${month}-${year}`

	// 	let obj = {
	// 		AdminUID: user.uid,
	// 		...fromstate,
	// 		date: finalDate,
	// 		time: currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.setSeconds()
	// 	}
	// 	let QRstatefinal = JSON.stringify(obj)
	// 	setQRstate(QRstatefinal);


	// 	console.log(QRstatefinal)
	// 	setdata(fromstate)

	// };

	return (
		<>
			<ToastContainer />
			<AuthContext.Provider value={{ handleSignup, handleLogin, QRstate, setdata, data, setQRstate, user }}>
				{children}
			</AuthContext.Provider>
		</>
	)
}
const UserAuth = () => {
	return useContext(AuthContext)
}

export { AuthContextProvider, UserAuth } 