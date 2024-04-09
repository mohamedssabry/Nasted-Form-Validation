import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import HeaderSidebarApp from "../../components/admin/HeaderSidebarApp/HeaderSidebarApp";
import "./AdminLayout.css";
import { SlArrowDown } from "react-icons/sl";
import { isMobile } from "react-device-detect";
import defaultUser from "../../assets/images/default-user.jpg";
import toggleSidebarIcon from "../../assets/icons/toggleSidebarIcon.svg";
import menuIcon from "../../assets/icons/menuIcon.svg";
// import ordericon from "../../assets/icons/ordericon.svg";
// import rangeicon from "../../assets/icons/rangeicon.svg";
// import producticon from "../../assets/icons/producticon.svg";
import locationicon from "../../assets/icons/locationicon.svg";
import fullLogo from "../../assets/images/01.png";
import logo from "../../assets/images/logo2.png";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // const [activeItem, setActiveItem] = useState(1);
  // const [showOrders, setShowOrders] = useState(false);

  // const handleItemClick = (index) => {
  //   setActiveItem(index);
  //   setShowOrders(!showOrders);
  // };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* <HeaderSidebarApp onSidebarToggle={handleSidebarToggle} />
      <div className={`${isSidebarOpen ? "w-4/5" : "w-11/12"}`}>
        <Outlet />
      </div> */}

      <div className="admin-layout-wrapper">
        <div
          className={`admin-layout-menu-wrapper  ${
            isSidebarOpen
              ? "admin-layout-menu-wrapper-open"
              : "admin-layout-menu-wrapper-collapse"
          }`}
        >
          {isMobile && isSidebarOpen && (
            <img
              src={toggleSidebarIcon}
              className="admin-layout-menu-header-toggle"
              onClick={() => handleSidebarToggle()}
              alt=""
            />
          )}

          <div
            className={` ${
              isSidebarOpen
                ? "admin-layout-menu-logo"
                : "admin-layout-menu-logo-collapse"
            }`}
          >
            <img src={isSidebarOpen ? fullLogo : logo} alt="" />
          </div>
          <ul className="admin-layout-menu">
            <li className="admin-layout-menu-item">
              <div
                className={`admin-layout-menu-item-header ${
                  isSidebarOpen
                    ? "admin-layout-menu-item-header-show"
                    : "admin-layout-menu-item-header-collapse"
                }`}
              >
                <img src={menuIcon} alt="" />
                {isSidebarOpen && <span>الرئـــيسية</span>}
              </div>
            </li>
            {/*   <li
              className="admin-layout-menu-item"
              onClick={() => handleItemClick(2)}
            >
              <div
                className={`admin-layout-menu-item-header ${
                  isSidebarOpen
                    ? "admin-layout-menu-item-header-show"
                    : "admin-layout-menu-item-header-collapse"
                }`}
              >
                <img src={ordericon} alt="" />
                {isSidebarOpen && <span>الطــلبــات</span>}
              </div>

              <ol
                className={`${
                  showOrders && activeItem === 2
                    ? "admin-layout-sub-menu admin-layout-sub-menu-show"
                    : "admin-layout-sub-menu admin-layout-sub-menu-hidden"
                }`}
              >
                <li></li>
                <li>الطلب الأول</li>
                <li>الطلب الأول</li>
              </ol>
            </li>
            <li className="admin-layout-menu-item">
              <div
                className={`admin-layout-menu-item-header ${
                  isSidebarOpen
                    ? "admin-layout-menu-item-header-show"
                    : "admin-layout-menu-item-header-collapse"
                }`}
              >
                <img src={rangeicon} alt="" />
                {isSidebarOpen && <span>إدارة النـــطاق</span>}
              </div>
            </li>
            <li className="admin-layout-menu-item">
              <div
                className={`admin-layout-menu-item-header ${
                  isSidebarOpen
                    ? "admin-layout-menu-item-header-show"
                    : "admin-layout-menu-item-header-collapse"
                }`}
              >
                <img src={producticon} alt="" />
                {isSidebarOpen && <span>المـــنتجـات</span>}
              </div>
            </li> */}
            <Link to="temletes/save" className="w-full">
              <li className="admin-layout-menu-item">
                <div
                  className={`admin-layout-menu-item-header ${
                    isSidebarOpen
                      ? "admin-layout-menu-item-header-show"
                      : "admin-layout-menu-item-header-collapse"
                  }`}
                >
                  <img src={locationicon} alt="" />
                  {isSidebarOpen && <span>إدارة موقعك</span>}
                </div>
              </li>
            </Link>
          </ul>
        </div>

        <div
          className={`admin-layout-body-wrapper  ${
            isMobile && isSidebarOpen
              ? "admin-layout-body-wrapper-hide"
              : "admin-layout-body-wrapper-show"
          }`}
        >
          {((isMobile && !isSidebarOpen) || !isMobile) && (
            <>
              <div className="admin-layout-body-header">
                <img
                  src={toggleSidebarIcon}
                  className="admin-layout-body-header-toggle"
                  onClick={() => handleSidebarToggle()}
                  alt=""
                />
                <div className="admin-layout-body-header-user-wrapper">
                  <SlArrowDown
                    size={9}
                    className="admin-layout-body-header-user-arrow"
                  />
                  <span className="">محمد صبرى حافظ</span>
                  <img src={defaultUser} alt="" />
                </div>
              </div>
              <div className="admin-layout-body-content">
                <Outlet />
              </div>
            </>
          )}
        </div>
        {/* <Outlet /> */}
      </div>
    </>
  );
}

export default AdminLayout;
