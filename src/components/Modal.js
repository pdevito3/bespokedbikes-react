import React from 'react';
import { Transition } from '@headlessui/react'
import ReactDOM from 'react-dom'


function Modal(props) {

  return ReactDOM.createPortal(
    <div>
      {
        props.isOpen &&
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition show={props.isOpen} onClick={() => props.setIsOpen(false)}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </Transition>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" ></span>
            <Transition show={props.isOpen} x-description="Modal panel, show/hide based on modal state."
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                {props.content}
            </Transition>
          </div>
        </div>
      }
    </div>
, 
    document.getElementById('modal-root')
  );
}

export default Modal;