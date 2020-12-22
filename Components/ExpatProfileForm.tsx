import React from "react";
import { CommonFormProps } from "../lib/commontypes";
import { useRouter } from "next/router";
import classnames from "classnames";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import Select from "react-select";
import { useSelectStyles } from "../hooks/useHelper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ActiveVacancylistforExpats,
  OptionsDTO,
  OptionsDependentDTO,
} from "../lib/commontypes";
import { yesnooptions } from "../lib/commonlookups";
import gender from "../data/gender";
import FormattedNumber from "react-number-format";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
import { useQuery } from "react-query";
import JobEducations from "../data/jobeducations";
import Countries from "../data/countries";
import Message from "@components/Message";
import replace from "lodash/replace";

const getactivevacancyforexpats = async ({ queryKey }) => {
  const response = await fetch(`/api/getactivevacancyforexpats`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getexpatbyid = async ({ queryKey }) => {
  const [_key, { rid }] = queryKey;
  const response = await fetch(`/api/getexpatbyid?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const getexpatphotoattachment = async (rid: string) => {
  const response = await fetch(`/api/getexpatphotoattachment?rid=${rid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json " },
  });

  const result = await response.json();
  return result;
};

const ExpatProfileForm: React.FC<CommonFormProps> = ({
  rid,
  onFormSubmit,
}: CommonFormProps) => {
  const router = useRouter();
  const [uploadedfilenameonly, setUploadedfilenameonly] = React.useState();

  const {
    isLoading: activevacancyisLoading,
    isError: activevacancyisError,
    data: activevacancydata,
    error: activevacancyerror,
    refetch: activeVacancyRefetch,
    isFetched: activeVacancyisFetched,
  } = useQuery(["getactivevacancyforexpats"], getactivevacancyforexpats, {
    enabled: !!rid,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: expatdetailisLoading,
    isError: expatdetailisError,
    data: expatdetail,
    error: expatdetailerror,
  } = useQuery(["getexpatbyid", { rid }], getexpatbyid, {
    enabled:
      rid !== "" &&
      rid !== process.env.NEXT_PUBLIC_RID_NEW &&
      !!activevacancydata &&
      !!activevacancydata?.data,
    refetchOnWindowFocus: false,
  });

  type ExpatDTO = {
    rid: string;
    vacancy: ActiveVacancylistforExpats;
    expatcode: string;
    isnotinuae: number;
    emiratesid: string;
    englishname: string;
    arabicname: string;
    gender: number;
    dob: Date | string;
    experience: number;
    passportnumber: string;
    unifiednumber: string;
    country: OptionsDTO;
    monthlysalary: number;
    iswithallowance: number;
    education: OptionsDependentDTO;
    matchingcriteria: string;
    photo: object;
  };

  type ExpatSaveDTO = {
    photofilename: string;
    photocontentconverted: string;
  } & ExpatDTO;

  const expatschema = yup.object().shape({
    rid: yup.string().required("rid must be initialized"),
    vacancy: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required("Vacancy is mandatory"),

    isnotinuae: yup
      .number()
      .min(1, "This field is not mandatory")
      .required("This field is mandatory"),

    emiratesid: yup
      .mixed()
      .test("length", "Emirates ID must be 15 digits", (val) => {
        return getValues("isnotinuae") == 1 &&
          replace(
            replace(val.toString(), new RegExp("-", "g"), ""),
            new RegExp(" ", "g"),
            "",
          ).length === 15
          ? true
          : false;
      })
      .test("required", "Emirates ID is mandatory", (value) => {
        if (
          getValues("isnotinuae") == 1 &&
          (value == null || value == undefined || value == 0)
        )
          return false;
        return true;
      }),
    englishname: yup.string().required("Name in english is mandatory"),
    arabicname: yup.string().required("Name in arabic is mandatory"),
    passportnumber: yup.string().required("Passport number is mandatory"),
    unifiednumber: yup.string().required("Unified number is mandatory"),
    gender: yup
      .number()
      .min(1, "gender is mandatory")
      .required("gender is mandatory"),
    dob: yup.string().required("Date of birth is mandatory"),
    experience: yup.number().required("Experience is mandatory"),
    country: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.number().required(),
      })
      .required("Country  is mandatory"),

    iswithallowance: yup
      .number()
      .min(1, "This field is not mandatory")
      .required("This field is mandatory"),

    education: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required("Education  is mandatory"),

    matchingcriteria: yup
      .string()
      .min(50, "minimum 50 character")
      .max(200, "maximum 200 character")
      .required("Matching criteria is mandatory"),

    photo: yup
      .mixed()
      .test("fileSize", "Invalid photo", (value) => {
        if (isUndefined(value[0]) || !value.length) return false;
        else return value && value[0].size <= 2000000;
      })
      .test("type", "only GIF , PNG, JPEG , JPG supported", (value) => {
        if (isUndefined(value[0])) return false;
        return (
          value &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/gif")
        );
      }),
  });

  const expatmethods = useForm<ExpatDTO>({
    mode: "onChange",
    resolver: yupResolver(expatschema),
    defaultValues: {
      rid: rid || "",
      vacancy: {},
      expatcode: "",
      isnotinuae: 0,
      emiratesid: "",
      englishname: "",
      arabicname: "",
      gender: 0,
      dob: "",
      experience: 0,
      passportnumber: "",
      unifiednumber: "",
      country: {},
      monthlysalary: 0,
      iswithallowance: 0,
      education: {},
      matchingcriteria: "",
      photo: undefined,
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
  } = expatmethods;

  const watchisnotinuae = watch("isnotinuae");
  const watchphoto = watch("photo");

  const onExpatSubmit = async ({
    rid,
    vacancy,
    expatcode,
    isnotinuae,
    emiratesid,
    englishname,
    arabicname,
    gender,
    dob,
    experience,
    passportnumber,
    unifiednumber,
    country,
    monthlysalary,
    iswithallowance,
    education,
    matchingcriteria,
    photo,
  }) => {
    let payload: ExpatSaveDTO = {
      rid,
      vacancy,
      expatcode,
      isnotinuae,
      emiratesid: replace(emiratesid, new RegExp("-", "g"), ""),
      englishname,
      arabicname,
      gender,
      dob: new Date(dob).toISOString().slice(0, 10),
      experience,
      passportnumber,
      unifiednumber,
      country,
      monthlysalary: replace(monthlysalary, new RegExp(",", "g"), ""),
      iswithallowance,
      education,
      matchingcriteria,
      photo,
      photofilename: "",
      photocontentconverted: "",
    };

    if (photo != undefined && photo != null && photo[0] != undefined) {
      var uploadedfile = photo[0];
      payload.photocontentconverted = (await getBase64(uploadedfile)) as string;
      payload.photofilename = uploadedfile.name.toLowerCase();
    } else {
      payload.photofilename = uploadedfilenameonly;
    }

    if (isUndefined(payload.expatcode)) payload.expatcode = "";

    const { photo: excludedprop, ...saveobject } = payload;

    const response = await fetch("/api/saveexpat", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(saveobject),
    });

    if (response.ok) {
      cogoToast.success(
        <Message title="Success" text="saved successfully" type="success" />,
        {
          position: "bottom-center",
        },
      );
      return router.push("/expats");
    } else {
      return cogoToast.error(
        <Message
          title="Error"
          text="something went wrong while saving, we are looking into issue. Please try some time later"
          type="error"
        />,
        {
          position: "bottom-center",
        },
      );
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          try {
            var regex = /^.*\.(pdf|PDF|JPEG|jpeg|JPG|jpg|PNG|png|DOC|doc|DOCX|docx)$/;
            if (regex.test(file.name.toLowerCase())) {
              return resolve(reader.result);
            } else {
              return reject(undefined);
            }
          } catch (e) {
            return reject(undefined);
          }
        };
        reader.onerror = function (error) {
          return reject(undefined);
        };
      } catch (e) {
        return reject(e);
      }
    });
  };

  const downloadfile = (filedata, filename) => {
    const linkSource = filedata;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = filename;
    downloadLink.click();
  };

  const ondownloadclick = () => {
    getexpatphotoattachment(rid)
      .then(({ data }) => {
        if (!isEmpty(data.filename) && !isEmpty(data.filedata)) {
          downloadfile(data.filedata, data.filename);
        } else {
          return cogoToast.error(
            <Message title="Error" text="file not found" type="error" />,
            {
              position: "bottom-center",
            },
          );
        }
      })
      .catch(({ data }) => {
        return cogoToast.error(
          <Message
            title="Error"
            text="something went wrong while saving, we are looking into issue. Please try some time later"
            type="error"
          />,
          {
            position: "bottom-center",
          },
        );
      });
  };

  React.useEffect(() => {
    trigger("emiratesid");
  }, [watchisnotinuae]);

  React.useEffect(() => {
    if (!isUndefined(watchphoto) && !isEmpty(watchphoto))
      setUploadedfilenameonly(undefined);
  }, [watchphoto]);

  React.useEffect(() => {
    if (expatdetail != undefined && expatdetail.data != undefined) {
      const { data: expatsdefaultvalues } = expatdetail;

      setValue("expatcode", expatsdefaultvalues?.expatcode);
      setValue("isnotinuae", expatsdefaultvalues?.isnotinuae);
      setValue("emiratesid", expatsdefaultvalues?.emiratesid);
      setValue("englishname", expatsdefaultvalues?.englishname);
      setValue("arabicname", expatsdefaultvalues?.arabicname);
      setValue("gender", expatsdefaultvalues?.gender);
      setValue("dob", new Date(expatsdefaultvalues?.dob));
      setValue("experience", expatsdefaultvalues?.experience);
      setValue("passportnumber", expatsdefaultvalues?.passportnumber);
      setValue("unifiednumber", expatsdefaultvalues?.unifiednumber);
      setValue("country", expatsdefaultvalues?.country);
      setValue("monthlysalary", expatsdefaultvalues.monthlysalary);
      setValue("iswithallowance", expatsdefaultvalues?.iswithallowance);
      setValue("education", expatsdefaultvalues?.education);
      setValue("matchingcriteria", expatsdefaultvalues?.matchingcriteria);

      //local react state for upload only
      setUploadedfilenameonly(expatsdefaultvalues?.photofilename);
      try {
        setValue("vacancy", expatsdefaultvalues?.vacancy);
      } catch (e) {
        console.log("check vacancy selection");
      }
    }
  }, [expatdetail]);

  return (
    <React.Fragment>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <FormProvider {...expatmethods}>
            <form onSubmit={handleSubmit(onExpatSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <input
                        type="hidden"
                        id="rid"
                        name="rid"
                        value={rid || ""}
                        ref={register}
                      />
                      <label
                        htmlFor="vacancy"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Vacancy
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        {activeVacancyisFetched && (
                          <Controller
                            defaultValue={{}}
                            id="vacancy"
                            inputId="vacancy"
                            instanceId="vacancy"
                            name="vacancy"
                            as={Select}
                            options={activevacancydata?.data}
                            isLoading={activevacancyisLoading}
                            control={control}
                            rules={{ required: true }}
                            isClearable="true"
                            isDisabled={
                              rid !== "" &&
                              rid !== process.env.NEXT_PUBLIC_RID_NEW
                            }
                            className="w-full rounded-none ring-0"
                            styles={useSelectStyles}
                          />
                        )}
                      </div>
                      <p className="text-red-500">{errors.vacancy?.message}</p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="expatcode"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Expat Code
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          disabled
                          name="expatcode"
                          id="expatcode"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                          placeholder="To be generated"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.expatcode?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="isnotinuae"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Is candidate in U.A.E ?
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="isnotinuae"
                          id="isnotinuae"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {yesnooptions &&
                            yesnooptions.map((val, index) => (
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
                        {errors.isnotinuae?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="emiratesid"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Emirates ID
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={""}
                          id="emiratesid"
                          name="emiratesid"
                          allowNegative={false}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={([{ value }]) => {
                            return value;
                          }}
                          format="###-####-#######-#"
                          as={<FormattedNumber />}
                          control={control}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.emiratesid?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="englishname"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        English Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="englishname"
                          id="englishname"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter english name"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.englishname?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="arabicname"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Arabic Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="arabicname"
                          id="arabicname"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter arabic name"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.arabicname?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="passportnumber"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Passport Number
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="passportnumber"
                          id="passportnumber"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter passport number"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.passportnumber?.message}
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="unifiednumber"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Unified Number
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <input
                          name="unifiednumber"
                          id="unifiednumber"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter Unified number"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.unifiednumber?.message}
                      </p>
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
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <Controller
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="dob"
                          id="dob"
                          control={control}
                          render={({ onChange, value }) => (
                            <DatePicker
                              dateFormat="yyyy-MM-dd"
                              selected={value}
                              onChange={onChange}
                              className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          )}
                        />
                      </div>
                      <p className="text-red-500">{errors.dob?.message}</p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Experience
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={""}
                          id="experience"
                          name="experience"
                          allowNegative={false}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={([{ value }]) => {
                            return value;
                          }}
                          format="##"
                          as={<FormattedNumber />}
                          control={control}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.experience?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Monthly Salary
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>
                        <Controller
                          defaultValue={""}
                          id="monthlysalary"
                          name="monthlysalary"
                          maxLength={10}
                          allowNegative={false}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={([{ value }]) => {
                            return value;
                          }}
                          as={<FormattedNumber thousandSeparator={true} />}
                          control={control}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.monthlysalary?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="iswithallowance"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Is Monthly salary includes all allowances ?
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <select
                          name="iswithallowance"
                          id="iswithallowance"
                          ref={register}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                        >
                          <option value="0" className="text-gray-500 ">
                            --Select--
                          </option>
                          {yesnooptions &&
                            yesnooptions.map((val, index) => (
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
                        {errors.iswithallowance?.message}
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-3 ">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Country
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={{}}
                          id="country"
                          inputId="country"
                          instanceId="country"
                          name="country"
                          as={Select}
                          options={Countries}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none ring-0"
                          styles={useSelectStyles}
                        />
                      </div>
                      <p className="text-red-500">{errors.country?.message}</p>
                    </div>

                    <div className="col-span-12 sm:col-span-6 ">
                      <label
                        htmlFor="education"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Education
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <Controller
                          defaultValue={{}}
                          id="education"
                          inputId="education"
                          instanceId="education"
                          name="education"
                          as={Select}
                          options={JobEducations}
                          control={control}
                          rules={{ required: true }}
                          isClearable="true"
                          className="w-full rounded-none ring-0"
                          styles={useSelectStyles}
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.education?.message}
                      </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <label
                        htmlFor="matchingcriteria"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Enter key matching criteria for selecting candidate for
                        vacancy
                      </label>

                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"></span>

                        <textarea
                          name="matchingcriteria"
                          id="matchingcriteria"
                          ref={register}
                          className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter matching criteria"
                        />
                      </div>
                      <p className="text-red-500">
                        {errors.matchingcriteria?.message}
                      </p>
                      <p className="mt-2 text-sm text-indigo-500 flex items-start">
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
                        <span className="inline-flex flex-col">
                          <span className="inline-block px-2">
                            In maximum 200 character provide key skills and
                            abilities of entered candidate which you were not
                            able to find with registered HRA jobseeker profiles.
                          </span>
                          <span className="inline-block px-2">
                            Your input will be help us to upskill HRA joseekers
                            accordingly for future interviews.
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="jobdescription"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Photo
                      </label>
                      {uploadedfilenameonly && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                          {uploadedfilenameonly}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              ondownloadclick();
                            }}
                            type="button"
                            className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                            aria-label="download attachement"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              setValue("photo", undefined);
                              clearErrors("photo");
                              setUploadedfilenameonly(undefined);
                            }}
                            type="button"
                            className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                            aria-label="Remove attachement"
                          >
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                      {!isUndefined(watchphoto) && !isEmpty(watchphoto) && (
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                          {!isUndefined(watchphoto) && !isEmpty(watchphoto)
                            ? watchphoto[0].name
                            : "Not selected"}
                          <button
                            onClick={(e) => {
                              setValue("photo", undefined);
                              clearErrors("photo");
                            }}
                            type="button"
                            className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
                            aria-label="Remove large badge"
                          >
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                      <div className="mt-2 max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="space-y-1 text-center ">
                            <p className="text-sm text-gray-600">
                              <input
                                id="photo"
                                name="photo"
                                type="file"
                                ref={register}
                                className="inline-flex w-full border border-gray-300 rounded-r-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="select file"
                                aria-label="select file"
                                accept=".jpg, .jpeg, .png,.gif"
                              />
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Accepted file formats are PDF,doc,docx to 2MB
                            </p>
                          </div>
                        </div>
                        <p className="text-red-500">{errors.photo?.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <span className="inline-flex rounded-md shadow-sm justify-between">
                    <button
                      disabled={!formState.isValid}
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
                          rid: rid,
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

export default ExpatProfileForm;
