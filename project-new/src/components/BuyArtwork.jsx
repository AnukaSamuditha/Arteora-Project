import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dotSpinner } from "ldrs";
import { useCookies } from "react-cookie";
import emptyProfile from "../Images/empty-profile.png";

export default function BuyArtwork() {
  const url=import.meta.env.VITE_BACKENDURL;
  const [artwork, setArtwork] = useState(null);
  const [order, setOrder] = useState({
    artworkId: "",
    amount: 0,
    buyer: "",
    seller:'',
    date:'',
    artworkName:'',
    buyerName:''
  });
  const [cookies, setCookie, removeCookie] = useCookies(["loggedUser"]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { artworkId } = useParams();
  dotSpinner.register();

  useEffect(() => {
    axios.get(`${url}/get-artwork/${artworkId}`)
      .then((res) => {
        //console.log('artwork fetched',res.data.data)
        setArtwork(res.data.data);
      })
      .catch((err) => {
        console.log("error fetching the artwork to buy", err);
      });
  }, [artworkId]);

  useEffect(() => {
    if (artwork) {
      setOrder({
        artworkId: artwork._id,
        amount: artwork.price,
        buyer: cookies.loggedUser,
        seller:artwork.author,
        date: new Date().toISOString(),
        buyerName:user.username,
        artworkName:artwork.name
      });
    }
    console.log('Artwork Id',artworkId)
  }, [artwork]);

  useEffect(() => {
    axios
      .get(`${url}/get-user/${cookies.loggedUser}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("error fetchign user for buying the artwork", err);
      });
  }, [cookies.loggedUser]);

  function HandleChange(event) {

  }
  
  function handleSubmit(event) {

    event.preventDefault();

    console.log('date',order.date);

    axios.post(`${url}/buy-artwork`,order)
    .then((res)=>{
        console.log('order made successfully',res.data.order);
    })
    .catch((err)=>{
        console.log('error making the order',err);
    })
  }

  if (!artwork) {
    console.log('art',artwork);

    return (
      <div className="w-full h-screen flex justify-center items-center">
        <l-dot-spinner size="40" speed="0.9" color="white"></l-dot-spinner>
      </div>
    );
  }

  return (
    <div className="w-full h-auto flex flex-col justify-start p-5 items-center">
      <div className="h-[3rem] flex justify-start items-center w-full cursor-pointer" onClick={() => navigate(-1)}>
        <ArrowLeft
          color="white"
          size={20}
        />
      </div>
      <h1 className="text-2xl font-semibold text-white leading-none">
        Buy {artwork && artwork.name}
      </h1>
      <div className="w-full h-auto p-5 flex justify-center items-center">
        <form
          className="border border-zinc-800 rounded-[8px] w-full h-auto p-5 lg:w-[30%] lg:mt-16"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h5 className="text-white text-2xl font-medium text-left mb-1">
            Make the Payment
          </h5>
          <h5 className="text-zinc-400  text-sm mb-5">
            Enter your payment details here!
          </h5>

          <label htmlFor="email" className="text-sm font-medium text-white p-1">
            User
          </label>
          <br />
          <div className="lg:h-[3rem] h-[4rem] flex justify-start items-center w-full p-2 border border-zinc-800 rounded-xl gap-3 mb-3">
            <div className="lg:w-[2.5rem] lg:h-[2.5rem] w-[3rem] h-[3rem] rounded-full">
              <img
                src={
                  artwork && artwork.imageUrls
                    ? `${url}/uploads/${artwork.imageUrls[0]}`
                    : emptyProfile
                }
                alt={artwork && artwork.name}
                className="w-full h-full rounded-full border-[2px] border-yellow-300"
              />
            </div>
            <div className="flex flex-col justify-center h-full gap-1">
              <small className="text-white font-medium leading-none text-lg lg:text-md">
                {artwork && artwork.name}
              </small>
              <small className="text-zinc-400 font-medium leading-none text-md">
                {artwork && artwork.category}
              </small>
            </div>
          </div>

          <label
            htmlFor="amount"
            className="text-sm font-medium text-white p-1"
          >
            Amount
          </label>
          <br />
          <input
            type="text"
            autoComplete="off"
            name="amount"
            value={order.amount}
            className="mb-5 lg:mb-3  border relative border-zinc-800 w-full rounded-[8px] h-[3rem] focus:outline-none bg-black peer-placeholder-:mb-3  text-zinc-300 text-sm p-4 placeholder-zinc-400"
            readOnly
          />

          <label
            htmlFor="cardNumber"
            className="text-sm font-medium text-white p-1"
          >
            Card Number
          </label>
          <br />
          <input
            type="text"
            autoComplete="off"
            name="cardNumber"
            id="cardNumber"
            className="mb-5 lg:mb-3  border relative border-zinc-800 w-full rounded-[8px] h-[3rem]  focus:outline-none bg-black peer-placeholder-:mb-3  text-zinc-300 text-sm p-4 placeholder-zinc-500"
            placeholder="xxx xxx xxx xxx"
          />

          <label
            htmlFor="cardType"
            className="text-sm font-medium text-white p-1"
          >
            Card Type
          </label>
          <br />
          <input
            type="text"
            autoComplete="off"
            name="cardType"
            id="cardType"
            className="mb-5 lg:mb-3  border relative border-zinc-800 w-full rounded-[8px] h-[3rem] focus:outline-none bg-black peer-placeholder-:mb-3  text-zinc-300 text-sm p-4 placeholder-zinc-500"
            placeholder="visa/master"
          />

          <div className="w-full flex justify-start items-center gap-3">
            <div className="w-1/2">
              <label
                htmlFor="expiryDate"
                className="text-sm font-medium text-white p-1"
              >
                Expiry Date
              </label>
              <br />
              <input
                type="text"
                autoComplete="off"
                name="expiryDate"
                id="expiryDate"
                className="mb-5 lg:mb-3  border relative border-zinc-800 w-full rounded-[8px] h-[3rem] focus:outline-none bg-black peer-placeholder-:mb-3  text-zinc-300 text-sm p-4 placeholder-zinc-500"
                placeholder="2/12"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="cvc"
                className="text-sm font-medium text-white p-1"
              >
                CVC
              </label>
              <br />
              <input
                type="text"
                autoComplete="off"
                name="cvc"
                id="cvc"
                className="mb-5 lg:mb-3  border relative border-zinc-800 w-full rounded-[8px] h-[3rem] focus:outline-none bg-black peer-placeholder-:mb-3  text-zinc-300 text-sm p-4 placeholder-zinc-500"
                placeholder="xxx"
              />
            </div>
          </div>

          <button
            className="w-full bg-[#0071e3] text-white text-sm font-semibold rounded-[8px] h-[3rem] lg:h-[2.5rem] mt-5 mb-5"
          >
            Pay now
          </button>
        </form>
      </div>
    </div>
  );
}
