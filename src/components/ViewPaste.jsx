import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
   const { id } = useParams();
   const allPastes = useSelector((state) => state.paste.pastes);
   const paste = allPastes.filter((p) => p._id === id)[0];
   console.log("final Paste:", paste);


   return (
      <div>

         <div className='flex flex-row gap-7 place-content-between text white'>
            <input 
            // className='p-1 rounded-2xl mt-2 w-full max-w-xl h-[50px] pl-3'
           className=' p-1 rounded-2xl mt-2 w-full max-w-xl h-[50px] pl-3'
               type='text'
               placeholder='enter title here'
               value={paste.title}
               disabled
               onChange={(e) => setTitle(e.target.value)}
            />
         </div>

         <div className='mt-8'>
            <textarea
               // className='rounded-2xl mt-4 w-full max-w-xl p-4'
               className='rounded-2xl mt-4 w-full max-w-xl p-4 h-[500px]'
               value={paste.content}
               placeholder='enter the content here'
               disabled
               onChange={(e) => setValue(e.target.value)}
               rows={20}
            />

         </div>

      </div>
   )
}

export default ViewPaste
