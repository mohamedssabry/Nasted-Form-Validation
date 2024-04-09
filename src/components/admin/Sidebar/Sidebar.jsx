import React, { useState } from "react";
import menuIcon from "../../../assets/icons/menuIcon.svg";
import ordericon from "../../../assets/icons/ordericon.svg";
import rangeicon from "../../../assets/icons/rangeicon.svg";
import producticon from "../../../assets/icons/producticon.svg";
import locationicon from "../../../assets/icons/locationicon.svg";
import logo from "../../../assets/images/logo.png";
import logo2 from "../../../assets/images/logo2.png";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
  const [activeItem, setActiveItem] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  const handleItemClick = (index) => {
    setActiveItem(index);
    setShowOrders(!showOrders);
  };

  const menuItems = [
    { id: 1, text: "الرئـــيسية", icon: menuIcon },
    {
      id: 2,
      text: "الطــلبــات",
      icon: ordericon,
      orders: [
        { id: 1, name: "الطلب الأول" },
        { id: 2, name: "الطلب الثاني" },
      ],
    },
    { id: 3, text: "إدارة النـــطاق", icon: rangeicon },
    { id: 4, text: "المـــنتجـات", icon: producticon },
    { id: 5, text: "إدارة موقعك", icon: locationicon },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full py-4 pl-4 font-sans text-2xl ${
        isOpen ? "w-1/5 bg-gray-100" : "w-1/12"
      }`}
    >
      <div
        className={`flex place-content-end ${
          isOpen ? " mb-6" : "w-16 ml-6  mb-8"
        }`}
      >
        <img src={isOpen ? logo : logo2} alt="" />
      </div>
      <div className={`text-end ${isOpen ? "mr-10" : "grid"}`}>
        <ul>
          {menuItems.map((item, index) => (
            <div key={item.id} className=" mb-8">
              <li
                key={index}
                className={` sidebar-item flex  items-center justify-end gap-4 p-2 ${
                  isOpen ? "rounded-md" : ""
                } cursor-pointer hover:bg-red-500 text-gray-400 hover:text-white ${
                  activeItem === index ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                {isOpen && <span>{item.text}</span>}

                <img
                  src={item.icon}
                  alt="icon"
                  className={`${isOpen ? "" : "mr-7"}`}
                  style={{
                    filter:
                      activeItem === index ? "brightness(0) invert(1)" : "",
                  }}
                />
              </li>
              {activeItem === index && item.orders && showOrders && (
                <div className="text-base grid place-content-end font-semibold">
                  <div className="flex justify-end mr-7">
                    <span className="border-b-2 border-r-2  border-gray-300 w-4 h-8"></span>
                  </div>
                  {item.orders.map((order) => (
                    <div key={order.id} className="-mt-1">
                      <span className="mr-11 border-r-2 border-gray-300"></span>
                      <span className="flex gap-4 items-center justify-end mr-10">
                        <span key={order.id}>{order.name}</span>
                        <span
                          key={order.id}
                          className="bg-red-500 w-2 h-2 rounded-full"
                        ></span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
