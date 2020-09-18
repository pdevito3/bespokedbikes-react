import React from 'react';
import { useQuery, useMutation, useQueryCache, QueryCache, ReactQueryCacheProvider } from 'react-query'

function addSalesPerson(){

}

function GetFormattedDate(date){

}

function getTerminationString(val){

}

function editSalesPerson(){

}

function previousPage(){

}

function nextPage(){
  
}

const fetchSalespersons = async () => {
  const res = await fetch('http://localhost:5000/api/salespersons');
  
  return res.json();
}

function Salespersons(props){
  const { data: salespersons, status} = useQuery('salespersons',fetchSalespersons)
  console.log(salespersons);

  return (
    <>      
      {status === 'loading' && (  
        <div>
          Loading...
        </div>
      )}
      
      {status === 'error' && (  
        <div>
          Error
        </div>
      )}

      {status === 'success' && (  
        <div >       {/* @keydown.escape="closeModal(false)" */}
          <div className="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Salespeople
            </h2>
            <div>
              <span className="shadow-sm rounded-md">
                <button onClick={ addSalesPerson() } type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out">
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
                          <button onClick={ editSalesPerson(salesperson) } className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    {/* <!-- <div className="hidden sm:block">
                      <p className="text-sm leading-5 text-gray-700">
                        Showing
                        <span className="font-medium">1</span>
                        to
                        <span className="font-medium">10</span>
                        of
                        <span className="font-medium">20</span>
                        results
                      </p>
                    </div> --> */}
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <button onClick={ previousPage() } className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        Previous
                      </button>
                      <button onClick={ nextPage() } className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        Next
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* <ModifySalesperson :open="openModifyModal" :formAction="formAction" :salesperson.sync="editable" @closeModal="closeModal" /> */}
        </div>
      )}
    </>
  );
}

export default Salespersons;
