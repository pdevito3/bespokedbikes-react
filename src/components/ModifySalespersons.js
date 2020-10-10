import React, { useRef  } from 'react';
import Modal from '../components/Modal'

function ModifySalespersons(props) {
  const [state, setState] = React.useState({ ...props.salesperson });
  const inputRef = useRef();

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setState(prev => ({
      ...prev,
      [key]: value
    }));
  }

  function submit() {
    props.onSubmit(state);
  }

  // focus input on enter -- will go back to first name on tab between controls
  // useEffect(() => {
  //   try{
  //     inputRef.current.focus();
  //   }
  //   catch(e){}
  // })

  return (
    <Modal
    isOpen={props.isOpen}
    setIsOpen={props.setIsOpen}
    content={
      <>
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Salesperson Information
            </h3>
          </div>

          <form className="mt-6 sm:mt-5" onKeyDown={(event) => {if(event.key === "Enter") { submit(); }}}>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label forhtml="first_name" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                First name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    ref={inputRef}
                    name="firstName"
                    onChange={handleChange}
                    value={state.firstName}
                    id="first_name"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label forhtml="last_name" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Last name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="lastName"
                    onChange={handleChange}
                    value={state.lastName}
                    id="last_name"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label forhtml="address1" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Address
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="address1"
                    onChange={handleChange}
                    value={state.address1}
                    id="address1"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <div className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                <label forhtml="address2" className="sr-only">
                  Address2
                </label>
              </div>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="address2"
                    onChange={handleChange}
                    value={state.address2}
                    id="address2"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label forhtml="city" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                City
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="city"
                    onChange={handleChange}
                    value={state.city}
                    id="city"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label forhtml="state" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                State
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="state"
                    onChange={handleChange}
                    value={state.state}
                    id="state"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label forhtml="zip" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                ZIP / Postal
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input 
                    name="postalCode"
                    onChange={handleChange}
                    value={state.postalCode}
                    id="zip"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-5 sm:mt-6 space-y-2">
          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={submit} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Submit
            </button>
          </span>

          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={() => props.setIsOpen(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>
      </>
    } />
  );
}

export default ModifySalespersons;