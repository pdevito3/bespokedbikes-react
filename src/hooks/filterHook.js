import React from 'react';

const equalityEnum = {
  equal: 1,
  contains: 2,
}

function removeFromListByProperty(nameKey, prop, myArray){
  for (var i=0; i < myArray.length; i++) {
    if (myArray[i][prop] === nameKey)
      myArray.splice(i,1);
  }
  return myArray
}

function useFilter(setPage){
  const [requestFilterParam, setRequestFilterParam] = React.useState("");
  const [filterQueryList, setFilterQueryList] = React.useState([]);

  function updateFilterQuery({key, equality, value, propertyName}){ 
    let newList = removeFromListByProperty(key, 'key', Object.assign(filterQueryList));
    newList.push({key, operation: {equality, value, propertyName}});

    setFilterQueryList(newList)
    buildQueryString(newList)
    setPage(1)
  }

  function buildQueryString(list){
    let calculatedString = "";
    for(var filter=0; filter < list.length; filter++ ){
      if(list[filter].operation.value.length > 0)
        calculatedString += `${calculatedString.length === 0 ? "filters=" : ""}${filter > 0 ? "," : ""}${list[filter].operation.propertyName}${list[filter].operation.equality === equalityEnum.contains ? "@=*" : "==*"}${list[filter].operation.value}`
    }
    setRequestFilterParam(calculatedString)
  }

  return { requestFilterParam, updateFilterQuery }
}

export { useFilter }