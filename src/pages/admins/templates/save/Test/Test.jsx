// import React, { useState } from "react";
// import "../Style/pagesStyle.css";
// import notesmedical from "../../../../../assets/icons/notes-medical.svg";
// import elecicon from "../../../../../assets/icons/elec-icon.svg";
// import trashicon3 from "../../../../../assets/icons/trash-icon-3.svg";
// import elecicon3 from "../../../../../assets/icons/elec-icon-3.svg";
// import trashicon from "../../../../../assets/icons/trash-icon.svg";
// import {
//   cmsLayoutTypeEnum,
//   cmsItemTypeEnum,
// } from "../../../../../shared/enums/enums";
// import { IoIosArrowUp } from "react-icons/io";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
// import CustomSelect from "../TempletePages/select";

// function Test() {
//   const [forms, setForms] = useState([]);
//   const [nextId, setNextId] = useState(1);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [activeButton, setActiveButton] = useState([]);

//   const initialValues = {
//     cmsTemplateLayoutSections: [
//       {
//         encryptedLayoutSectionId: "",
//         cmsLayoutTypeEnum: 1,
//         sectionCode: "layoutSection",
//         sectionDisplayName: "Layout Section",
//         cmsItemStatusEnum: 2,
//         cmsTemplateLayoutSectionItems: [
//           {
//             encryptedLayoutSectionItemId: "",
//             itemKey: "layoutItemKey1",
//             itemDisplayName: "Layout Item 1",
//             itemPosition: 1,
//             isIncremental: false,
//             cmsItemTypeEnum: 1,
//             cmsItemStatusEnum: 2,
//           },
//         ],
//       },
//     ],
//   };

//   const toggleIcon = (id) => {
//     if (activeButton.includes(id)) {
//       setActiveButton(activeButton.filter((buttonId) => buttonId !== id));
//     } else {
//       setActiveButton([...activeButton, id]);
//     }
//   };

//   const keyValuePairs = Object.entries(cmsLayoutTypeEnum).map(
//     ([key, value]) => ({
//       label: key,
//       value,
//     })
//   );
//   const keyValuePairsItems = Object.entries(cmsItemTypeEnum).map(
//     ([key, value]) => ({
//       label: key,
//       value,
//     })
//   );

//   const handleChange = (option) => {
//     setSelectedOption(option);
//   };

//   const handleDivClick = () => {
//     const id = nextId;

//     const newForm = (
//       <div key={id} id={id}>
//         <form key={id} className="w-full grid grid-cols-3 gap-10 p-5">
//           <div>
//             <label
//               htmlFor="sectionCode"
//               className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//             >
//               كود القسم
//             </label>
//             <input
//               name="sectionCode"
//               type="text"
//               className="inputsform h-14 w-full font-sans bg-white"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="sectionDisplayName"
//               className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//             >
//               اسم القسم
//             </label>
//             <input
//               name="sectionDisplayName"
//               type="text"
//               className="inputsform h-14 w-full font-sans bg-white"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="cmsLayoutTypeEnum"
//               className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//             >
//               نوع القسم
//             </label>
//             <CustomSelect
//               name="cmsLayoutTypeEnum"
//               options={keyValuePairs}
//               onChange={handleChange}
//             />
//           </div>
//         </form>
//       </div>
//     );

//     setForms([...forms, { id, form: newForm, subForms: [], visible: true }]);
//     setNextId(nextId + 1);
//   };

//   const handleSubFormSection = (parentId) => {
//     const parentFormIndex = forms.findIndex((form) => form.id === parentId);
//     const subFormId = nextId;

//     const newSubForm = (
//       <form key={subFormId} className="w-full grid grid-cols-3 gap-10 p-5">
//         <div>
//           <label
//             htmlFor="itemKey"
//             className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//           >
//             كود العنصر
//           </label>
//           <input
//             name="itemKey"
//             type="text"
//             className="inputsform h-14 font-sans w-full"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="itemDisplayName"
//             className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//           >
//             اسم العنصر
//           </label>
//           <input
//             name="itemDisplayName"
//             type="text"
//             className="inputsform h-14  font-sans w-full"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="cmsItemTypeEnum"
//             className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//           >
//             نوع العنصر
//           </label>
//           <CustomSelect
//             name="cmsItemTypeEnum"
//             options={keyValuePairsItems}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="itemPosition"
//             className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
//           >
//             مكان العنصر
//           </label>
//           <input
//             name="itemPosition"
//             type="text"
//             className="inputsform h-14 font-sans w-full"
//           />
//         </div>
//       </form>
//     );

