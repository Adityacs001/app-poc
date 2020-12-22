import * as React from "react";
import { motion } from "framer-motion";
import { getLayout } from "@components/Layouts/PrivateLayout";
import MainHeader from "@components/MainHeader";
import { useRouter } from "next/router";
import Select from "react-select";

import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import { useSelectStyles } from "../../hooks/useHelper";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Message from "@components/Message";
import { OptionsDTO } from "../../lib/commontypes";
import jobroles from "../../data/jobroles";
import joblocations from "../../data/joblocations";
import jobcompetencies from "../../data/jobcompetencies";
import jobskills from "../../data/jobskills";
import gender from "../../data/gender";
import collegepostingtype from "../../data/collegepostingtype";
import opportunityeducations from "../../data/opportunityeducations";
import collegelist from "../../data/collegelist";
import PageTitle from "@components/PageTitle";

const JobopportunityPostings = () => {
  const router = useRouter();
  const [isloading, setIsloading] = React.useState<boolean>(false);

  type positionDTO = {
    rid: string;
    jobtitleen: string;
    jobtitleae: string;
    targetdate: string;
    employementtype: OptionsDTO;
    jobrole: OptionsDTO;
    city: OptionsDTO;
    gender: OptionsDTO;
    requiredcolleges: Array<OptionsDTO>;
    requirededucation: Array<OptionsDTO>;
    requiredskill: Array<OptionsDTO>;
    requiredabilities: Array<OptionsDTO>;
    responsbilities: string;
    description: string;
  };

  const positionschema = yup.object().shape({
    jobtitleen: yup.string().required("Jobtitle in english is mandatory"),
    jobtitleae: yup.string().required("Jobtitle in arabic is mandatory"),
    targetdate: yup.string().required("Target date is mandatory"),
    employementtype: yup
      .number()
      .min(1, "employment type is mandatory")
      .required("employment type  is mandatory"),

    jobrole: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("job role is mandatory"),

    city: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("city is mandatory"),

    gender: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .nullable()
      .required("gender is mandatory"),

    requiredcolleges: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required colleges is mandatory"),

    requirededucation: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required education is mandatory"),

    requiredskill: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required skill is mandatory"),

    requiredabilities: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        }),
      )
      .nullable()
      .required("Required abilities is mandatory"),

    responsbilities: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("Roles & Responsbilities is mandatory"),

    description: yup
      .string()
      .min(17, "minimum 500 characters")
      .max(5007, "maximum 5000 character")
      .required("Job description is mandatory"),
  });

  const positionmethods = useForm<positionDTO>({
    mode: "onChange",
    resolver: yupResolver(positionschema),
    defaultValues: {
      rid: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    errors,
    setValue,
    setError,
    clearErrors,
    control,
    getValues,
    trigger,
    watch,
    reset,
  } = positionmethods;

  // const selectValue = watch("criticality");
  // React.useEffect(() => {
  //   console.log(selectValue);
  // }, [selectValue]);

  const onPositionSubmit = async ({
    jobtitleen,
    jobtitleae,
    targetdate,
    employementtype,
    jobrole,
    city,
    gender,
    requiredcolleges,
    requirededucation,
    requiredskill,
    requiredabilities,
    responsbilities,
    description,
  }) => {
    cogoToast.success(
      <Message
        title="Success"
        text="Posting is submitted for councelor approval"
        type="success"
      />,
      {
        position: "bottom-center",
      },
    );
  };

  return (
    <React.Fragment>
      <div className=" border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:flex-wrap">
        <div className="flex-1 min-w-0">
          <MainHeader
            title="Post jobopportunity for university students"
            subtitle=""
            isbordered={false}
          />
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="px-6 py-3  sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <PageTitle
            title="Fill in all mandatory fileds"
            subtitle="Posted vacancy will be adverstised to participating universities for students to apply"
            isbordered={false}
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...positionmethods}>
            <form onSubmit={handleSubmit(onPositionSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="jobtitleen"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Title(In English)
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="jobtitleen"
                          id="jobtitleen"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter job title in arabic"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.jobtitleen?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="jobtitleae"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Title(In Arabic)
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="jobtitleae"
                          id="jobtitleae"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter jobtitle in arabic"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.jobtitleae?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="targetdate"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Target Date
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="targetdate"
                          id="targetdate"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="YYYY-MM-DD"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.targetdate?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="jobrole"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Job Role
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="jobrole"
                          id="jobrole"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {jobroles &&
                            jobroles.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.jobrole?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="city"
                          id="city"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {joblocations &&
                            joblocations.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.city?.message}</p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Gender
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="gender"
                          name="gender"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {gender &&
                            gender.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">{errors.gender?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="employementtype"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Employement Type
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          id="employementtype"
                          name="employementtype"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {collegepostingtype &&
                            collegepostingtype.map((val, index) => (
                              <option
                                key={index}
                                value={val.value}
                                className="text-gray-500 "
                              >
                                {val.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="text-red-500">
                        {errors.employementtype?.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="requiredcolleges"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Colleges
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          defaultValue={[]}
                          isMulti
                          id="requiredcolleges"
                          inputId="requiredcolleges"
                          instanceId="requiredcolleges"
                          name="requiredcolleges"
                          as={Select}
                          options={collegelist}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requiredcolleges?.message}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="requirededucation"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Education
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          defaultValue={[]}
                          isMulti
                          id="requirededucation"
                          inputId="requirededucation"
                          instanceId="requirededucation"
                          name="requirededucation"
                          as={Select}
                          options={opportunityeducations}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requirededucation?.message}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="requiredskill"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required skills
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>
                        <Controller
                          defaultValue={[]}
                          isMulti
                          id="requiredskill"
                          inputId="requiredskill"
                          instanceId="requiredskill"
                          name="requiredskill"
                          ignoreAccents={false}
                          as={Select}
                          options={jobskills}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none shadow-none ring-transparent focus:ring-offset-transparent focus:ring-0 "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requiredskill?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="requiredabilities"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Required Competences / Abilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"></span>

                        <Controller
                          defaultValue={[]}
                          isMulti
                          id="requiredabilities"
                          inputId="requiredabilities"
                          instanceId="requiredabilities"
                          name="requiredabilities"
                          as={Select}
                          options={jobcompetencies}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none "
                          styles={useSelectStyles}
                        />
                      </div>
                    </div>
                    <p className="text-red-500">
                      {errors.requiredabilities?.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Roles and Responsbilities
                    </label>
                    <div className="rounded-md shadow-sm">
                      <Controller
                        defaultValue=""
                        className="form-input"
                        name="responsbilities"
                        id="responsbilities"
                        as={
                          <SunEditor
                            setOptions={{
                              height: 200,
                              buttonList: [
                                ["font", "fontColor", "fontSize"],
                                ["bold", "underline", "italic", "strike"],
                                ["-right", "undo", "redo"],
                                [
                                  "blockquote",
                                  "horizontalRule",
                                  "lineHeight",
                                  "list",
                                  "textStyle",
                                  "align",
                                ],
                                ["fullScreen", "image"],
                              ],
                            }}
                          />
                        }
                        control={control}
                        rules={{ required: true }}
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.responsbilities?.message}
                    </p>
                    <p className="mt-2 text-sm text-indigo-500 flex items-end">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="inline-block px-2">
                        Minimum 500 character
                      </span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Job Description
                    </label>
                    <div className="rounded-md shadow-sm">
                      <Controller
                        defaultValue=""
                        className="form-input"
                        name="description"
                        id="description"
                        as={
                          <SunEditor
                            setOptions={{
                              height: 200,
                              buttonList: [
                                ["font", "fontColor", "fontSize"],
                                ["bold", "underline", "italic", "strike"],
                                ["-right", "undo", "redo"],
                                [
                                  "blockquote",
                                  "horizontalRule",
                                  "lineHeight",
                                  "list",
                                  "textStyle",
                                  "align",
                                ],
                                ["fullScreen", "image"],
                              ],
                            }}
                          />
                        }
                        control={control}
                        rules={{ required: true }}
                      />
                    </div>
                    <p className="text-red-500">
                      {errors.description?.message}
                    </p>

                    <p className="mt-2 text-sm text-indigo-500 flex items-end">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="inline-block px-2">
                        Minimum 500 character
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      disabled={!formState.isValid}
                      onClick={(e) => router.push("/vacancies")}
                      type="submit"
                      className={classnames(
                        " inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md  bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out",
                        {
                          "opacity-25 text-gray-300": !formState.isValid,
                        },
                        {
                          "opacity-100 text-white": formState.isValid,
                        },
                      )}
                    >
                      Save
                    </button>
                    <button
                      className=" inline-flex justify-center py-2 px-4 mx-2 border border-transparent text-sm opacity-100 text-white leading-5 font-medium rounded-md  bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-indigo active:bg-red-700 transition duration-150 ease-in-out"
                      type="button"
                      onClick={() =>
                        reset({
                          rid: "",
                          description: "",
                          requirededucation: [],
                          requiredskill: [],
                          requiredabilities: [],
                          requiredcolleges: [],
                        })
                      }
                    >
                      Clear
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

JobopportunityPostings.getLayout = getLayout;

export default JobopportunityPostings;
