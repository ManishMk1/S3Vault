import React from 'react'

function Input({...props}) {
    return (
        <input
            {...props}
            className="bg-black border border-gray-900  p-2 text-white focus:outline-none focus:border-blue-500 rounded-md"
        />
    )
}

export default Input