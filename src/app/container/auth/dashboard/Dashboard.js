import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/ui/Pagination";
import TextField from "../../../components/ui/TextField";
import { getSortingValue } from "../../../helpers/constant";
// Dummy student data
import studentData from "./StudentData";

const Dashboard = () => {
  const navigate = useNavigate();
  // Search
  const [search, setSearch] = useState("");

  // Pagination Data
  const [totalCount, setTotalCount] = useState(studentData.length || 0);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  //   Records
  const [fullRecord, setFullRecords] = useState(studentData);
  const [record, setRecords] = useState(studentData.slice(0, recordPerPage));
  // Sorting Data
  const [sortBy, setSortBy] = useState("");
  const [sortType, setsortType] = useState("");

  //   Will run on every search text when added by users
  useEffect(() => {
    getSearchResult(search);
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const getSearchResult = (searchvalue) => {
    let tempfullRecord = [...studentData];
    if (searchvalue) {
      tempfullRecord = studentData.filter(
        (x) => x.name.includes(searchvalue) || x.email.includes(searchvalue)
      );
      setFullRecords(tempfullRecord);
      setTotalCount(tempfullRecord.length);
      setRecords(tempfullRecord.slice(0, recordPerPage));
      setCurrentPage(1);
    } else {
      setFullRecords(studentData);
      setRecords(studentData.slice(0, recordPerPage));
      setTotalCount(studentData.length);
      setCurrentPage(1);
    }
  };

  //   Filter record as per sorting type and field name
  const filterRecord = (sBy, sType) => {
    if (sType === "asc") {
      let temFullRecord = [...fullRecord];
      temFullRecord.sort((first, second) => {
        if (first[sBy] < second[sBy]) {
          return -1;
        }
        if (first[sBy] > second[sBy]) {
          return 1;
        }
        return 0;
      });
      setFullRecords(temFullRecord);
      setRecords(temFullRecord.slice(0, recordPerPage));
    } else if (sType === "desc") {
      let temFullRecord = [...fullRecord];
      temFullRecord.sort((first, second) => {
        if (first[sBy] > second[sBy]) {
          return -1;
        }
        if (first[sBy] < second[sBy]) {
          return 1;
        }
        return 0;
      });
      setFullRecords(temFullRecord);
      setRecords(temFullRecord.slice(0, recordPerPage));
    } else {
      setFullRecords(studentData);
      setRecords(studentData.slice(0, recordPerPage));
    }
  };

  useMemo(() => {
    filterRecord(sortBy, sortType);
  }, [sortBy, sortType]);

  // When clicking on page number it will filter the data acc.
  const handlePageClick = (page) => {
    let pageWiseData = fullRecord.slice(
      (page - 1) * recordPerPage,
      page * recordPerPage
    );
    setRecords(pageWiseData);
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>Dashbard</h1>

      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("VIITCUR");
          navigate("/");
        }}
      >
        Logout
      </button>

      <h2>Student Data</h2>

      <TextField
        label="Search"
        name="search"
        value={search}
        onChange={handleSearch}
      />

      <br />

      <strong>
        {" "}
        **Note: Please click on tabel header name to sort on name and email
      </strong>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Id {sortBy === "id" && sortType}</th>
            <th
              onClick={() => {
                setSortBy("name");
                setsortType(getSortingValue(sortType));
              }}
            >
              Name {sortBy === "name" && sortType}
            </th>
            <th
              onClick={() => {
                setSortBy("email");
                setsortType(getSortingValue(sortType));
              }}
            >
              Email {sortBy === "email" && sortType}
            </th>
          </tr>
        </thead>

        <tbody>
          {record.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!record.length && <h1>No record found</h1>}

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        recordPerPage={recordPerPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default Dashboard;
