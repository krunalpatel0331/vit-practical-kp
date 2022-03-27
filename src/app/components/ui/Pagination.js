import { generatePageNumber } from "../../helpers/constant";

const Pagination = ({ totalCount, currentPage, recordPerPage,onPageClick }) => {
  return (
    <>
      <h1>Pagination</h1>

      {generatePageNumber(Math.ceil(totalCount / recordPerPage)).map(
        (x, index) => (
          <p key={index} onClick={()=>onPageClick(x.page)}>{x.page} {currentPage == x.page && '*' }</p>
        )
      )}
    </>
  );
};

export default Pagination;

