import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOpenInNew, MdPlayArrow, MdEditNote, MdEdit, MdOutlineDelete} from 'react-icons/md';

const DropdownLinkMenu = () => {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container.current.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  return (
    <div ref={container} className="relative">
      <button
        className="menu absolute right-4 bottom-4 focus:outline-none focus:shadow-solid "
        onClick={() => setShow(!show)}
      >
        <BsThreeDotsVertical/>
      </button>

      {show && (
        <ul className="menu p-4 shadow-lg bg-base-100 origin-top-right absolute right-0 w-50 py-2 mt-1 rounded-box shadow-md">
          <li>
            <a>
              <MdOpenInNew className='inline-block w-5 h-5 mr-2 stroke-current'/>
              Open
            </a>
          </li> 
          <li>
            <a>
              <MdPlayArrow className='inline-block w-5 h-5 mr-2 stroke-current'/>
              Resume
            </a>
          </li> 
          <li>
            <a>
              <MdEditNote className='inline-block w-5 h-5 mr-2 stroke-current'/>
              Edit
            </a>
          </li>
          <li>
            <a>
              <MdOutlineDelete className='inline-block w-5 h-5 mr-2 stroke-current'/>
              Delete
            </a>
          </li>
        </ul>

      // <div className="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-800 rounded shadow-md">
      //   <Link href="/profile">
      //     <a className="block px-4 py-2 hover:bg-green-500 hover:text-green-100">
      //       Profile
      //     </a>
      //   </Link>
      //   <Link href="/api/logout">
      //     <a className="block px-4 py-2 hover:bg-green-500 hover:text-green-100">
      //       Logout
      //     </a>
      //   </Link>
      // </div>
      )}
    </div>
  );
};

export default DropdownLinkMenu;