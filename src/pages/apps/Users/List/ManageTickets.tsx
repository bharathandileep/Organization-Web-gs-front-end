import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import Table from "../../../../components/Table";
// import { fetchStaffsApi, Staffs } from "../../../../server/allApi";

/* id column render */
const IdColumn = ({ row }: { row: any }) => {
  return <><b>{row.original.admin_staff_id}</b></>;
};

/* requested by column render */
const RequestedBy = ({ row }: { row: any }) => {
  return (
    <>
      <Link to="/apps/users/profile" className="text-body">
        <img
          src={row.original.image_id}
          alt=""
          title="contact-img"
          className="rounded-circle avatar-xs"
        />
        <span className="ms-2">{`${row.original.kitchen_id} ${row.original.name}`}</span>
      </Link>
    </>
  );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
  return (
    <>
      <span
        className={classNames("badge", {
          "bg-success": row.original.status === "Active",
          "bg-secondary text-light": row.original.status === "Deactive",
        })}
      >
        {row.original.status}
      </span>
    </>
  );
};

/* action column render */
const ActionColumn = () => {
  return (
    <Dropdown className="btn-group" align="end">
      <Dropdown.Toggle variant="light" className="table-action-btn btn-sm">
        <i className="mdi mdi-dots-horizontal"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <i className="mdi mdi-pencil me-2 text-muted font-18 vertical-middle"></i>
          Edit
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="mdi mdi-check-all me-2 text-muted font-18 vertical-middle"></i>
          Activate
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="mdi mdi-delete me-2 text-muted font-18 vertical-middle"></i>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// get all columns
const columns = [
  {
    Header: "ID",
    accessor: "staff_id",
    sort: true,
    Cell: IdColumn,
  },
  {
    Header: "User",
    accessor: "requested_by",
    sort: true,
    Cell: RequestedBy,
  },
  {
    Header: "Role",
    accessor: "role",
    sort: true,
  },
  {
    Header: "Username",
    accessor: "username",
    sort: true,
  },
  {
    Header: "Phone Number",
    accessor: "phone_no",
    sort: true,
  },
  {
    Header: "Company",
    accessor: "company",
    sort: true,
  },
  {
    Header: "Status",
    accessor: "status",
    sort: true,
    Cell: StatusColumn,
  },
  {
    Header: "Created Date",
    accessor: "created_at",
    sort: true,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ActionColumn,
    sort: false,
  },
];

// get page list to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "50",
    value: 50,
  },
];

const ManageTickets: React.FC = () => {
  // const [staffs, setStaffs] = useState<Staffs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchStaffsApi()
  //     .then((data) => {
  //       setStaffs(data);
  //       setLoading(false);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching companies:", error);
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Button 
            className="btn-sm btn-blue waves-effect waves-light float-end"
            // onClick={handleShow}
          >
            <i className="mdi mdi-plus-circle"></i> Add Users
          </Button>
          <h4 className="header-title mb-4">User Details</h4>

          {/* <Table
            columns={columns}
            // data={staffs}
            pageSize={10}
            sizePerPageList={sizePerPageList}
            isSortable={true}
            pagination={true}
            isSearchable={true}
            theadClass="table-light"
            searchBoxClass="mt-2 mb-3"
          /> */}
        </Card.Body>
      </Card>
      {/* Conditionally render the modal */}
      {/* {showAddModal && <AddUsers show={showAddModal} onHide={handleHide} onSubmit={onSubmit}/>} */}
    </>
  );
};

export default ManageTickets;