//     const updatedForms = [...forms];
//     updatedForms[parentFormIndex].subForms.push({
//       id: subFormId,
//       form: newSubForm,
//       visible: true,
//     });

//     setForms(updatedForms);
//     setNextId(nextId + 1);
//   };

//   const handleDeleteForm = (id) => {
//     const updatedForms = forms.filter((form) => form.id !== id);
//     setForms(updatedForms);
//   };

//   const handleDeleteSubForm = (parentId, subFormId) => {
//     const parentFormIndex = forms.findIndex((form) => form.id === parentId);
//     const updatedForms = [...forms];
//     const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
//       (subForm) => subForm.id === subFormId
//     );
//     updatedForms[parentFormIndex].subForms.splice(subFormIndex, 1);
//     setForms(updatedForms);
//   };

//   const toggleFormVisibility = (id) => {
//     const updatedForms = forms.map((form) =>
//       form.id === id ? { ...form, visible: !form.visible } : form
//     );
//     setForms(updatedForms);
//   };

//   const toggleSubFormVisibility = (parentId, subFormId) => {
//     const parentFormIndex = forms.findIndex((form) => form.id === parentId);
//     const updatedForms = [...forms];
//     const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
//       (subForm) => subForm.id === subFormId
//     );
//     updatedForms[parentFormIndex].subForms[subFormIndex].visible =
//       !updatedForms[parentFormIndex].subForms[subFormIndex].visible;
//     setForms(updatedForms);
//   };

//   return (
//     <>
//       <div className="formweb p-5 bg-gray-200 bg-opacity-80 rounded-lg mx-auto flex-col">
//         {forms.map((form, index) => (
//           <div key={form.id} className="mb-14">
//             <div className="sub-form h-20 bg-[#EFB2A5] flex justify-between p-5 rounded-t-3xl">
//               <div className="flex gap-5 items-center">
//                 <img src={elecicon} alt="" />
//                 <span className="text-white text-2xl font-bold font-sans">
//                   القسم ({index + 1})
//                 </span>
//               </div>
//               <div className="flex gap-5 items-center">
//                 <img
//                   src={trashicon}
//                   alt=""
//                   className="cursor-pointer"
//                   onClick={() => handleDeleteForm(form.id)}
//                 />
//                 <IoIosArrowUp
//                   className={`cursor-pointer transform ${
//                     form.visible ? "rotate-180" : ""
//                   }`}
//                   size={40}
//                   color="white"
//                   onClick={() => toggleFormVisibility(form.id)}
//                 />
//               </div>
//             </div>
//             <div
//               key={form.id}
//               className={`form-item  bg-[#FCE1DC7A] flex flex-col rounded-b-3xl mb-8 `}
//             >
//               <div className={`${form.visible ? "" : "hidden"} w-full`}>
//                 {form.form}
//                 <div className="grid gap-8 ">
//                   {form.subForms.map((subForm, index) => (
//                     <div className="px-10 key={subForm.id}">
//                       <div className="form-item h-20 bg-[#E0E1E1] flex justify-between p-5 rounded-t-3xl">
//                         <div className="flex gap-5 items-center">
//                           <img src={elecicon3} alt="" />
//                           <span className="text-[#696969] text-2xl font-bold font-sans">
//                             العنصر ({index + 1})
//                           </span>
//                         </div>
//                         <div className="flex gap-5 items-center">
//                           <div className="flex items-center gap-1">
//                             <span className="text-[#918A8A] text-2xl font-sans">
//                               قابل للتكرار
//                             </span>
//                             <button
//                               id={subForm.id}
//                               onClick={() => toggleIcon(subForm.id)}
//                               className="cursor-pointer"
//                             >
//                               {activeButton.includes(subForm.id) ? (
//                                 <IoIosCheckmarkCircleOutline
//                                   size={25}
//                                   color="#918A8A"
//                                 />
//                               ) : (
//                                 <MdOutlineRadioButtonUnchecked
//                                   size={25}
//                                   color="#918A8A"
//                                 />
//                               )}
//                             </button>
//                           </div>

