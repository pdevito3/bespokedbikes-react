import React, { useState, useRef} from 'react';
import debounce from 'lodash.debounce'
import ListboxPretty from '../components/ListboxPretty'

function Filter(props){


  const [selectedFilterField, setSelectedFilterField] = useState(props.filters[0]);
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const debouncedSave = useRef(debounce(nextValue => props.setFilterQueryString(selectedFilterField.id, nextValue), 500))
    .current;

  function handleFilterValueChange(e) {
    const { value: nextValue } = e.target;
    setSelectedFilterValue(nextValue);
    
		// Even though handleFilterValueChange is created on each render and executed
		// it references the same debouncedSave that was created initially
    debouncedSave(nextValue);
  }

  return (
    <div className="py-4 w-full flex items-center justify-start">
      <ListboxPretty filters={props.filters} selectedFilter={selectedFilterField} setSelectedFilter={setSelectedFilterField} />

      {/* abstract this out into a FilterValueSelector component that can dynamically choose a control based on the data type */}
      <div className="relative rounded-r-md shadow-sm">
        <input
          placeholder={selectedFilterField.placeholder}
          name="firstName"
          onChange={handleFilterValueChange}
          value={selectedFilterValue}
          id="first_name"
          className="-ml-px cursor-default w-full rounded-r-md border border-gray-300 bg-white px-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
      </div>
    </div>
  );
}

export default Filter;