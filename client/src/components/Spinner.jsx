import React from 'react'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 m-8 border-gray-300 rounded-full bg-amber-50 animate-ping"></div>
        </div>
    )
}
export default Spinner