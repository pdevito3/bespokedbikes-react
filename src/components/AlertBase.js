import React from 'react';
import { Transition } from '@headlessui/react'

function AlertBase(props){
  return (
    <Transition 
      show={props.isOpen} 
      onClick={() => props.setIsOpen(false)}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
          <div className="rounded-lg shadow-xs overflow-hidden">
            {props.content}
          </div>
        </div>
    </Transition>
  );
}

export default AlertBase;