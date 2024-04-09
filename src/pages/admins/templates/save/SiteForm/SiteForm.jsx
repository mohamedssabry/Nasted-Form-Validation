import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../Style/pagesStyle.css";
import { MdOutlineErrorOutline } from "react-icons/md";
import magic from "../../../../../assets/icons/magic.svg";
import fileLines from "../../../../../assets/icons/file-lines.svg";
import TempletePages from "../TempletePages/TempletePages";
import Layouts from "../Layouts/Layouts";
import { useCreateAdminMutation } from "../../../../../features/adminSlice";

const SiteFormSchema = Yup.object().shape({
  cmsName: Yup.string().required("يجب ادخال اسم الموقع"),
  imageFile: Yup.string().required("يجب رقع صوره الموقع"),
  sourcePath: Yup.string().required("يجب رفع مسار الموقع"),
  cmsDescription: Yup.string().required("يجب رفع وصف الموقع"),
  price: Yup.string().required("يجب رفع سعر الموقع"),
});

const SiteForm = () => {
  const [activeTab, setActiveTab] = useState("pages");
  const [imageName, setImageName] = useState("");

  const [adminSubmition] = useCreateAdminMutation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (values) => {
    const payload = new FormData();
    payload.append("cmsName", values.cmsName);
    payload.append("cmsDescription", values.cmsDescription);
    payload.append("imageFile", values.imageFile);
    payload.append("sourcePath", values.sourcePath);
    payload.append("price", values.price);
    await adminSubmition(payload);
  };

  const initialValues = {
    encryptedTemplateId: "",
    cmsName: "",
    cmsDescription: "",
    imageFile: "",
    imagePath: "",
    sourcePath: "",
    isDeleted: false,
    price: "",
  };

  return (
    <>
      <div className=" mx-auto mt-10 w-full ">
        <div className="formweb  p-5 bg-gray-200 bg-opacity-80 rounded-lg ">
          <Formik
            initialValues={initialValues}
            validationSchema={SiteFormSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="mx-auto  bg-white rounded-lg">
                <h6 className="p-6 text-gray-500 text-3xl font-bold mb-2 flex justify-start ">
                  انشاء نموذج موقع
                </h6>
                <div className="line"></div>

                <div className="p-6">
                  <div className="flex justify-between mb-9 mt-5">
                    <div className="mb-4 w-72 ">
                      <label
                        htmlFor="cmsName"
                        className=" text-gray-700 text-2xl font-bold flex justify-start mb-4"
                      >
                        اسم الموقع
                      </label>
                      <Field
                        type="text"
                        name="cmsName"
                        value={values.cmsName}
                        className={`inputsform bg-white text-right h-14 appearance-none  rounded w-full py-2 px-3 outline-0 focus:outline-0
                text-gray-700 leading-tight focus:outline-none ${
                  errors.cmsName && touched.cmsName ? "border-red-500" : ""
                }`}
                      />
                      <div className="mt-1">
                        {errors.cmsName && touched.cmsName && (
                          <div className="flex items-center gap-1">
                            <MdOutlineErrorOutline className="text-red-500" />
                            <span className="text-gray-700">
                              {errors.cmsName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4  w-72 border-2 z-50 ">
                      <label
                        htmlFor="sourcePath"
                        className=" text-gray-700 text-2xl font-bold flex justify-start mb-4"
                      >
                        المصدر
                      </label>
                      <Field
                        type="text"
                        name="sourcePath"
                        value={values.sourcePath}
                        className={` inputsform bg-white text-right h-14 appearance-none rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none  ${
                  errors.sourcePath && touched.sourcePath
                    ? "border-red-500"
                    : ""
                }`}
                      />
                      <div className="mt-1">
                        {errors.sourcePath && touched.sourcePath && (
                          <div className="flex items-center gap-1">
                            <MdOutlineErrorOutline className="text-red-500" />
                            <span className="text-gray-700">
                              {errors.sourcePath}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4  w-72">
                      <label
                        htmlFor="price"
                        className=" text-gray-700 text-2xl font-bold flex justify-start mb-4"
                      >
                        الســــعر
                      </label>
                      <Field
                        type="number"
                        name="price"
                        value={values.price}
                        className="inputsform bg-white h-14 appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                      />
                      <div className="mt-1">
                        {errors.price && touched.price && (
                          <div className="flex items-center gap-1">
                            <MdOutlineErrorOutline className="text-red-500" />
                            <span className="text-gray-700">
                              {errors.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-16  justify-between">
                    <div className=" mt-1">
                      <div className=" text-gray-700 text-2xl font-bold flex justify-start mb-4">
                        صوره الموقع
                      </div>
                      <div className="inputsform relative h-14 w-72 flex ">
                        <span className="text-gray-700 mt-2 block max-w-[150px] overflow-hidden overflow-ellipsis">
                          {imageName}
                        </span>
                        <label
                          htmlFor="imageFile"
                          className="text-gray-700 absolute left-3 top-3 cursor-pointer"
                        >
                          <span className="cursor-pointer  text-lg bg-[#4EC2BE] text-white tracking-wider rounded-sm py-2 px-3 font-sans">
                            Browse
                          </span>
                          <input
                            accept=".jpg, .png, .gif, .jpeg"
                            type="file"
                            id="imageFile"
                            name="imageFile"
                            className={`hidden`}
                            onChange={(e) => {
                              const files = e.currentTarget?.files;
                              if (files) {
                                const imageName = files[0];
                                setFieldValue("imageFile", imageName);
                                setImageName(imageName.name);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <div className="mt-1">
                        {errors.imageFile && touched.imageFile && (
                          <div className="flex items-center gap-1">
                            <MdOutlineErrorOutline className="text-red-500" />
                            <span className="text-gray-700">
                              {errors.imageFile}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-3/5">
                      <label
                        htmlFor="cmsDescription"
                        className=" text-gray-700 text-2xl font-bold flex justify-start mb-4"
                      >
                        وصف المـــوقع
                      </label>
                      <Field
                        as="textarea"
                        name="cmsDescription"
                        rows="4"
                        value={values.cmsDescription}
                        className={`inputsform bg-white text-right appearance-none w-full rounded py-2 px-3
                text-gray-700 leading-tight focus:outline-none  ${
                  errors.cmsDescription && touched.cmsDescription
                    ? "border-red-500"
                    : ""
                }`}
                      />
                      <div className="mt-1">
                        {errors.cmsDescription && touched.cmsDescription && (
                          <div className="flex items-center gap-1">
                            <MdOutlineErrorOutline className="text-red-500" />
                            <span className="text-gray-700">
                              {errors.cmsDescription}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center mt-5 ">
        <div
          className={`relative flex justify-between gap-3 px-5 py-3 cursor-pointer ${
            activeTab === "pages" ? "bg-[#EA3D3F]" : "bg-[#eb5558]"
          } rounded-tr-2xl`}
          onClick={() => handleTabClick("pages")}
        >
          <span className={`text-2xl font-sans text-white font-bold `}>
            الصفحات
          </span>
          <img src={fileLines} alt="" className="w-5" />
          <span
            className={`w-5 h-5 bg-[#EA3D3F] absolute -bottom-1.5 right-14 rotate-45 ${
              activeTab === "pages" ? "block" : "hidden"
            }`}
          ></span>
        </div>

        <div
          className={`relative flex justify-between gap-3 px-5 py-3 cursor-pointer ${
            activeTab === "design" ? "bg-[#EA3D3F]" : "bg-[#eb5558]"
          } rounded-tl-2xl`}
          onClick={() => handleTabClick("design")}
        >
          <span className={`text-2xl font-sans text-white font-bold `}>
            التصميم
          </span>
          <img src={magic} alt="" className="w-7" />
          <span
            className={`w-5 h-5 bg-[#EA3D3F] absolute -bottom-1.5 right-14 rotate-45 ${
              activeTab === "design" ? "block" : "hidden"
            }`}
          ></span>
        </div>
      </div>

      <div className={activeTab === "pages" ? "block" : "hidden"}>
        <TempletePages />
      </div>
      <div className={activeTab === "design" ? "block" : "hidden"}>
        <Layouts />
      </div>
    </>
  );
};

export default SiteForm;
