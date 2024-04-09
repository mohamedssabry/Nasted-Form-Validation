import React, { useState } from "react";
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import "../Style/pagesStyle.css";
import notesmedical from "../../../../../assets/icons/notes-medical.svg";
import elecicon from "../../../../../assets/icons/elec-icon.svg";
import trashicon from "../../../../../assets/icons/trash-icon.svg";
import trashicon3 from "../../../../../assets/icons/trash-icon-3.svg";
import elecicon3 from "../../../../../assets/icons/elec-icon-3.svg";
import CustomSelect from "../TempletePages/select";
import {
  cmsLayoutTypeEnum,
  cmsItemTypeEnum,
} from "../../../../../shared/enums/enums";
import { IoIosArrowUp, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { useCreateAdminMutation } from "../../../../../features/adminSlice";

const Layouts = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInputs, setShowInputs] = useState([]);
  const [showItemInputs, setShowItemInputs] = useState([]);

  const [adminSubmition] = useCreateAdminMutation();

  const validationSchema = Yup.object().shape({
    cmsTemplateLayoutSections: Yup.array().of(
      Yup.object().shape({
        sectionCode: Yup.string()
          .required("يجب ادخال كود القسم")
          .matches(
            /^[A-Za-z]+$/,
            "يجب أن يكون الكود باللغة الإنجليزية وبدون مسافات"
          ),
        sectionDisplayName: Yup.string().required("يجب ادخال اسم القسم"),
        cmsLayoutTypeEnum: Yup.number().required("يجب ادخال نوع القسم"),
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
  });

  const initialValues = {
    cmsTemplateLayoutSections: [],
    cmsTemplateLayoutSectionItems: [],
  };

  const keyValuePairs = Object.entries(cmsLayoutTypeEnum).map(
    ([key, value]) => ({
      label: key,
      value,
    })
  );

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
  };

  const handleSubmit = async (values) => {
    const payload = new FormData();

    // Append each object in the array to FormData
    values.cmsTemplateLayoutSections.forEach((section, sectionIndex) => {
      payload.append(
        `cmsTemplateLayoutSections[${sectionIndex}].cmsLayoutTypeEnum`,
        section.cmsLayoutTypeEnum
      );
      payload.append(
        `cmsTemplateLayoutSections[${sectionIndex}].sectionCode`,
        section.sectionCode
      );
      payload.append(
        `cmsTemplateLayoutSections[${sectionIndex}].sectionDisplayName`,
        section.sectionDisplayName
      );

      // Iterate over sections for each section
      section.cmsTemplateLayoutSectionItems.forEach((item, itemIndex) => {
        payload.append(
          `cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemKey`,
          item.itemKey
        );
        payload.append(
          `cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemDisplayName`,
          item.itemDisplayName
        );
        payload.append(
          `cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].itemPosition`,
          item.itemPosition
        );
        payload.append(
          `cmsTemplateLayoutSections[${sectionIndex}].cmsTemplateLayoutSectionItems[${itemIndex}].cmsItemTypeEnum`,
          item.cmsItemTypeEnum
        );
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
      {({ values, isValid, dirty, isSubmitting }) => (
        <Form>
          <div className="formweb p-5 bg-gray-200 bg-opacity-80 rounded-lg mx-auto flex-col">
            <FieldArray name="cmsTemplateLayoutSections">
              {({ push: pushSection, remove: removeSection }) => (
                <div>
                  {values.cmsTemplateLayoutSections.map((section, index) => (
                    <div className="mb-8" key={index}>
                      <div className="sub-form rounded-3xl bg-[#FCE1DC7A] pb-10">
                        <div className="header-form h-20 bg-[#EFB2A5] flex justify-between p-5 rounded-t-3xl">
                          <div className="flex gap-5 items-center">
                            <img src={elecicon} alt="" />
                            <span className="text-white text-2xl font-bold font-sans">
                              القسم ({index + 1})
                            </span>
                          </div>
                          <div className="flex gap-5 items-center">
                            <img
                              src={trashicon}
                              alt=""
                              className="cursor-pointer"
                              onClick={() => removeSection(index)}
                            />
                            <IoIosArrowUp
                              className={`cursor-pointer transform ${
                                showInputs[index] ? "" : "rotate-180"
                              }`}
                              size={40}
                              color="white"
                              onClick={() => toggleFormVisibility(index, true)}
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
                                name={`cmsTemplateLayoutSections.${index}.sectionCode`}
                              />

                              <ErrorMessage
                                name={`cmsTemplateLayoutSections.${index}.sectionCode`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="">
                              <label
                                htmlFor="sectionDisplayName"
                                className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                              >
                                اسم القسم
                              </label>
                              <Field
                                type="text"
                                values={values.sectionDisplayName}
                                className="inputsform h-14 w-full font-sans bg-white"
                                name={`cmsTemplateLayoutSections.${index}.sectionDisplayName`}
                              />
                              <ErrorMessage
                                name={`cmsTemplateLayoutSections.${index}.sectionDisplayName`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>

                            <div className="">
                              <label
                                htmlFor="cmsLayoutTypeEnum"
                                className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
                              >
                                نوع القسم
                              </label>
                              <CustomSelect
                                name={`cmsTemplateLayoutSections.${index}.cmsLayoutTypeEnum`}
                                placeholder="نوع القسم"
                                options={keyValuePairs}
                                onChange={handleChange}
                                values={values.cmsLayoutTypeEnum}
                              />
                              <ErrorMessage
                                name={`cmsTemplateLayoutSections.${index}.cmsLayoutTypeEnum`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                        )}
                        {showInputs[index] && (
                          <FieldArray
                            name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems`}
                          >
                            {({ push: pushItem, remove: removeItem }) => (
                              <div>
                                {values.cmsTemplateLayoutSections[
                                  index
                                ].cmsTemplateLayoutSectionItems.map(
                                  (item, itemIndex) => (
                                    <div className="mb-8 p-5" key={itemIndex}>
                                      <div className="form-item bg-white rounded-3xl bg-[#FCE1DC7A] pb-10">
                                        <div className="header-form-item h-20 bg-[#E0E1E1] flex justify-between p-5 rounded-t-3xl">
                                          <div className="flex gap-5 items-center">
                                            <img src={elecicon3} alt="" />
                                            <span className="text-[#696969] text-2xl font-bold font-sans">
                                              العنصر ({itemIndex + 1})
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
                                                removeItem(itemIndex)
                                              }
                                            />
                                            <IoIosArrowUp
                                              className={`cursor-pointer transform ${
                                                showItemInputs[itemIndex]
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
                                        {showItemInputs[itemIndex] && (
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
                                                values={values.itemKey}
                                                className="inputsform h-14 w-full font-sans bg-white"
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemKey`}
                                              />

                                              <ErrorMessage
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemKey`}
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
                                                values={values.itemDisplayName}
                                                className="inputsform h-14 w-full font-sans bg-white"
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemDisplayName`}
                                              />
                                              <ErrorMessage
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemDisplayName`}
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
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.cmsItemTypeEnum`}
                                                options={keyValuePairsItems}
                                                onChange={handleChange}
                                                values={values.cmsItemTypeEnum}
                                              />
                                              <ErrorMessage
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.cmsItemTypeEnum`}
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
                                                values={values.itemPosition}
                                                className="inputsform h-14 w-full font-sans bg-white"
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemPosition`}
                                              />
                                              <ErrorMessage
                                                name={`cmsTemplateLayoutSections.${index}.cmsTemplateLayoutSectionItems.${itemIndex}.itemPosition`}
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
                                          encryptedLayoutSectionItemId: "",
                                          itemKey: "",
                                          itemDisplayName: "",
                                          itemPosition: "",
                                          isIncremental: false,
                                          cmsItemTypeEnum: 1,
                                          cmsItemStatusEnum: 2,
                                        });
                                        setShowItemInputs((prevState) => [
                                          ...prevState,
                                          true,
                                        ]);
                                      }}
                                    >
                                      اضافه عنصر جديد
                                    </button>
                                    <img src={notesmedical} alt="" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </FieldArray>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="w-full grid place-content-end ">
                    <div className="bg-[#EA9683] hover:bg-[#A95441] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 tracking-wider ">
                      <button
                        type="button"
                        className="text-2xl font-sans text-white font-bold cursor-pointer"
                        onClick={() => {
                          pushSection({
                            encryptedLayoutSectionId: "",
                            cmsLayoutTypeEnum: 1,
                            sectionCode: "",
                            sectionDisplayName: "",
                            cmsItemStatusEnum: 2,
                            cmsTemplateLayoutSectionItems: [],
                          });
                          setShowInputs((prevState) => [...prevState, true]);
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
          <div className="grid place-content-center pt-5 ">
            <div className="">
              <button
                type="submit"
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

export default Layouts;
