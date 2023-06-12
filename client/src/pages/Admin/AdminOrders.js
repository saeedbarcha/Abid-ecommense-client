
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";

import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [adminVeriCode, setAdminVeriCode] = useState("");
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (orderId) => {
    try {
      if (adminVeriCode !== "") {
        const productData = new FormData();
        productData.append("adminVeriCode", adminVeriCode);

        const { data } = await axios.put(
          `/api/v1/order/order-status/${orderId}`,
          {
            verifiCodeAdmin: adminVeriCode,
          }
        );
        getOrders();
        if (data?.success) {
          toast.error(data?.message);
        } else {
          toast.success("Verification code submitted successfully");
          handleClose();
        }
      } else {
        toast.error("Verification code must be at least 1 character");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleClickOpen = (orderId) => {
    setOpenOrderId(orderId);
  };

  const handleClose = () => {
    setOpenOrderId(null);
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow" key={o._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Phone</th>
                      <th scope="col">payment Status</th>

                      <th scope="col">Verify by User</th>
                      <th scope="col">Verify by Admin</th>

                      {/* <th scope="col"> */}
                      </tr>
                      </thead>
<tbody>
<tr>
  <td>{i + 1}</td>
  <td>
    <Select
      bordered={false}
      onChange={(value) => handleChange(o._id, value)}
      defaultValue={o?.status}
    >
      {status.map((s, i) => (
        <Option key={i} value={s}>
          {s}
        </Option>
      ))}
    </Select>
  </td>
  <td>{o?.buyer?.name}</td>
  <td>{moment(o?.createAt).fromNow()}</td>
  <td>{o?.products?.length}</td>
  <td>{o?.phone}</td>
  <td>
    {o.payment === "Verified" ? (
      <>
        <FaCheckCircle style={{ color: "green" }} />
      </>
    ) : (
      <>
        {o.payment}{" "}
        <FaTimesCircle style={{ color: "red" }} />
      </>
    )}
  </td>
  <td>
    {o.verifiCodeUser === "Not verified by User" ? (
      <>
        <FaTimesCircle style={{ color: "red" }} />
      </>
    ) : (
      <>
        <FaCheckCircle style={{ color: "green" }} />
      </>
    )}
  </td>
  <td>
    <button
      className="btn btn-primary ms-1"
      onClick={() => handleClickOpen(o._id)}
      style={{ width: "110px", height: "35px" }}
    >
      Verify
    </button>
    <Dialog
      open={openOrderId === o._id}
      onClose={handleClose}
    >
      <DialogTitle>Submit Verification Code</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Submit a verification code and provide this code
          to the user.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          type="number"
          fullWidth
          value={adminVeriCode}
          onChange={(event) =>
            setAdminVeriCode(event.target.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => handleSubmit(o._id)}
          disabled={!adminVeriCode}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  </td>
</tr>
</tbody>
</table>
<div className="container">
{o?.products?.map((p, i) => (
<div
  className="row mb-2 p-3 card flex-row"
  key={p._id}
>
  <div className="col-md-4">
    <img
      src={`/api/v1/product/product-photo/${p._id}`}
      className="card-img-top"
      alt={p.name}
      width="100px"
      height={"100px"}
    />
  </div>
  <div className="col-md-8">
    <p>{p.name}</p>
    <p>{p.description.substring(0, 30)}</p>
    <p>Price: {p.price}$</p>
  </div>
</div>
))}
</div>
</div>
);
})}
</div>
</div>
</Layout>
);
};

export default AdminOrders;
