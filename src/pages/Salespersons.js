import React, { useState, useMemo, useRef } from 'react';
import { useQuery, useMutation } from 'react-query'
import ModifySalespersons from '../components/ModifySalespersons'
import AlertBase from '../components/AlertBase'
import ListboxPretty from '../components/ListboxPretty'
import axios from 'axios';
import { fetchSalesperson, fetchSalespersons, hasNextPage, hasPreviousPage } from '../api/salespersons-api'

function Salespersons(props){
  const [page, setPage] = React.useState(1)
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = React.useState(false)
  const [idToEdit, setIdToEdit] = React.useState(0)
  const [showAlert, setShowAlert] = React.useState(false)
  const [modalType, setModalType] = React.useState(null)

  const { data: salespersons, status: salespersonsStatus, refetch: refetchSalespersons } = useQuery(['salespersons', { page } ], fetchSalespersons);
  const { data: editableSalesperson, status: editableSalespersonStatus } = useQuery(['editableSalesperson', idToEdit], fetchSalesperson);

  const [updateSalesperson] = useMutation(
    salesperson => {
      axios.put(`http://localhost:5000/api/salespersons/${salesperson.salespersonId}`, salesperson)
    },
    {
      onSuccess: () => {
        showModal("edit-success");
        refetchSalespersons(page);
      },
      onError: (e) => {
        showModal("error");
      },
    }
  )

  const [addSalesperson] = useMutation(
    salesperson => {
      axios.post(`http://localhost:5000/api/salespersons`, salesperson)
    },
    {
      onSuccess: () => {
        showModal("add-success");
        refetchSalespersons(page);
      },
      onError: (e) => {
        showModal("error");
      },
    }
  );

  function addSalesPerson(){ 
    setAddModalIsOpen(true);
  }
  
  function editSalesPerson(salespersonId){    
    fetchSalesperson(salespersonId)
    .then((salesperson) => {
      setIdToEdit(salespersonId);
      setEditModalIsOpen(true);
    });    
  }

  function showModal(type){
    setModalType(type);
    setShowAlert(true);
  }

  function handleSubmit(submittedSalesperson) {
    if(submittedSalesperson.salespersonId){
      updateSalesperson(submittedSalesperson);
      setEditModalIsOpen(false);
    }
    else{
      addSalesperson(submittedSalesperson);
      setAddModalIsOpen(false);
    }
  }

  return (
    <>      
      {editableSalespersonStatus === 'success' && (
        <>
          <ModifySalespersons
            isOpen={editModalIsOpen}
            setIsOpen={setEditModalIsOpen}
            salesperson={editableSalesperson}
            onSubmit={handleSubmit}
          />
            
          <ModifySalespersons
            isOpen={addModalIsOpen}
            setIsOpen={setAddModalIsOpen}
            salesperson={{}}
            onSubmit={handleSubmit}
          />
            
          <Alert
            isOpen={showAlert}
            setIsOpen={setShowAlert}
            type={modalType}
          />
        </>
      )}

      {salespersonsStatus === 'loading' && (    
        <div className="fixed inset-0 transition-opacity flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          
          <button type="button" className="z-50 inline-flex items-center px-12 py-8 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl">
              Loading
            </p>
          </button>
        </div>
      )}
      
      {salespersonsStatus === 'error' && (  
        <div>
          Error
        </div>
      )}

      {salespersonsStatus === 'success' && (  
        <div onKeyDown={(event) => {if(event.key === "Escape") { setAddModalIsOpen(false); setEditModalIsOpen(false);}}} tabIndex="0">
          <div className="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Salespeople
            </h2>
            <div>
              <span className="shadow-sm rounded-md">
                <button onClick={ () => addSalesPerson() } type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out">
                  Add new salesperson
                </button>
              </span>
            </div>
          </div>


          <Filter /> 


          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Salesperson
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Tenure
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Manager
                        </th>
                        <th className="px-6 py-3 bg-gray-50"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      
                      { salespersons.map((salesperson, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm leading-5 font-medium text-gray-900">
                                {salesperson.lastName},  {salesperson.firstName}
                              </div>
                              <div className="mt-1 text-sm leading-5 text-gray-500 flex items-center justify-start">
                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <p className="ml-2">
                                  {salesperson.phoneNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          <span className="block text-sm leading-5">{salesperson.address1}</span>
                          <span className="block text-sm leading-5">{salesperson.address2}</span>
                          <span className="block text-sm leading-5">{salesperson.city}, {salesperson.state} {salesperson.postalCode}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          <div className="text-sm leading-5 text-gray-900">{GetFormattedDate(salesperson.startDate)}-{getTerminationString(salesperson.terminationDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {salesperson.manager}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                          <button onClick={ () => editSalesPerson(salesperson.salespersonId) } className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:justify-end">                      
                      <PageButtons page={page} setPage={setPage} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage}></PageButtons>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GetFormattedDate(date){

}

function getTerminationString(val){

}

function PageButtons(props) {
  return ( 
    <>
      { props.hasPreviousPage && (
        <button onClick={ () => props.setPage(props.page - 1) } className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Previous
        </button>
      )}
      { props.hasNextPage && (
        <button onClick={ () => props.setPage(props.page + 1) } className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Next
        </button>
      )}
    </>
   );
}

function Alert(props){
  let title = "";
  let body = "";
  let svg =                   
    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>;

  if(props.type === "add-success"){
    title = "Success!";
    body = "New salesperson successfully added!";
  } 
  else if(props.type === "edit-success"){
    title = "Success!";
    body = "Salesperson successfully edited!";
  } 
  else {
    title = "Oh No!";
    body = "It looks like there was an issue.";
    svg = 
    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  }

  return(
      <AlertBase 
        setIsOpen={props.setIsOpen}      
        isOpen={props.isOpen}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {svg}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {title}
              </p>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                {body}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                {/* Heroicon name: x */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </AlertBase>
  )
}

function Filter(props){
  const filters = useMemo(
    () => [
    { id: "firstName", name: "First Name" },
    { id: "lastName", name: "Last Name" },
  ],
  []);

  const [selectedFilterField, setSelectedFilterField] = useState(filters[0]);
  const [selectedFilterValue, setSelectedFilterValue] = useState(null);
  const inputRef = useRef();

  function handleChange(e) {
    const value = e.target.value;

    setSelectedFilterValue(value);
  }


  return (
    <div className="py-4 w-full flex items-center justify-start">
        <ListboxPretty filters={filters} selectedFilter={selectedFilterField} setSelectedFilter={setSelectedFilterField} />

      <div className="relative rounded-r-md shadow-sm">
        <input
          placeholder="tbd"
          name="firstName"
          onChange={handleChange}
          value={selectedFilterValue}
          id="first_name"
          className="-ml-px cursor-default w-full rounded-r-md border border-gray-300 bg-white px-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" />
      </div>
    </div>
  );
}

export default Salespersons;
