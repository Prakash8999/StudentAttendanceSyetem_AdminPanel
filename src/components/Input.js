import React from 'react'

const input = ({ label, type, placeholder, value, onChange, id, className }) => {
	return (
		<div className='flex flex-col '>

			<label className=' font-bold'>{label}
			</label>
			<input type={type} placeholder={placeholder} id={id} onChange={onChange} value={value} className={`rounded-lg border-2 border-gray-900 p-1   focus:outline-blue-800 focus:text-black  autoComplete="on" ${className}`} />
		</div>
	)
}

export default input