//                           <img
//                             src={trashicon3}
//                             alt=""
//                             className="cursor-pointer"
//                             onClick={() =>
//                               handleDeleteSubForm(form.id, subForm.id)
//                             }
//                           />
//                           <IoIosArrowUp
//                             className={`cursor-pointer transform ${
//                               subForm.visible ? "rotate-180" : ""
//                             }`}
//                             size={40}
//                             color="#918A8A"
//                             onClick={() =>
//                               toggleSubFormVisibility(form.id, subForm.id)
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div
//                         key={index}
//                         className={`form-item bg-white flex flex-col rounded-b-3xl ${
//                           subForm.visible ? "" : "hidden"
//                         }`}
//                       >
//                         {subForm.form}
//                       </div>
//                       <div
//                         className={`form-item h-10 w-full bg-white rounded-b-3xl ${
//                           subForm.visible ? "hidden" : ""
//                         }`}
//                       ></div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="w-full grid place-content-end">
//                   <div
//                     className="bg-[#BEBCBB] hover:bg-[#989393] w-fit ml-5 rounded-lg flex gap-3 mt-3 mb-5 p-2 cursor-pointer tracking-wider"
//                     onClick={() => handleSubFormSection(form.id)}
//                   >
//                     <span className="text-2xl font-sans text-white font-bold ">
//                       اضافه عنصر جديد
//                     </span>
//                     <img src={notesmedical} alt="" />
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`h-12 w-full bg-[#FCE1DC7A] rounded-b-3xl `}
//               ></div>
//             </div>
//           </div>
//         ))}
//         <div className="w-full grid place-content-end">
//           <div
//             className="bg-[#EA9683] hover:bg-[#A95441] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 cursor-pointer tracking-wider"
//             onClick={handleDivClick}
//           >
//             <span className="text-2xl font-sans text-white font-bold ">
//               اضافه قسم جديد
//             </span>
//             <img src={notesmedical} alt="" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Test;






import React, { useState } from "react";
import "../Style/pagesStyle.css";
import notesmedical from "../../../../../assets/icons/notes-medical.svg";
import elecicon from "../../../../../assets/icons/elec-icon.svg";
import elecicon2 from "../../../../../assets/icons/elec-icon2.svg";
import trashicon2 from "../../../../../assets/icons/trash-icon-2.svg";
import elecicon3 from "../../../../../assets/icons/elec-icon-3.svg";
import trashicon3 from "../../../../../assets/icons/trash-icon-3.svg";
import trashicon from "../../../../../assets/icons/trash-icon.svg";
import { cmsPageTypeEnum } from "../../../../../shared/enums/enums";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import CustomSelect from "../TempletePages/select";
// import CustomSelect from "./select";

