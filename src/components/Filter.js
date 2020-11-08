import React from 'react';

const equalityEnum = {
  equal: 1,
  contains: 2,
}

function Filter({
  propertyName = "",
  placeholder="",
  updateFilterQuery
})
  {
  const [equality, setEquality] = React.useState(equalityEnum.equal)
  const [thisFilterValue, setThisFilterValue] = React.useState("")

    // const debouncedSave = React.useRef(debounce(nextValue => props.setFilterQueryString(selectedFilterField.id, nextValue), 500))
    //   .current;
  
    // function handleFilterValueChange(e) {
    //   const { value: nextValue } = e.target;
    //   setSelectedFilterValue(nextValue);
      
    //   // Even though handleFilterValueChange is created on each render and executed
    //   // it references the same debouncedSave that was created initially
    //   debouncedSave(nextValue);
    // }
  
  function submitFilter(){
    updateFilterQuery({key: propertyName, value: thisFilterValue, equality, propertyName});
  }

  return (
    <div>
      <label htmlFor={propertyName} className="sr-only">{propertyName}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <div>
            <button onClick={(() => setEquality(equality + 1 > Object.keys(equalityEnum).length ? 1 : equality + 1) )} className="flex items-center justify-center p-1 focus:outline-none focus-visible:bg-red-500">
              {equality === equalityEnum.equal && 
                <svg className="h-4 w-4 text-indigo-600 hover:text-indigo-500" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="equals" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M376 304H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8zm0-144H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path>
                </svg>
              }
              {equality === equalityEnum.contains && 
                <svg className="h-4 w-4 text-indigo-600 hover:text-indigo-500" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="equals" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M317.66 132.28c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L296.5 153.44l21.16-21.16zM64 224c16.38 0 32.76-6.25 45.25-18.74 24.99-24.99 24.99-65.52 0-90.51C96.76 102.25 80.38 96 64 96s-32.76 6.25-45.26 18.75c-24.99 24.99-24.99 65.52 0 90.51C31.24 217.75 47.62 224 64 224zm-22.62-86.63C47.42 131.33 55.45 128 64 128s16.58 3.33 22.63 9.37c12.48 12.48 12.47 32.78 0 45.25C80.59 188.67 72.55 192 64 192c-8.55 0-16.58-3.33-22.62-9.37-12.48-12.48-12.48-32.78 0-45.26zM256 288c-16.38 0-32.76 6.25-45.26 18.75-24.99 24.99-24.99 65.52 0 90.51C223.24 409.75 239.62 416 256 416s32.76-6.25 45.25-18.74c24.99-24.99 24.99-65.52 0-90.51C288.76 294.25 272.38 288 256 288zm22.63 86.63c-6.04 6.04-14.08 9.37-22.63 9.37-8.55 0-16.58-3.33-22.62-9.37-12.48-12.48-12.48-32.78 0-45.26 6.04-6.04 14.08-9.37 22.62-9.37 8.55 0 16.58 3.33 22.63 9.37 12.48 12.48 12.47 32.78 0 45.26z"></path>
                </svg>
              }
            </button>
          </div>
        </div>
        <input
          placeholder={placeholder}
          name={propertyName}
          onChange={(e) => setThisFilterValue(e.target.value)}
          onKeyDown={(e) => {if(e.key === "Enter") submitFilter()}} 
          id={propertyName}
          className="-ml-px cursor-default w-full rounded-md border border-gray-300 bg-white px-11 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" 
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div>
            <button onClick={() => submitFilter()} className="flex items-center justify-center p-1 focus:outline-none focus-visible:border">
              <svg  className="h-5 w-5 text-indigo-600 hover:text-indigo-500"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;