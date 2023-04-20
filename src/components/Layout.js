import React from 'react'

const Layout = ({ children, className }) => {
	return (
		<div className={`bg-gray-400 min-h-screen  ${className}`} >
			{children}
		</div>
	)
}

export default Layout
