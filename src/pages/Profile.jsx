import React from 'react'
import { UserAuth } from '../context/Auth_context'
import Layout from '../components/Layout'



const Profile = () => {

	const {user}= UserAuth()
  return (
	<Layout>

		{/* <div>{user.email}</div> */}
	</Layout>
  )
}

export default Profile