function TemplatePages() {
  const [forms, setForms] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeButton, setActiveButton] = useState([]);

  const initialValues = {
    cmsTemplatePages: [
      {
        encryptedPageId: "",
        cmsPageTypeEnum: 1,
        displayName: "Home Page",
        description: "Home Page Description",
        cmsItemStatusEnum: 2,
        cmsTemplatePageSections: [
          {
            encryptedPageSectionId: "",
            sectionCode: "homeSection",
            sectionDisplayName: "Home Section",
            sectionPosition: 1,
            isIncremental: false,
            cmsItemStatusEnum: 2,
            cmsTemplatePageSectionItems: [
              {
                encryptedPageSectionItemId: "",
                itemKey: "itemKey1",
                itemDisplayName: "Item 1",
                itemPosition: 1,
                isIncremental: false,
                cmsItemTypeEnum: 1,
                cmsItemStatusEnum: 2,
              },
            ],
          },
        ],
      },
    ],
  };

  const toggleIcon = (id) => {
    if (activeButton.includes(id)) {
      setActiveButton(activeButton.filter((buttonId) => buttonId !== id));
    } else {
      setActiveButton([...activeButton, id]);
    }
  };

  const keyValuePairs = Object.entries(cmsPageTypeEnum).map(([key, value]) => ({
    label: key,
    value,
  }));

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const handleDivClick = () => {
    const id = nextId;

    const newForm = (
      <div key={id} id={id}>
        <form key={id} className="w-full grid grid-cols-3 gap-10 p-5">
          <div>
            <label
              htmlFor="displayName"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              اسم الصفحة
            </label>
            <input
              type="text"
              name="displayName"
              className="inputsform h-14 w-full font-sans"
            />
          </div>
          <div>
            <label
              htmlFor="cmsPageTypeEnum"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              نوع الصفحة
            </label>
            <CustomSelect
              name="cmsPageTypeEnum"
              options={keyValuePairs}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              وصف الصفحة
            </label>
            <textarea
              name="description"
              type="text"
              className="inputsform w-full h-28 font-sans"
            />
          </div>
        </form>
        <div className="sub-forms"></div>
      </div>
    );

    setForms([...forms, { id, form: newForm, subForms: [], visible: true }]);
    setNextId(nextId + 1);
  };

  const handleDeleteForm = (id) => {
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
  };

  const toggleFormVisibility = (id) => {
    const updatedForms = forms.map((form) =>
      form.id === id ? { ...form, visible: !form.visible } : form
    );
    setForms(updatedForms);
  };

  const handleSubFormSection = (parentId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const subFormId = nextId;

    const newSubForm = (
      <form key={subFormId} className="w-full grid grid-cols-3 gap-10 p-5">
        <div>
          <label
            htmlFor="sectionCode"
            className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
          >
            كود القسم
          </label>
          <input
            name="sectionCode"
            type="text"
            className="inputsform h-14 w-full font-sans bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="sectionPosition"
            className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
          >
            الترتيب
          </label>
          <input
            name="sectionPosition"
            type="text"
            className="inputsform h-14 w-full font-sans bg-white"
          />
        </div>
        <div>
          <label
            htmlFor="sectionDisplayName"
            className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
          >
            وصف القسم
          </label>
          <textarea
            name="sectionDisplayName"
            type="text"
            className="inputsform w-full h-28 font-sans bg-white"
          />
        </div>
      </form>
    );

    const updatedForms = [...forms];
    updatedForms[parentFormIndex].subForms.push({
      id: subFormId,
      form: newSubForm,
      visible: true,
      elements: [],
    });

    setForms(updatedForms);
    setNextId(nextId + 1);
  };

  const handleDeleteSubForm = (parentId, subFormId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const updatedForms = [...forms];
    const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
      (subForm) => subForm.id === subFormId
    );
    updatedForms[parentFormIndex].subForms.splice(subFormIndex, 1);
    setForms(updatedForms);
  };

  const toggleSubFormVisibility = (parentId, subFormId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const updatedForms = [...forms];
    const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
      (subForm) => subForm.id === subFormId
    );
    updatedForms[parentFormIndex].subForms[subFormIndex].visible =
      !updatedForms[parentFormIndex].subForms[subFormIndex].visible;
    setForms(updatedForms);
  };

  const handleAddNewSubFormElement = (parentId, subFormId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const updatedForms = [...forms];
    const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
      (subForm) => subForm.id === subFormId
    );

    const newSubFormElementId = nextId;
    const newSubFormElement = (
      <div key={newSubFormElementId}>
        <form
          key={newSubFormElementId}
          className=" form-item w-full grid grid-cols-3 gap-10 p-5 rounded-b-3xl bg-white"
        >
          <div>
            <label
              htmlFor="itemKey"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              كود العنصر
            </label>
            <input
              name="itemKey"
              type="text"
              className="inputsform h-14  font-sans w-full"
            />
          </div>
          <div>
            <label
              htmlFor="itemDisplayName"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              اسم العنصر
            </label>
            <input
              name="itemDisplayName"
              type="text"
              className="inputsform h-14 font-sans w-full"
            />
          </div>

          <div>
            <label
              htmlFor="itemPosition"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              الترتيب
            </label>
            <input
              name="itemPosition"
              type="text"
              className="inputsform h-14 font-sans w-full"
            />
          </div>

          <div>
            <label
              htmlFor="cmsItemTypeEnum"
              className="text-gray-700 text-2xl font-bold flex justify-start mb-4 font-sans"
            >
              النوع
            </label>
            <input
              name="cmsItemTypeEnum"
              type="text"
              className="inputsform h-14 font-sans w-full"
            />
          </div>
        </form>
      </div>
    );

    updatedForms[parentFormIndex].subForms[subFormIndex].elements.push({
      id: newSubFormElementId,
      element: newSubFormElement,
      visible: true,
    });

    setForms(updatedForms);
    setNextId(nextId + 1);
  };

  const handleDeleteSubFormElement = (parentId, subFormId, elementId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const updatedForms = [...forms];
    const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
      (subForm) => subForm.id === subFormId
    );
    const elementIndex = updatedForms[parentFormIndex].subForms[
      subFormIndex
    ].elements.findIndex((element) => element.id === elementId);

    updatedForms[parentFormIndex].subForms[subFormIndex].elements.splice(
      elementIndex,
      1
    );

    setForms(updatedForms);
  };

  const toggleSubFormElementVisibility = (parentId, subFormId, elementId) => {
    const parentFormIndex = forms.findIndex((form) => form.id === parentId);
    const updatedForms = [...forms];
    const subFormIndex = updatedForms[parentFormIndex].subForms.findIndex(
      (subForm) => subForm.id === subFormId
    );
    const elementIndex = updatedForms[parentFormIndex].subForms[
      subFormIndex
    ].elements.findIndex((element) => element.id === elementId);

    updatedForms[parentFormIndex].subForms[subFormIndex].elements[
      elementIndex
    ].visible =
      !updatedForms[parentFormIndex].subForms[subFormIndex].elements[
        elementIndex
      ].visible;

    setForms(updatedForms);
  };

  return (
    <>
      <div className="formweb p-5 bg-gray-200 bg-opacity-80 rounded-lg mx-auto flex-col">
        {forms.map((form, index) => (
          <div key={form.id} className="mb-14">
            <div className="form-new-page h-20 bg-[#E1857F] flex justify-between p-5 rounded-t-3xl">
              <div className="flex gap-5 items-center">
                <img src={elecicon} alt="" />
                <span className="text-white text-2xl font-bold font-sans">
                  الصفحة ({index + 1})
                </span>
              </div>
              <div className="flex gap-5 items-center">
                <img
                  src={trashicon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handleDeleteForm(form.id)}
                />
                <IoIosArrowUp
                  className={`cursor-pointer transform ${
                    form.visible ? "rotate-180" : ""
                  }`}
                  size={40}
                  color="white"
                  onClick={() => toggleFormVisibility(form.id)}
                />
              </div>
            </div>
            <div
              key={form.id}
              className={`form-new-page  bg-white flex flex-col rounded-b-3xl mb-8 `}
            >
              <div className={`${form.visible ? "" : "hidden"} w-full`}>
                {form.form}
                <div className="grid gap-8 ">
                  {form.subForms.map((subForm, index) => (
                    <div className="px-10 key={subForm.id}">
                      <div className="sub-form h-20 bg-[#EFB2A5] flex justify-between p-5 rounded-t-3xl">
                        <div className="flex gap-5 items-center">
                          <img src={elecicon2} alt="" />
                          <span className="text-white text-2xl font-bold font-sans">
                            القسم ({index + 1})
                          </span>
                        </div>
                        <div className="flex gap-5 items-center">
                          <div className="flex items-center gap-1">
                            <span className="text-white text-2xl font-sans">
                              قابل للتكرار
                            </span>
                            <button
                              id={subForm.id}
                              onClick={() => toggleIcon(subForm.id)}
                              className="cursor-pointer"
                            >
                              {activeButton.includes(subForm.id) ? (
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
                            </button>
                          </div>

                          <img
                            src={trashicon2}
                            alt=""
                            className="cursor-pointer"
                            onClick={() =>
                              handleDeleteSubForm(form.id, subForm.id)
                            }
                          />
                          <IoIosArrowUp
                            className={`cursor-pointer transform ${
                              subForm.visible ? "rotate-180" : ""
                            }`}
                            size={40}
                            color="white"
                            onClick={() =>
                              toggleSubFormVisibility(form.id, subForm.id)
                            }
                          />
                        </div>
                      </div>
                      <div
                        key={index}
                        className={`sub-form bg-[#FCE1DC7A] flex flex-col rounded-b-3xl ${
                          subForm.visible ? "" : "hidden"
                        }`}
                      >
                        {subForm.form}
                        {subForm.elements.map((element, index) => (
                          <div key={element.id} className="px-10 mb-8">
                            <div className="form-item h-20 bg-[#E0E1E1] flex justify-between p-5 rounded-t-3xl">
                              <div className="flex gap-5 items-center">
                                <img src={elecicon3} alt="" />
                                <span className="text-[#696969] text-2xl font-bold font-sans">
                                  العنصر ({index + 1})
                                </span>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="flex items-center gap-1">
                                  <span className="text-[#918A8A] text-2xl font-sans">
                                    قابل للتكرار
                                  </span>
                                  <button
                                    id={element.id}
                                    onClick={() => toggleIcon(element.id)}
                                    className="cursor-pointer"
                                  >
                                    {activeButton.includes(element.id) ? (
                                      <IoIosCheckmarkCircleOutline
                                        size={25}
                                        color="#918A8A"
                                      />
                                    ) : (
                                      <MdOutlineRadioButtonUnchecked
                                        size={25}
                                        color="#918A8A"
                                      />
                                    )}
                                  </button>
                                </div>

                                <img
                                  src={trashicon3}
                                  alt=""
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDeleteSubFormElement(
                                      form.id,
                                      subForm.id,
                                      element.id
                                    )
                                  }
                                />
                                <IoIosArrowUp
                                  className={`cursor-pointer transform ${
                                    element.visible ? "rotate-180" : ""
                                  }`}
                                  size={40}
                                  color="#918A8A"
                                  onClick={() =>
                                    toggleSubFormElementVisibility(
                                      form.id,
                                      subForm.id,
                                      element.id
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              className={`${element.visible ? "" : "hidden"}`}
                            >
                              {element.element}
                            </div>
                            <div
                              className={`form-item h-12 w-full bg-white rounded-b-3xl ${
                                element.visible ? "hidden" : ""
                              }`}
                            ></div>
                          </div>
                        ))}
                        <div className="w-full grid place-content-end">
                          <div className="bg-[#BEBCBB] hover:bg-[#989393] w-fit ml-5 rounded-lg flex gap-3 mt-3 mb-5 p-2 cursor-pointer tracking-wider">
                            <span
                              className="text-2xl font-sans text-white font-bold "
                              onClick={() =>
                                handleAddNewSubFormElement(form.id, subForm.id)
                              }
                            >
                              اضافه عنصر جديد
                            </span>
                            <img src={notesmedical} alt="" />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`sub-form h-10 w-full bg-[#FCE1DC7A] rounded-b-3xl ${
                          subForm.visible ? "hidden" : ""
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="w-full grid place-content-end">
                  <div
                    className="bg-[#EA9683] hover:bg-[#A95441] w-fit ml-5 rounded-lg flex gap-3 mt-3 mb-5 p-2 cursor-pointer tracking-wider"
                    onClick={() => handleSubFormSection(form.id)}
                  >
                    <span className="text-2xl font-sans text-white font-bold ">
                      اضافه قسم جديد
                    </span>
                    <img src={notesmedical} alt="" />
                  </div>
                </div>
              </div>
              <div className={`h-12 w-full bg-white rounded-b-3xl `}></div>
            </div>
          </div>
        ))}
        <div className="w-full grid place-content-end">
          <div
            className="bg-[#E1857F] hover:bg-[#EA3D3F] w-fit rounded-lg flex gap-3 mt-3 mb-5 p-2 cursor-pointer tracking-wider"
            onClick={handleDivClick}
          >
            <span className="text-2xl font-sans text-white font-bold ">
              اضافه صفحة جديدة
            </span>
            <img src={notesmedical} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TemplatePages;
