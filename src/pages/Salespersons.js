import React from 'react';
import { useQuery, useMutation } from 'react-query'
import ModifySalespersons from '../components/ModifySalespersons'
import axios from 'axios';

function Salespersons(props){
  const [page, setPage] = React.useState(1)
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const [hasPreviousPage, setHasPreviousPage] = React.useState(false)
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false)
  const [addModalIsOpen, setAddModalIsOpen] = React.useState(false)
  const [idToEdit, setIdToEdit] = React.useState(0)

  // api calls to abstract out
  const fetchSalespersons = async (key, { page = 1 }) => {
    const res = await fetch(`http://localhost:5000/api/salespersons?pagenumber=${page}&pagesize=4`);
    let pagination = JSON.parse(res.headers.get("X-Pagination"));

    setHasNextPage(pagination.hasNext);
    setHasPreviousPage(pagination.hasPrevious);

    return res.json();
  }

  const fetchSalesperson = async (key, salespersonId) => {
    const res = await fetch(`http://localhost:5000/api/salespersons/${salespersonId}`);

    return res.json();
  }

  const { data: salespersons, status: salespersonsStatus, refetch: refetchSalespersons } = useQuery(['salespersons', { page } ], fetchSalespersons)
  const { data: editableSalesperson, status: editableSalespersonStatus } = useQuery(['editableSalesperson', idToEdit], fetchSalesperson)    

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

  const [updateSalesperson] = useMutation(
    salesperson => {
      axios.put(`http://localhost:5000/api/salespersons/${salesperson.salespersonId}`, salesperson)
    },
    {
      onSuccess: () => {
        refetchSalespersons(page);
      },
    }
  )

  const [addSalesperson] = useMutation(
    salesperson => {
      axios.post(`http://localhost:5000/api/salespersons`, salesperson)
    },
    {
      onSuccess: () => {
        refetchSalespersons(page);
      },
    }
  );

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
                      <tr>
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

export default Salespersons;
