import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [openOrderId, setOpenOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [userVeriCode, setUserVeriCode] = useState("");

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleSubmit = async (orderId) => {
    try {
      if (userVeriCode !== "") {
        const { data } = await axios.put(
          `/api/v1/order/order-status1/${orderId}`,
          {
            verifiCodeUser: userVeriCode,
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
      toast.error("Verification code is wrong");
    }
  };

  const handleClickOpen = (orderId) => {
    setOpenOrderId(orderId);
  };

  const handleClose = () => {
    setOpenOrderId(null);
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
                        <th scope="col">Payment Status</th>
                        <th scope="col">Verify By Admin</th>
                        <th scope="col">Verify By User</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.products?.length}</td>
                        <td>{o?.phone}</td>
                        <td>
                          {o.payment === "Verified" ? (
                            <FaCheckCircle style={{ color: "green" }} />
                          ) : (
                            <>
                              {o.payment}{" "}
                              <FaTimesCircle style={{ color: "red" }} />
                            </>
                          )}
                        </td>
                        <td>
                          {o.verifiCodeAdmin !== "Not verified by admin" ? (
                            <FaCheckCircle style={{ color: "green" }} />
                          ) : (
                            <FaTimesCircle style={{ color: "red" }} />
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
                                Submit a verification code provided by admin.
                              </DialogContentText>
                              <TextField
                                autoFocus
                                margin="dense"
                                type="number"
                                fullWidth
                                value={userVeriCode}
                                onChange={(event) =>
                                  setUserVeriCode(event.target.value)
                                }
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={() => handleSubmit(o._id)}>
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
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}$</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
