import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const Paste = () => {

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/pastes/${id}`);
  };


  const pastes = useSelector((state) =>
    state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.
      toLowerCase().includes
      (searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type='Search'
        placeholder='Search here '
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div key={paste._id} className='border'>
                  {/* paste title */}
                  <div>
                    {paste.title}
                  </div>
                  {/* paste content */}
                  <div>
                    {paste.content}
                  </div>
                  {/* button */}
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    {/* dekete */}
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    {/* copy */}
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clipboard")
                    }}>
                      Copy
                    </button>

                    {/* share */}
                    <button onClick={() => {
                      const shareUrl = `${window.location.origin}/paste/${paste?._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("share link copied to clipboard");
                    }}>
                      Share
                    </button>

                    {/* edit */}
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>

                    </button>
                    {/* view */}
                    {/* < button> */}
                    {/* <a href={`/pastes=${paste?._id}`}> 
                         View
                      </a> */}
                    {/* <a href={`/pastes?pastes=${paste?._id}`}>View</a> */}
                    {/* View
                    </button> */}

                    {/* <button>
                  <a href={`/?paste=${paste?._id}`}>
                    View 
                    </a>
                  </button> */}
                    {/* <button onClick={handleView}>
                  <a href={`/?pastes/${paste?._id}`}>
                    View 
                    </a>
                  </button> */}

                    <button onClick={() => handleView(paste._id)}>
                      View
                    </button>

                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
