const apiURL = `http://localhost:5000/api/salespersons`//process.env.REACT_APP_API_URL

let hasNextPage = false;
let hasPreviousPage = false;

async function fetchSalespersons(key, { page = 1 }) {

  const res = await fetch(`${apiURL}?pagenumber=${page}&pagesize=4`);
  let pagination = JSON.parse(res.headers.get("X-Pagination"));

  hasNextPage = pagination.hasNext;
  hasPreviousPage = pagination.hasPrevious;

  return res.json();
}

async function fetchSalesperson(key, salespersonId) {
  if(salespersonId){
    let url = `${apiURL}/${salespersonId}`;
    const res = await fetch(url);
  
    return res.json();
  }
}


export {fetchSalesperson, fetchSalespersons, hasNextPage, hasPreviousPage }
