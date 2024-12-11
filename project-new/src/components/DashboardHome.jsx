import {
  BadgeDollarSign,
  BadgeInfo,
  SquareArrowOutUpRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { OrderBarchart } from "./ui/OrderBarchart";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function DashboardHome() {
  const url="https://arteora-project-backend.vercel.app";
  const { user, setUser } = useOutletContext();
  const [orders, setOrders] = useState([]);
  console.log("orders", user.orders);

  useEffect(() => {
    axios
      .post(`${url}/get-orders`, { orders: user.orders })
      .then((res) => {
        console.log("Here are order objects", res.data.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log("error fetching order objects", err);
      });
  }, [user.orders]);

  function calculateAmount() {
    let total = 0;
    orders.forEach((order) => (total += order.amount));
    return total;
  }
  function timeDiff(date){
    const orderDate=new Date(date);
    const currentDate=new Date();

    const timeDifference=currentDate-orderDate;

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if(daysDifference >= 1){
      return `${daysDifference} days`
    }

    return `${hoursDifference}hrs`
  }

  return (
    <div className="w-full h-auto flex flex-col lg:flex-row  justify-center items-start gap-8  overflow-y-scroll scrollbar-hide ">
      <div className="w-full flex flex-col justify-center items-start lg:w-[50%] p-5">
        <h2 className="text-white text-4xl font-semibold leading-none tracking-tight">
          Dashboard
        </h2>
        <p className="text-zinc-600 font-semibold text-md mb-5 mt-3">
          Here's your analytic details
        </p>

        <div className=" w-full flex flex-col justify-start items-center lg:w-full">
          <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-4">
            <div className="w-full lg:w-[18rem] h-[12rem] rounded-xl border border-zinc-800">
              <div className="flex w-full h-[3rem] justify-start items-center gap-3 pl-4">
                <BadgeDollarSign color="yellow" size={20} />
                <p className="text-white leading-none font-semibold">
                  Total Sales
                </p>
              </div>
              <h2 className="text-white text-4xl text-center p-3">
                ${calculateAmount()}
              </h2>
              <div className="flex justify-center items-center w-full p-4">
                <hr className="border-zinc-800 border-t-2 w-[70%] align-middle" />
              </div>
              <div className="flex justify-center items-center w-full ">
                <h6 className="text-zinc-600 leading-none text-center font-medium flex justify-start items-center gap-3">
                  <SquareArrowOutUpRight color="green" size={20} />{" "}
                  {new Date().toDateString()}
                </h6>
              </div>
            </div>

            <div className="w-full h-[12rem] lg:w-[18rem] rounded-xl border border-zinc-800">
              <div className="flex w-full h-[3rem] justify-start items-center gap-3 pl-4">
                <BadgeInfo color="yellow" size={20} />
                <p className="text-white leading-none font-semibold">
                  Total Orders
                </p>
              </div>
              <h2 className="text-white text-4xl text-center p-3">
                {orders && orders.length}
              </h2>
              <div className="flex justify-center items-center w-full p-4">
                <hr className="border-zinc-800 border-t-2 w-[70%] align-middle" />
              </div>
              <div className="flex justify-center items-center w-full ">
                <h6 className="text-zinc-600 leading-none text-center font-medium flex justify-start items-center gap-3">
                  <SquareArrowOutUpRight color="green" size={20} />{" "}
                  {new Date().toDateString()}
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center lg:w-full lg:h-[30rem] mt-5">
            <OrderBarchart className="min-w-full" />
          </div>
        </div>
      </div>

      {user.type=='artist' &&
        <div className="flex flex-col h-auto justify-start items-start w-full">
        <div className="w-full p-3">
          <h1 className="text-white text-2xl font-semibold leading-none tracking-tight">Orders</h1>
          <p className="text-md text-zinc-600 font-semibold mb-1 mt-3">Received artwork orders</p>
        </div>
        <div className="lg:w-full w-full h-auto flex flex-col justify-start items-center overflow-hidden">
          <table className="w-full h-auto border border-zinc-800 table-fixed rounded-xl">
            <thead>
              <tr className=" max-w-[20rem] border border-zinc-800 min-h-[3rem] rounded-xl">
                <th className="text-white font-medium leading-none p-3 w-[25%] border border-zinc-800 ">
                  Customer
                </th>
                <th className="text-white font-medium leading-none p-3 w-[25%] border border-zinc-800">
                  Artwork
                </th>
                <th className="text-white font-medium leading-none p-3 w-[25%] border border-zinc-800">
                  Retained
                </th>
                <th className="text-white font-medium leading-none p-3 w-[25%] border border-zinc-800">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order)=>{
                return <tr className="w-full h-[2.5rem]">
                  <td className="w-[25%] text-center text-zinc-400">{order.buyerName}</td>
                  <td className="w-[25%] text-center text-yellow-400">#{order.artworkName}</td>
                  <td className="text-zinc-400 overflow-hidden w-[25%] text-center overflow-ellipsis">{timeDiff(order.date)}</td>
                  <td className="text-zinc-400 font-medium  w-[25%] text-center">{order.amount}$</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        </div>
      }
    </div>
  );
}
