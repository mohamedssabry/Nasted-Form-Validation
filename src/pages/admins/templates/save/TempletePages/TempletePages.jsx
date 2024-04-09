import React, { useState } from "react";
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "../Style/pagesStyle.css";
import notesmedical from "../../../../../assets/icons/notes-medical.svg";
import elecicon from "../../../../../assets/icons/elec-icon.svg";
import trashicon from "../../../../../assets/icons/trash-icon.svg";
import trashicon3 from "../../../../../assets/icons/trash-icon-3.svg";
import elecicon3 from "../../../../../assets/icons/elec-icon-3.svg";
import elecicon2 from "../../../../../assets/icons/elec-icon2.svg";
import trashicon2 from "../../../../../assets/icons/trash-icon-2.svg";
import CustomSelect from "./select";
import {
  cmsPageTypeEnum,
  cmsItemTypeEnum,
} from "../../../../../shared/enums/enums";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import { useCreateAdminMutation } from "../../../../../features/adminSlice";

const TempletePages = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInputs, setShowInputs] = useState([]);
  const [showItemInputs, setShowItemInputs] = useState([]);
  const [showMainSection, setShowMainSection] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [adminSubmition] = useCreateAdminMutation();

  const validationSchema = Yup.object().shape({
    cmsTemplatePages: Yup.array().of(
      Yup.object().shape({
        displayName: Yup.string().required("يجب ادخال اسم الصفحة"),
        description: Yup.string().required("يجب ادخال وصف الصفحة"),
        cmsPageTypeEnum: Yup.number().required("يجب ادخال نوع الصفحة"),
        cmsTemplateLayoutSections: Yup.array().of(
          Yup.object().shape({
            sectionCode: Yup.string()
              .required("يجب ادخال كود القسم")
              .matches(
                /^[A-Za-z]+$/,
                "يجب أن يكون الكود باللغة الإنجليزية وبدون مسافات"
              ),
            sectionPosition: Yup.string().required("يجب ادخال مكان القسم"),
            sectionDisplayName: Yup.string().required("يجب ادخال وصف القسم"),
            cmsTemplateLayoutSectionItems: Yup.array().of(
              Yup.object().shape({
                itemKey: Yup.string()
                  .required("يجب ادخال كود العنصر")
                  .matches(
                    /^[A-Za-z]+$/,
                    "يجب أن يكون الكود باللغة الإنجليزية وبدون مسافات"
                  ),
                itemDisplayName: Yup.string().required("يجب ادخال اسم العنصر"),
                itemPosition: Yup.string().required("يجب ادخال مكان العنصر"),
                cmsItemTypeEnum: Yup.number().required("يجب ادخال نوع العنصر"),
              })
            ),
          })
        ),
      })
    ),
  });

  const initialValues = {
    cmsTemplatePages: [],
    cmsTemplateLayoutSections: [],
    cmsTemplateLayoutSectionItems: [],
  };

  const keyValuePairs = Object.entries(cmsPageTypeEnum).map(([key, value]) => ({
    label: key,
    value,
  }));

  const keyValuePairsItems = Object.entries(cmsItemTypeEnum).map(
    ([key, value]) => ({
      label: key,
      value,
    })
  );

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const toggleFormVisibility = (index, isSection) => {
    if (isSection) {
      setShowInputs((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    } else {
      setShowItemInputs((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }
    if (!isSection && index === -1) {
      setShowMainSection((prevState) => !prevState);
    }
  };

  const handleSubmit = async (values) => {
    const payload = new FormData();

    // Append each object in the array to FormData
    values.cmsTemplatePages.forEach((page, pageIndex) => {
      payload.append(
        `cmsTemplatePages[${pageIndex}].cmsPageTypeEnum`,
        page.cmsPageTypeEnum
      );
      payload.append(
        `cmsTemplatePages[${pageIndex}].displayName`,
        page.displayName
      );
      payload.append(
        `cmsTemplatePages[${pageIndex}].description`,
        page.description
      );

      // Iterate over sections for each page
      page.cmsTemplateLayoutSections.forEach((section, sectionIndex) => {
        payload.append(
          `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].sectionCode`,
          section.sectionCode
        );
        payload.append(
          `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].sectionPosition`,
          section.sectionPosition
        );
        payload.append(
          `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].sectionDisplayName`,
          section.sectionDisplayName
        );

        // Iterate over items for each section
        section.cmsTemplateLayoutSectionItems.forEach((item, itemIndex) => {
          payload.append(
            `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemKey`,
            item.itemKey
          );
          payload.append(
            `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemDisplayName`,
            item.itemDisplayName
          );
          payload.append(
            `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemPosition`,
            item.itemPosition
          );
          payload.append(
            `cmsTemplatePages[${pageIndex}].cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].cmsItemTypeEnum`,
            item.cmsItemTypeEnum
          );
        });
      });
    });
    await adminSubmition(payload);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="formweb p-5 bg-gray-200 bg-opacity-80 rounded-lg mx-auto flex-col">
            <FieldArray name="cmsTemplatePages">
              {({ push: pushPage, remove: removePage }) => (
                <div>
                  {values.cmsTemplatePages.map((page, pageIndex) => (
                    <div key={pageIndex} className="mb-8">
                      <div className="sub-form rounded-3xl bg-white pb-10">
                        <div className="header-form-page h-20 bg-[#E1857F] flex justify-between p-5 rounded-t-3xl">
                          <div className="flex gap-5 items-center">
                            <img src={elecicon} alt="" />
                            <span className="text-white text-2xl font-bold font-sans">
                              الصفحة ({pageIndex + 1})
                            </span>
                          </div>
                          <div className="flex gap-5 items-center">
                            <img
                              src={trashicon}
                              alt=""
                              className="cursor-pointer"
                              onClick={() => removePage(pageIndex)}
                            />
                            <IoIosArrowUp
                              className={`cursor-pointer transform ${
                                showMainSection && "rotate-180"
                              } `}
                              size={40}
                              color="white"
                              onClick={() => toggleFormVisibility(-1, false)}
                            />
                          </div>
                        </div>
                        {showMainSection && (
                          <div className="">
                            <div className="w-full grid grid-cols-3 gap-10 p-5 ">
                              <div className="">
                                <label
                                  htmlFor="displayName"
                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                >
                                  اسم الصفحة
                                </label>
                                <Field
                                  name={`cmsTemplatePages.${pageIndex}.displayName`}
                                  type="text"
                                  className="inputsform h-14 w-full font-sans bg-white"
                                  values={values.displayName}
                                />
                                <ErrorMessage
                                  name={`cmsTemplatePages.${pageIndex}.displayName`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                              <div className="">
                                <label
                                  htmlFor="cmsPageTypeEnum"
                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                >
                                  نوع الصفحة
                                </label>
                                <CustomSelect
                                  name={`cmsTemplatePages.${pageIndex}.cmsPageTypeEnum`}
                                  options={keyValuePairs}
                                  onChange={handleChange}
                                  values={values.cmsPageTypeEnum}
                                />
                                <ErrorMessage
                                  name={`cmsTemplatePages.${pageIndex}.cmsPageTypeEnum`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                              <div className="">
                                <label
                                  htmlFor="description"
                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                >
                                  وصف الصفحة
                                </label>
                                <Field
                                  name={`cmsTemplatePages.${pageIndex}.description`}
                                  type="text"
                                  className="inputsform h-14 w-full font-sans bg-white"
                                  values={values.description}
                                />
                                <ErrorMessage
                                  name={`cmsTemplatePages.${pageIndex}.description`}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <FieldArray
                              key={pageIndex}
                              name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections`}
                            >
                              {({
                                push: pushSection,
                                remove: removeSection,
                              }) => (
                                <div key={pageIndex}>
                                  {page.cmsTemplateLayoutSections.map(
                                    (section, index) => (
                                      <div className="mb-8 p-5" key={index}>
                                        <div className="sub-form rounded-3xl bg-[#FCE1DC7A] pb-10">
                                          <div className="header-form h-20 bg-[#EFB2A5] flex justify-between p-5 rounded-t-3xl">
                                            <div className="flex gap-5 items-center">
                                              <img src={elecicon2} alt="" />
                                              <span className="text-white text-2xl font-bold font-sans">
                                                القسم ({index + 1})
                                              </span>
                                            </div>
                                            <div className="flex gap-5 items-center">
                                              <div
                                                className="flex items-center gap-1"
                                                onClick={() =>
                                                  setIsChecked(!isChecked)
                                                }
                                              >
                                                <span className="text-white text-2xl font-sans">
                                                  قابل للتكرار
                                                </span>
                                                {isChecked ? (
                                                  <IoIosCheckmarkCircleOutline
                                                    size={25}
                                                    color="white"
                                                  />
                                                ) : (
                                                  <MdOutlineRadioButtonUnchecked
                                                    size={25}
                                                    color="white"
                                                  />
                                                )}
                                              </div>

                                              <img
                                                src={trashicon2}
                                                alt=""
                                                className="cursor-pointer"
                                                onClick={() =>
                                                  removeSection(index)
                                                }
                                              />
                                              <IoIosArrowUp
                                                className={`cursor-pointer transform ${
                                                  showInputs[index]
                                                    ? ""
                                                    : "rotate-180"
                                                }`}
                                                size={40}
                                                color="white"
                                                onClick={() =>
                                                  toggleFormVisibility(
                                                    index,
                                                    true
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                          {showInputs[index] && (
                                            <div className="w-full grid grid-cols-3 gap-10 p-5 ">
                                              <div className="">
                                                <label
                                                  htmlFor="sectionCode"
                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                >
                                                  كود القسم
                                                </label>
                                                <Field
                                                  type="text"
                                                  values={values.sectionCode}
                                                  className="inputsform h-14 w-full font-sans bg-white"
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionCode`}
                                                />

                                                <ErrorMessage
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionCode`}
                                                  component="div"
                                                  className="text-red-500 text-sm"
                                                />
                                              </div>
                                              <div className="">
                                                <label
                                                  htmlFor="sectionPosition"
                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                >
                                                  الترتيب
                                                </label>
                                                <Field
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionPosition`}
                                                  type="text"
                                                  values={
                                                    values.sectionPosition
                                                  }
                                                  className="inputsform h-14 w-full font-sans bg-white"
                                                />
                                                <ErrorMessage
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionPosition`}
                                                  component="div"
                                                  className="text-red-500 text-sm"
                                                />
                                              </div>

                                              <div className="">
                                                <label
                                                  htmlFor="sectionDisplayName"
                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                >
                                                  وصف القسم
                                                </label>
                                                <Field
                                                  type="text"
                                                  values={
                                                    values.sectionDisplayName
                                                  }
                                                  className="inputsform w-full h-14 font-sans bg-white"
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionDisplayName`}
                                                />
                                                <ErrorMessage
                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.sectionDisplayName`}
                                                  component="div"
                                                  className="text-red-500 text-sm"
                                                />
                                              </div>
                                            </div>
                                          )}
                                          {showInputs[index] && (
                                            <FieldArray
                                              name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems`}
                                            >
                                              {({
                                                push: pushItem,
                                                remove: removeItem,
                                              }) => (
                                                <div>
                                                  {values.cmsTemplatePages[
                                                    pageIndex
                                                  ].cmsTemplateLayoutSections[
                                                    index
                                                  ].cmsTemplateLayoutSectionItems.map(
                                                    (item, itemIndex) => (
                                                      <div
                                                        className="mb-8 p-5"
                                                        key={itemIndex}
                                                      >
                                                        <div className="form-item bg-white rounded-3xl bg-[#FCE1DC7A] pb-10">
                                                          <div className="header-form-item h-20 bg-[#E0E1E1] flex justify-between p-5 rounded-t-3xl">
                                                            <div className="flex gap-5 items-center">
                                                              <img
                                                                src={elecicon3}
                                                                alt=""
                                                              />
                                                              <span className="text-[#696969] text-2xl font-bold font-sans">
                                                                العنصر (
                                                                {itemIndex + 1})
                                                              </span>
                                                            </div>
                                                            <div className="flex gap-5 items-center">
                                                              <div className="flex items-center gap-1">
                                                                <span className="text-[#918A8A] text-2xl font-sans">
                                                                  قابل للتكرار
                                                                </span>

                                                                <MdOutlineRadioButtonUnchecked
                                                                  size={25}
                                                                  color="#918A8A"
                                                                />
                                                              </div>

                                                              <img
                                                                src={trashicon3}
                                                                alt=""
                                                                className="cursor-pointer"
                                                                onClick={() =>
                                                                  removeItem(
                                                                    itemIndex
                                                                  )
                                                                }
                                                              />
                                                              <IoIosArrowUp
                                                                className={`cursor-pointer transform ${
                                                                  showItemInputs[
                                                                    itemIndex
                                                                  ]
                                                                    ? ""
                                                                    : "rotate-180"
                                                                }`}
                                                                size={40}
                                                                color="#918A8A"
                                                                onClick={() =>
                                                                  toggleFormVisibility(
                                                                    itemIndex,
                                                                    false
                                                                  )
                                                                }
                                                              />
                                                            </div>
                                                          </div>
                                                          {showItemInputs[
                                                            itemIndex
                                                          ] && (
                                                            <div className="w-full grid grid-cols-3 gap-10 p-5 ">
                                                              <div className="">
                                                                <label
                                                                  htmlFor="itemKey"
                                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                                >
                                                                  كود العنصر
                                                                </label>
                                                                <Field
                                                                  type="text"
                                                                  values={
                                                                    values.itemKey
                                                                  }
                                                                  className="inputsform h-14 w-full font-sans bg-white"
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemKey`}
                                                                />

                                                                <ErrorMessage
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemKey`}
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                                />
                                                              </div>
                                                              <div className="">
                                                                <label
                                                                  htmlFor="itemDisplayName"
                                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                                >
                                                                  اسم العنصر
                                                                </label>
                                                                <Field
                                                                  type="text"
                                                                  values={
                                                                    values.itemDisplayName
                                                                  }
                                                                  className="inputsform h-14 w-full font-sans bg-white"
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemDisplayName`}
                                                                />
                                                                <ErrorMessage
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemDisplayName`}
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                                />
                                                              </div>

                                                              <div className="">
                                                                <label
                                                                  htmlFor="cmsItemTypeEnum"
                                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                                >
                                                                  نوع العنصر
                                                                </label>
                                                                <CustomSelect
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.cmsItemTypeEnum`}
                                                                  placeholder="نوع العنصر"
                                                                  options={
                                                                    keyValuePairsItems
                                                                  }
                                                                  onChange={
                                                                    handleChange
                                                                  }
                                                                  values={
                                                                    values.cmsItemTypeEnum
                                                                  }
                                                                />
                                                                <ErrorMessage
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.cmsItemTypeEnum`}
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                                />
                                                              </div>
                                                              <div className="">
                                                                <label
                                                                  htmlFor="itemPosition"
                                                                  className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                                                                >
                                                                  مكان العنصر
                                                                </label>
                                                                <Field
                                                                  type="text"
                                                                  values={
                                                                    values.itemPosition
                                                                  }
                                                                  className="inputsform h-14 w-full font-sans bg-white"
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemPosition`}
                                                                />
                                                                <ErrorMessage
                                                                  name={`cmsTemplatePages.${pageIndex}.cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemPosition`}
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                                />
                                                              </div>
                                                            </div>
                                                          )}
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                  <div className="w-full grid place-content-end pl-5">
                                                    <div className="bg-[#BEBCBB] hover:bg-[#989393] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 tracking-wider ">
                                                      <button
                                                        type="button"
                                                        className="text-2xl font-sans text-white font-bold cursor-pointer"
                                                        onClick={() => {
                                                          pushItem({
                                                            encryptedLayoutSectionItemId:
                                                              "",
                                                            itemKey: "",
                                                            itemDisplayName: "",
                                                            itemPosition: "",
                                                            isIncremental: false,
                                                            cmsItemTypeEnum: 1,
                                                            cmsItemStatusEnum: 2,
                                                          });
                                                          setShowItemInputs(
                                                            (prevState) => [
                                                              ...prevState,
                                                              true,
                                                            ]
                                                          );
                                                        }}
                                                      >
                                                        اضافه عنصر جديد
                                                      </button>
                                                      <img
                                                        src={notesmedical}
                                                        alt=""
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </FieldArray>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                  <div className="w-full grid place-content-end pl-5">
                                    <div className="bg-[#EA9683] hover:bg-[#A95441] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 tracking-wider ">
                                      <button
                                        type="button"
                                        className="text-2xl font-sans text-white font-bold cursor-pointer"
                                        onClick={() => {
                                          pushSection({
                                            encryptedPageSectionId: "",
                                            sectionCode: "",
                                            sectionDisplayName: "",
                                            sectionPosition: "",
                                            isIncremental: false,
                                            cmsItemStatusEnum: 2,
                                            cmsTemplateLayoutSectionItems: [],
                                          });
                                          setShowInputs((prevState) => [
                                            ...prevState,
                                            true,
                                          ]);
                                        }}
                                      >
                                        اضافه قسم جديد
                                      </button>
                                      <img src={notesmedical} alt="" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="w-full grid place-content-end ">
                    <div className="bg-[#E1857F] hover:bg-[#EA3D3F] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 tracking-wider ">
                      <button
                        type="button"
                        className="text-2xl font-sans text-white font-bold cursor-pointer"
                        onClick={() => {
                          pushPage({
                            displayName: "",
                            description: "",
                            cmsPageTypeEnum: 1,
                            cmsTemplateLayoutSections: [],
                          });
                        }}
                      >
                        اضافه صفحة جديدة
                      </button>
                      <img src={notesmedical} alt="" />
                    </div>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>
          <div className="grid place-content-center pt-5 ">
            <div className="">
              <button
                type="button"
                className=" bg-button-save text-white py-2 px-5 rounded-md font-sans text-lg font-bold flex gap-2 items-center cursor-pointer"
              >
                أضافه
                <FaPlusSquare />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TempletePages;
