import React from 'react'

function Paging({ setBackward,setForward,pageno}) {
  return (
    <div className='mt-8  p-4  flex justify-center bg-gray-400 '>
         <div onClick={setBackward} className='mx-8 p-2'><i className="fa-solid fa-arrow-left"></i>
         </div>
    <div  className='p-2'>{pageno}</div>
    <div  onClick={setForward}className='mx-9 p-2 '><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Paging