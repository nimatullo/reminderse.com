import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOpenInNew, MdPlayArrow, MdEditNote, MdEdit, MdOutlineDelete } from 'react-icons/md';

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
    <div ref={container} className="dropdownMenu">
      <button
        className="p-3 right-5 bottom-5 focus:outline-none focus:shadow-solid hover:bg-secondary-content"
        onClick={() => setShow(!show)}
      >
        <BsThreeDotsVertical />
      </button>

      {show && (
        <ul className="menu">
          <li>
            <a>
              <MdOpenInNew className='inline-block w-5 h-5 mr-2 stroke-current' />
              Open
            </a>
          </li>
          <li>
            <a>
              <MdPlayArrow className='inline-block w-5 h-5 mr-2 stroke-current' />
              Resume
            </a>
          </li>
          <li>
            <a>
              <MdEditNote className='inline-block w-5 h-5 mr-2 stroke-current' />
              Edit
            </a>
          </li>
          <li>
            <a>
              <MdOutlineDelete className='inline-block w-5 h-5 mr-2 stroke-current' />
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownLinkMenu;