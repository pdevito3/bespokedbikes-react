import React from 'react';
import Modal from './Modal'

const defaultFormValues = {
  name: '',
  style: '',
}

function ModifyProducts({
  isOpen,
  setIsOpen,
  onSubmit,
  initialValues = defaultFormValues,
  clearOnSubmit,
  createProductInfo,
  editProductInfo,
  action,
  submitText
}) {
  const [values, setValues] = React.useState(initialValues)
  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }

    onSubmit(values);
    setIsOpen(false);
  }

  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <Modal
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    content={
      <>
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Product Information
            </h3>
          </div>

          <form className="mt-6 sm:mt-5" 
            onSubmit={handleSubmit} 
            onKeyDown={(e) => {if(e.key === "Enter") handleSubmit(e)}} 
          >
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label forhtml="name" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setValue('name', e.target.value)}
                    value={values.name}
                    id="name"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <label forhtml="style" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                Style
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <input
                    type="text"
                    name="style"
                    onChange={(e) => setValue('style', e.target.value)}
                    value={values.style}
                    id="style"
                    className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-5 sm:mt-6 space-y-2">
          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={handleSubmit} type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              {submitText}              
            </button>
          </span>

          <span className="flex w-full rounded-md shadow-sm">
            <button onClick={() => setIsOpen(false)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:bg-gray-100 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Cancel
            </button>
          </span>
        </div>
      </>
    } />
  );
}

export default ModifyProducts;