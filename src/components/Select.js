import React from 'react'

const Select = ({ id, label, value, options, onChange }) => {
	return (
		<>
			<div className='flex flex-col w-[50%] '>
				<label htmlFor="" className='font-bold mb-1'>{label}:</label>
				<select onChange={onChange} name={id} id={id} value={value} className='rounded-lg border-2 border-gray-900 p-1   focus:outline-blue-800 focus:text-black'>
					{
						options?.map((option, index) => {
							return <option value={option.value} key={index}>{option.label}</option>
						})
					}
				</select>

			</div>
		</>
	)
}


export default Select
