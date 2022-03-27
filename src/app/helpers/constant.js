

export const regxvalidator={
    password:/^[#\w@_-]{6,20}$/,
    name:/^[a-z\d][A-Z\d]{2,8}$/i,

}

export const generatePageNumber = (value) => {
    let pageNumbers = [];
    for (let i = 1; i <= value; i++) {
      let obj = {
        page: i,
      };
      pageNumbers.push(obj);
    }
    return pageNumbers;
  };
  

  export const  getSortingValue=(sortValue)=>{
        if(sortValue==="asc")
        {
            return 'desc'
        }
        else if(sortValue==="desc")
        {
            return ''
        }
        else{
            return 'asc'
        }
  }
