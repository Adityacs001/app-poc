import * as React from "react";
import tw, { styled, css } from "twin.macro";
import {
  EmojiHappyIcon,
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  EmojiSadIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/solid";

import { UserGroupIcon, BriefcaseIcon, XIcon } from "@heroicons/react/outline";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveFunnel } from "@nivo/funnel";
import logo from "../public/images/logo.png";
import Image from "next/image";
import { Listbox, Transition, Dialog, Menu } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronDoubleRightIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import { List, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
const publishingOptions = [
  {
    id: 1,
    title: "SSD",
    description: "Support Service Director Dashboard.",
    current: true,
    reportduration: "October-2021",
    performance: "50%",
    performancedrop: "10%",
    isperformanceup: true,
    happiness: "good",
    units: [
      {
        id: 1,
        name: "HR Dept.",
        stat: "80%",
        change: "12%",
        changeType: "increase",
        employees: 12,
        projects: 2,
        team: [
          {
            id: 1,
            employeeno: "735",
            name: "Darwish Abdulla Musalam Alqubaisi ",
            title: "Acting HR Manager",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 2,
            employeeno: "10111",
            name: "Amal Bushra Al Awad Al Alawi",
            title: "Employee Relation Specialist",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 3,
            employeeno: "10339",
            name: "Saif Salem Ahmed Al Ali",
            title: "Acting Employee Relation Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 4,
            employeeno: "10234",
            name: "Fatima Ali Ibrahim Al Zaabi",
            title: "Employee Relation Senior Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 5,
            employeeno: "10333",
            name: "Saeed Sanad Saeed Fraih Al Qubaisi",
            title: "Employee Relations Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 6,
            employeeno: "10361",
            name: "Ahmed Mohamed Khalil Ibrahim Al Hosani",
            title: "Acting Recruitment Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 7,
            employeeno: "813",
            name: "Mouza Surour Omair AlMashghouni",
            title: "Senior Recruitment Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 8,
            employeeno: "308",
            name: "Mariam Ali Rashed  AlHameli",
            title: "Section Head of Training and Development ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 9,
            employeeno: "10254",
            name: "Mozah Naji Saleh Al Dosari",
            title: "Training and Development Specialist  ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 10,
            employeeno: "824",
            name: "Ebtisam Salmeen Mubarak AlNeyadi",
            title: "Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10135",
            name: "Mohamed Omar Mohamed Bu Futaim",
            title: "Training and Development Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10193",
            name: "Khadeeja Butti Salem AlBeloushi",
            title: "Training and Development Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "IT Dept.",
        stat: "80%",
        change: "2%",
        changeType: "increase",
        employees: 8,
        projects: 2,
        team: [
          {
            id: 1,
            employeeno: "10329",
            name: "Saeed Ali Suleiman Al Sharji",
            title: "A/ IT Department Manager",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },

          {
            id: 3,
            employeeno: "10274",
            name: "Shareefa Mohamed Ahmed Al Hashmi",
            title: "Systems Specialist ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 4,
            employeeno: "10373",
            name: "Mussa Amer Abdulla Yousef Al Saadi",
            title: "Information Security Senior Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 5,
            employeeno: "10230",
            name: "Shamsa Mohammed Nassib Al Nuaimi",
            title: "Data Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 6,
            employeeno: "10287",
            name: "Abdulla Salman Hussain Al Hammadi",
            title: "Information Solutions Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 7,
            employeeno: "10150",
            name: "Mariam Mohamed Naser Dayan",
            title: "Information Solutions Specialist ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 8,
            employeeno: "10371",
            name: "Saeed Rashed Hamad Al Rashdi",
            title: "Information Solutions Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "GS Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 16,
        projects: 2,
      },
      {
        id: 4,
        name: "Finance Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 7,
        projects: 2,
      },
      {
        id: 5,
        name: "Legal Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 3,
        projects: 2,
      },
    ],
    achievements: [
      {
        id: 1,
        title: "HRA Ops ( Information Solutions Section )",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Talent management",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "Closing the financial statements for the year 2020 with the external auditor",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title:
          "Completion of the I supply project with the Department of Finance",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title: "SSA and POD Portals ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
    ],
    challenges: [
      {
        id: 1,
        title:
          "Number of manpower on the operation less than  bassline Current IT department.",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Structure is not meeting the HRA departments and sector needs ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "The housing loan deduction has not been resolved in the Oracle system by the Department of Finance according to the new payroll system",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title:
          "The budget for the entitlements of the deceased in CDP has been approved in 2021 and has been spent from yet. ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title:
          "Transferees’ budget have not been transferred and their salaries have been paid from the career development program budget for August and September 2021",
        department: "Finance",
        sector: "SS",
        type: "project",
      },
    ],
    improvements: [
      {
        id: 1,
        title:
          "Implementing agile approach for the solutions section for deliveries  ( application)",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Revamp the strategic plan for the IT department ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "Following up with departments constantly on complying with the expenditure plan. ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title: "Following up with the transfer of transfers’ budget ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title:
          "Following up with departments on strategic projects and adherence to the approved expenditure plan",
        department: "Finance",
        sector: "SS",
        type: "project",
      },
    ],
    projects: [
      {
        id: 1,
        title: "Performance Assessment Framework ",
        reportdate: "21-Sep-2021",
        currentstatus: "risk",
        target: "75%",
        actual: "2 %",
        totalbudget: "3,000,00",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Amal  Al Marzooqi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 14,
        completedmilestone: 0,
        code: "1.1.1.1",
        summary:
          'Scope of work is finalized and RFP prepared and ready to be sent to procurement. Change request to be shared & reviewed due to the fact the budget is approved for 2022.this project depends on "Cascading Aspirations to ADGE - Employees (AD Values)" project since the values will be embedded in competency framework which is part of Performance Assessment framework',
      },
      {
        id: 2,
        title: "Contractual employment relationship based on performance ",
        reportdate: "13-Sep-2021",
        currentstatus: "risk",
        target: "33 %",
        actual: "2 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Salem Al Nuaimi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 4,
        completedmilestone: 0,
        code: "1.1.1.2",
        summary: "",
      },
      {
        id: 3,
        title: "Government Employee Rationalization to Enhance Productivity",
        reportdate: "13-Sep-2021",
        currentstatus: "delayed",
        target: "33 %",
        actual: "2 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Salem Al Nuaimi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 4,
        completedmilestone: 0,
        code: "1.1.1.3",
        summary: "",
      },
      {
        id: 4,
        title: "Long-Term Succession Plan for AD Government",
        reportdate: "12-Sep-2021",
        currentstatus: "delayed",
        target: "100 %",
        actual: "95 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Noura Al Saadi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 2,
        completedmilestone: 1,
        code: "1.1.2.2",
        summary: "",
      },
      {
        id: 5,
        title: "High Potential Talent Management Plan",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "98 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Noura Al Saadi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 5,
        completedmilestone: 4,
        code: "1.1.2.3",
        summary: "",
      },
      {
        id: 6,
        title: "Jobseeker Portal Revamp",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "88 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Saif Al Menhali",
        sector: "Strategy",
        department: "Recruitment Department",
        totalmilestone: 9,
        completedmilestone: 2,
        code: "1.1.2.4",
        summary: "",
      },
      {
        id: 7,
        title: "HR Data Enhancement",
        reportdate: "12-Sep-2021",
        currentstatus: "risk",
        target: "33 %",
        actual: "88 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Mohamed Al Ketbi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 6,
        completedmilestone: 4,
        code: "1.1.4.1",
        summary: "",
      },
      {
        id: 8,
        title: "HR Data Automation and Integration",
        reportdate: "12-Sep-2021",
        currentstatus: "risk",
        target: "100 %",
        actual: "0 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Mohamed Al Ketbi",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 8,
        completedmilestone: 6,
        code: "1.1.4.2",
        summary: "",
      },
      {
        id: 9,
        title: "Whole of Government Culture Transformation",
        reportdate: "12-Sep-2021",
        currentstatus: "risk",
        target: "100 %",
        actual: "0 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Essame Alsayed",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 12,
        completedmilestone: 6,
        code: "1.3.1.1",
        summary: "",
      },
      {
        id: 10,
        title: "Employee Wellbeing Support Framework ",
        reportdate: "12-Sep-2021",
        currentstatus: "risk",
        target: "100 %",
        actual: "0 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Dr. Mouza Al Dhaheri",
        sector: "Strategy",
        department: "Strategy",
        totalmilestone: 10,
        completedmilestone: 8,
        code: "1.3.2.1",
        summary: "",
      },
      {
        id: 11,
        title: "Develop and launch an online LLLP Portal (My Future Portal) ",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "100 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Asma Yaaqoub",
        sector: "Manpower",
        department: "Government Partnerships Department",
        totalmilestone: 12,
        completedmilestone: 12,
        code: "26",
        summary: "",
      },
      {
        id: 12,
        title: "Develop workforce and labor market analytical tool",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "100 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Saeed Al Muhairi",
        sector: "Manpower",
        department: "Government Partnerships Department",
        totalmilestone: 12,
        completedmilestone: 12,
        code: "27",
        summary: "",
      },
      {
        id: 13,
        title: "Jobseeker Matching & Support Center",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "63 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Saeed Al Muhairi",
        sector: "Manpower",
        department: "Government Partnerships Department",
        totalmilestone: 9,
        completedmilestone: 7,
        code: "28",
        summary: "",
      },
      {
        id: 14,
        title: "Employability & train-for-hire programs",
        reportdate: "12-Sep-2021",
        currentstatus: "ontrack",
        target: "100 %",
        actual: "42 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Khawla Al Hamadi",
        sector: "Manpower",
        department: "Government Partnerships Department",
        totalmilestone: 14,
        completedmilestone: 12,
        code: "29",
        summary: "",
      },
      {
        id: 15,
        title: "Cascading Aspirations to ADGE - Employees (AD Values)",
        reportdate: "12-Sep-2021",
        currentstatus: "risk",
        target: "100 %",
        actual: "42 %",
        totalbudget: "0",
        spent: "0",
        spentpercentage: "0 %",
        duration: "3 Years",
        projectmanager: "Esam Al Sayed",
        sector: "Manpower",
        department: "Government Partnerships Department",
        totalmilestone: 14,
        completedmilestone: 12,
        code: "32",
        summary: "",
      },
    ],
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
  {
    id: 2,
    title: "HR",
    description: "Human Resources Department",
    current: false,
    reportduration: "October-2021",
    performance: "50%",
    performancedrop: "10%",
    isperformanceup: true,
    happiness: "good",
    units: [
      {
        id: 1,
        name: "HR Dept.",
        stat: "80%",
        change: "12%",
        changeType: "increase",
        employees: 12,
        projects: 2,
        team: [
          {
            id: 1,
            employeeno: "735",
            name: "Darwish Abdulla Musalam Alqubaisi ",
            title: "Acting HR Manager",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 2,
            employeeno: "10111",
            name: "Amal Bushra Al Awad Al Alawi",
            title: "Employee Relation Specialist",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 3,
            employeeno: "10339",
            name: "Saif Salem Ahmed Al Ali",
            title: "Acting Employee Relation Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 4,
            employeeno: "10234",
            name: "Fatima Ali Ibrahim Al Zaabi",
            title: "Employee Relation Senior Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 5,
            employeeno: "10333",
            name: "Saeed Sanad Saeed Fraih Al Qubaisi",
            title: "Employee Relations Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 6,
            employeeno: "10361",
            name: "Ahmed Mohamed Khalil Ibrahim Al Hosani",
            title: "Acting Recruitment Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 7,
            employeeno: "10361",
            name: "Mouza Surour Omair AlMashghouni",
            title: "Senior Recruitment Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 8,
            employeeno: "308",
            name: "Mariam Ali Rashed  AlHameli",
            title: "Section Head of Training and Development ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 9,
            employeeno: "10254",
            name: "Mozah Naji Saleh Al Dosari",
            title: "Training and Development Specialist  ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 10,
            employeeno: "824",
            name: "Ebtisam Salmeen Mubarak AlNeyadi",
            title: "Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10135",
            name: "Mohamed Omar Mohamed Bu Futaim",
            title: "Training and Development Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10193",
            name: "Khadeeja Butti Salem AlBeloushi",
            title: "Training and Development Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "IT Dept.",
        stat: "80%",
        change: "2%",
        changeType: "increase",
        employees: 8,
        projects: 2,
      },
      {
        id: 3,
        name: "GS Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 16,
        projects: 2,
      },
      {
        id: 4,
        name: "Finance Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 7,
        projects: 2,
      },
      {
        id: 5,
        name: "Legal Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 3,
        projects: 2,
      },
    ],
    achievements: [],
    challenges: [],
    improvements: [],
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
  {
    id: 3,
    title: "IT",
    description: "Information Techology Department",
    current: false,
    reportduration: "October-2021",
    performance: "50%",
    performancedrop: "10%",
    isperformanceup: true,
    happiness: "good",

    units: [
      {
        id: 1,
        name: "HR Dept.",
        stat: "80%",
        change: "12%",
        changeType: "increase",
        employees: 12,
        projects: 2,
        team: [
          {
            id: 1,
            employeeno: "735",
            name: "Darwish Abdulla Musalam Alqubaisi ",
            title: "Acting HR Manager",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 2,
            employeeno: "10111",
            name: "Amal Bushra Al Awad Al Alawi",
            title: "Employee Relation Specialist",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 3,
            employeeno: "10339",
            name: "Saif Salem Ahmed Al Ali",
            title: "Acting Employee Relation Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 4,
            employeeno: "10234",
            name: "Fatima Ali Ibrahim Al Zaabi",
            title: "Employee Relation Senior Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 5,
            employeeno: "10333",
            name: "Saeed Sanad Saeed Fraih Al Qubaisi",
            title: "Employee Relations Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 6,
            employeeno: "10361",
            name: "Ahmed Mohamed Khalil Ibrahim Al Hosani",
            title: "Acting Recruitment Section Head ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 7,
            employeeno: "10361",
            name: "Mouza Surour Omair AlMashghouni",
            title: "Senior Recruitment Analyst ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 8,
            employeeno: "308",
            name: "Mariam Ali Rashed  AlHameli",
            title: "Section Head of Training and Development ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 9,
            employeeno: "10254",
            name: "Mozah Naji Saleh Al Dosari",
            title: "Training and Development Specialist  ",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 10,
            employeeno: "824",
            name: "Ebtisam Salmeen Mubarak AlNeyadi",
            title: "Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10135",
            name: "Mohamed Omar Mohamed Bu Futaim",
            title: "Training and Development Senior Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
          {
            id: 11,
            employeeno: "10193",
            name: "Khadeeja Butti Salem AlBeloushi",
            title: "Training and Development Analyst",
            projects: 1,
            tasks: 1,
            kpi: [
              {
                id: 1,
                title: "Some KPI",
                status: true,
              },
              {
                id: 2,
                title: "Some KPI",
                status: false,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "IT Dept.",
        stat: "80%",
        change: "2%",
        changeType: "increase",
        employees: 8,
        projects: 2,
      },
      {
        id: 3,
        name: "GS Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 16,
        projects: 2,
      },
      {
        id: 4,
        name: "Finance Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 7,
        projects: 2,
      },
      {
        id: 5,
        name: "Legal Dept.",
        stat: "80%",
        change: "4.05%",
        changeType: "decrease",
        employees: 3,
        projects: 2,
      },
    ],
    achievements: [
      {
        id: 1,
        title: "HRA Ops ( Information Solutions Section )",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Talent management",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "Closing the financial statements for the year 2020 with the external auditor",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title:
          "Completion of the I supply project with the Department of Finance",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title: "SSA and POD Portals ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
    ],
    challenges: [
      {
        id: 1,
        title:
          "Number of manpower on the operation less than  bassline Current IT department.",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Structure is not meeting the HRA departments and sector needs ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "The housing loan deduction has not been resolved in the Oracle system by the Department of Finance according to the new payroll system",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title:
          "The budget for the entitlements of the deceased in CDP has been approved in 2021 and has been spent from yet. ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title:
          "Transferees’ budget have not been transferred and their salaries have been paid from the career development program budget for August and September 2021",
        department: "Finance",
        sector: "SS",
        type: "project",
      },
    ],
    improvements: [
      {
        id: 1,
        title:
          "Implementing agile approach for the solutions section for deliveries  ( application)",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 2,
        title: "Revamp the strategic plan for the IT department ",
        department: "IT",
        sector: "SS",
        type: "project",
      },
      {
        id: 3,
        title:
          "Following up with departments constantly on complying with the expenditure plan. ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 4,
        title: "Following up with the transfer of transfers’ budget ",
        department: "Finance",
        sector: "SS",
        type: "task",
      },
      {
        id: 5,
        title:
          "Following up with departments on strategic projects and adherence to the approved expenditure plan",
        department: "Finance",
        sector: "SS",
        type: "project",
      },
    ],
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
  {
    id: 4,
    title: "GS",
    description: "General Service Department",
    current: false,
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
  {
    id: 5,
    title: "Finance",
    description: "Finance Department",
    current: false,
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
  {
    id: 6,
    title: "Legal",
    description: "Legal Department",
    current: false,
    vision:
      "To be the strategic technical partner of the Human Resources Authority by providing innovative technical services in the field of human resource management.",
  },
];

const StyledLayout = styled.div`
  background-image: url("/images/bg-light.png");
  ${() => tw`px-2 py-0.5 bg-repeat `}
`;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const stats = [
  {
    name: "HR Dept.",
    stat: "80%",
    previousStat: "70,946",
    change: "12%",
    changeType: "increase",
  },
  {
    name: "IT Dept.",
    stat: "80%",
    previousStat: "56.14%",
    change: "2%",
    changeType: "increase",
  },
  {
    name: "GS Dept.",
    stat: "80%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
  {
    name: "Finance Dept.",
    stat: "80%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
  {
    name: "Legal Dept.",
    stat: "80%",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
];

const barData = [
  {
    project: "Projects",
    planned: 7,
    plannedColor: "#D1D5DB",
    pending: 10,
    pendingColor: "#9CA3AF",
    delayed: 5,
    delayedColor: "#6B7280",
    completed: 10,
    completedColor: "#4B5563",
  },
];

const barcolors = {
  planned: "#B38920",
  pending: "#6E6A69",
  delayed: "#9CB6D3",
  completed: "#10B981",
};
const getBarColor = (item) => barcolors[item.id];

const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["planned", "pending", "delayed", "completed"]}
    indexBy="project"
    margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    valueFormat={{ format: "", enabled: false }}
    colors={getBarColor}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Strategy ",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Total",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const pieData = [
  {
    id: "total",
    label: "total",
    value: 65,
    color: "hsl(42, 46%, 46%)",
  },
  {
    id: "received",
    label: "received",
    value: 30,
    color: "hsl(9, 3%, 57%)",
  },
  {
    id: "notreceived",
    label: "notreceived",
    value: 22,
    color: "hsl(208, 45%, 61%)",
  },
  {
    id: "underprocess",
    label: "underprocess",
    value: 13,
    color: "#EE2F3F",
  },
];

const piecolors = {
  total: "#B38920",
  received: "#6E6A69",
  notreceived: "#9CB6D3",
  underprocess: "#FBBF24",
};
const getPieColor = (item) => piecolors[item.id];

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    colors={getPieColor}
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

const funnelData = [
  {
    id: "total",
    value: "31798000.00",
    label: "Total Budget",
  },
  {
    id: "planned",
    value: "17876877.83",
    label: "Planned",
  },
  {
    id: "spent",
    value: 13921122.17,
    label: "spent",
  },
];

const colors = { total: "#B38920", planned: "#6E6A69", spent: "#9CB6D3" };
const getColor = (item) => colors[item.id];

const MyResponsiveFunnel = ({ data }) => (
  <ResponsiveFunnel
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    valueFormat=">-.4s"
    colors={getColor}
    fillOpacity={0.8}
    borderWidth={20}
    labelColor={{ from: "color", modifiers: [["darker", 5]] }}
    beforeSeparatorLength={100}
    beforeSeparatorOffset={20}
    afterSeparatorLength={100}
    afterSeparatorOffset={20}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
);

const kpidata = [
  {
    title: "Decile of government institutions in organizational health",
    dpeartment:
      "Abu Dhabi Centre for Government Leadership Sector/Employee Development and Programs Department ",
    planned: "63 %",
    actual: "60 %",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Emiratization Rate across ADGEs’",
    dpeartment:
      "Manpower Development and Management Sector / Recruitment Department",
    planned: "80 %",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Emiratization Rate across ADGCs’",
    dpeartment:
      "Manpower Development and Management Sector / Recruitment Department",

    planned: "37 %",
    actual: "NA %",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Job opportunities for Nationals in ADGEs, ADGCs",
    dpeartment:
      "Manpower Development and Management Sector / Recruitment Department",

    planned: "14,278",
    actual: "NA",
    subtitle:
      "Empower national talent in Abu Dhabi via employment support and lifelong learning",
  },
  {
    title: "Labor productivity of the public sector",
    dpeartment: "NA",
    planned: "NA",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Job portal hit rate ",
    dpeartment:
      "Manpower Development and Management Sector / Recruitment Department",

    planned: "30 %",
    actual: "NA",
    subtitle:
      "Empower national talent in Abu Dhabi via employment support and lifelong learning",
  },
  {
    title: "Total number of jobseekers employed ",
    dpeartment:
      "Manpower Development and Management Sector / Government Partnerships Department ",

    planned: "3,310",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Employees with objectives ",
    dpeartment:
      "Abu Dhabi Centre for Government Leadership Sector/Employee Development and Programs Department ",
    planned: "NA",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Employee Turnover Rate",
    dpeartment:
      "Human Resources Strategic Planning Sector /Human Resources Strategic Planning Department ",
    planned: "6.4 %",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Employees Conducting Work Remotely",
    dpeartment:
      "Human Resources Strategic Planning Sector /Human Resources Strategic Planning Department ",

    planned: "Per Covid 19 Circular",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Employee Perception of Remote Work",
    dpeartment:
      "Human Resources Strategic Planning Sector /Human Resources Strategic Planning Department ",

    planned: "NA",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Coverage of Critical Roles",
    dpeartment:
      "Abu Dhabi Centre for Government Leadership Sector / Employee Development and Programs Department",
    planned: "NA",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title:
      "Critical gov. positions vacant or filled by expat % of all critical government positions (HRA).",
    dpeartment:
      "Abu Dhabi Centre for Government Leadership Sector / Employee Development and Programs Department",
    planned: "NA",
    actual: "NA",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
  {
    title: "Job Postings of HRA Unified Job portal ",
    dpeartment:
      "Manpower Development and Management Sector / Recruitment Department",

    planned: " 9,265 ",
    actual: " 7,410 ",
    subtitle:
      "Become a trusted, high-performing government that consistently delivers, powered at the core by its competent people",
  },
];

const SSD = () => {
  const [selected, setSelected] = React.useState(publishingOptions[0]);
  const [openEmployees, setOpenEmployees] = React.useState(false);
  const [employeeslist, setEmployeelist] = React.useState([]);
  const [selectedunit, setSelectedunit] = React.useState();

  const [openprojects, setOpenprojects] = React.useState(false);
  const [projectlist, setProjectlist] = React.useState([]);

  const EmployeeSideCard = () => {
    return (
      <Transition.Root show={openEmployees} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpenEmployees}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-gray-200 bg-opacity-90" />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-lg">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          <p>{selectedunit?.name} </p>
                          <p className="text-sm font-normal text-gray-400">
                            Total {selectedunit?.employees} Employees
                          </p>
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:ring-2 focus:ring-gray-500"
                            onClick={() => setOpenEmployees(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="flex-1 overflow-y-auto divide-y divide-gray-200">
                      {!!selectedunit &&
                        !!selectedunit?.team &&
                        selectedunit?.team?.map((person) => (
                          <li key={person.id}>
                            <div className="relative flex items-center px-5 py-6 group">
                              <p className="flex-1 block p-1 -m-1">
                                <div
                                  className="absolute inset-0 group-hover:bg-transparent"
                                  aria-hidden="true"
                                />
                                <div className="relative flex items-center flex-1 min-w-0">
                                  <span className="relative flex-shrink-0 inline-block">
                                    <div
                                      className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full "
                                      style={{
                                        backgroundImage: `url(/images/employees/${person.employeeno}.png) , url(/images/employees/${person.employeeno}.jpg) , url(/images/user.png)`,
                                      }}
                                    ></div>
                                  </span>
                                  <div className="ml-4 truncate">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {person.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {person.title}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-start mt-2 space-x-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                    <svg
                                      className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    <span className="inline-block px-1">
                                      {person.projects}
                                    </span>
                                    <span>Projects</span>
                                  </span>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                    <svg
                                      className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-400"
                                      fill="currentColor"
                                      viewBox="0 0 8 8"
                                    >
                                      <circle cx={4} cy={4} r={3} />
                                    </svg>
                                    <span className="inline-block px-1">
                                      {person.tasks}
                                    </span>
                                    <span>Tasks</span>
                                  </span>
                                </div>
                                <div className="mt-1">
                                  <span className="inline-block my-2 font-semibold text-gray-500">
                                    Assigned KPI
                                  </span>
                                  <List
                                    spacing="sm"
                                    size="sm"
                                    center
                                    icon={
                                      <ThemeIcon
                                        color="gray"
                                        size={16}
                                        radius="sm"
                                      >
                                        <ChevronRightIcon />
                                      </ThemeIcon>
                                    }
                                  >
                                    {!!person?.kpi &&
                                      person?.kpi?.map((val, kpiindex) => (
                                        <List.Item key={kpiindex}>
                                          {val?.title}
                                        </List.Item>
                                      ))}
                                  </List>
                                </div>
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  const ProjectSideCard = () => {
    return (
      <Transition.Root show={openprojects} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden"
          onClose={setOpenprojects}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0 bg-gray-200 bg-opacity-90" />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-6xl">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          <p>Total Projects </p>
                          <p className="text-sm font-normal text-gray-400">
                            List of all current projects report in September -
                            2021
                          </p>
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:ring-2 focus:ring-gray-500"
                            onClick={() => setOpenprojects(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-scroll ">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                  Project Title
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                  Sector / Department
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                  status
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                  Target(%)
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                  Achieved(%)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {projectlist.map((project, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  <td className="flex flex-col px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    <span className="inline-block">
                                      {" "}
                                      {project?.title}
                                    </span>
                                    <span className="flex-wrap inline-block text-sm font-normal text-gray-400">
                                      Code : {project?.code}
                                    </span>
                                  </td>
                                  <td className="flex-wrap px-6 py-4 text-sm text-gray-500 ">
                                    <span className="inline-block">
                                      {project?.sector} /{project?.department}
                                    </span>
                                    <span className="flex-wrap inline-block text-sm font-normal text-gray-400">
                                      {project?.projectmanager}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <span
                                      css={[
                                        project?.currentstatus == "ontrack" &&
                                          tw`text-green-800 bg-green-100 `,
                                        project?.currentstatus == "delayed" &&
                                          tw`text-red-800 bg-red-100`,
                                        project?.currentstatus == "risk" &&
                                          tw`text-red-800 bg-red-100`,
                                      ]}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase"
                                    >
                                      {project?.currentstatus}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {project?.target}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {project?.actual}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  return (
    <React.Fragment>
      <StyledLayout className="w-full min-h-screen antialiased">
        <motion.div className="flex items-center justify-between w-full">
          <Image src={logo} alt="HRA"></Image>
          <h1 className="self-center text-2xl font-semibold text-center text-gray-600 ">
            {selected?.description}
          </h1>
          <div>
            <p className="text-lg font-semibold text-gray-600">
              FY : {selected?.reportduration}
            </p>
            <Listbox value={selected} onChange={setSelected}>
              <Listbox.Label className="sr-only">
                Change Report filter
              </Listbox.Label>
              <div className="relative">
                <div className="inline-flex divide-x divide-gray-600 rounded-md shadow-sm">
                  <div className="relative z-0 inline-flex divide-x divide-gray-600 rounded-md shadow-sm">
                    <div className="relative inline-flex items-center py-2 pl-3 pr-4 text-white bg-gray-500 border border-transparent shadow-sm rounded-l-md">
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      <p className="ml-2.5 text-sm font-medium">
                        {selected.title}
                      </p>
                    </div>
                    <Listbox.Button className="relative inline-flex items-center p-2 text-sm font-medium text-white bg-gray-500 rounded-l-none rounded-r-md hover:bg-gray-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500">
                      <span className="sr-only">Change Report filter</span>
                      <ChevronDownIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </Listbox.Button>
                  </div>
                </div>

                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 z-10 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {publishingOptions.map((option) => (
                      <Listbox.Option
                        key={option.title}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-gray-500" : "text-gray-900",
                            "cursor-default select-none relative p-4 text-sm"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <p
                                className={
                                  selected ? "font-semibold" : "font-normal"
                                }
                              >
                                {option.title}
                              </p>
                              {selected ? (
                                <span
                                  className={
                                    active ? "text-white" : "text-gray-500"
                                  }
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </div>
                            <p
                              className={classNames(
                                active ? "text-gray-200" : "text-gray-500",
                                "mt-2"
                              )}
                            >
                              {option.description}
                            </p>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </motion.div>
        <motion.div className="grid w-full grid-cols-1 gap-2 bg-white sm:grid-cols-6">
          <div className="flex flex-col items-center justify-between sm:col-span-4 sm:flex-row">
            <p className="w-full p-4 text-lg font-semibold bg-gray-200 sm:w-auto">
              Vision
            </p>
            <p className="p-1 tracking-tight ">{selected?.vision}</p>
          </div>
          <div className="flex flex-col items-center justify-start sm:flex-row">
            <p className="w-full p-4 text-lg font-semibold bg-gray-200 sm:w-auto ">
              Performance
            </p>
            <div className="flex items-center justify-between px-3 text-2xl font-semibold text-gray-500">
              <p>{selected?.performance}</p>
              {/* <div className="bg-green-100 text-green-800 inline-flex items-center px-1 py-0.5 rounded-full text-xs">
                <ArrowSmUpIcon
                  css={[
                    selected?.isperformanceup && tw`text-green-500`,
                    !selected?.isperformanceup && tw`text-red-500`,
                  ]}
                  className="self-center flex-shrink-0 w-5 h-5 "
                  aria-hidden="true"
                />
                {selected?.performancedrop}
              </div> */}
              {selected?.isperformanceup == true ? (
                <div className="bg-green-100 text-green-800 inline-flex items-center px-1 py-0.5 rounded-full text-xs">
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 w-5 h-5 text-green-500"
                    aria-hidden="true"
                  />
                  {selected?.performancedrop}
                </div>
              ) : (
                <div className="bg-red-100 text-red-800 inline-flex items-center px-1 py-0.5 rounded-full text-xs">
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 w-5 h-5 text-red-500"
                    aria-hidden="true"
                  />
                  {selected?.performancedrop}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-start sm:mx-2 sm:flex-row">
            <p className="w-full p-4 text-lg font-semibold bg-gray-200 sm:w-auto">
              Happinees
            </p>
            <p className="px-2">
              {selected?.happiness == "good" ? (
                <EmojiHappyIcon
                  className="self-center flex-shrink-0 w-12 h-12 text-yellow-500"
                  aria-hidden="true"
                />
              ) : (
                <EmojiSadIcon
                  className="self-center flex-shrink-0 w-12 h-12 text-red-500"
                  aria-hidden="true"
                />
              )}
            </p>
          </div>
        </motion.div>
        <motion.div className="w-11/12 mx-auto mt-5">
          <dl className="grid grid-cols-1 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow md:grid-cols-5 md:divide-y-0 md:divide-x">
            {selected &&
              selected?.units &&
              selected?.units.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="text-base font-normal text-gray-900">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
                      <div className="flex items-baseline text-2xl font-semibold text-gray-600">
                        {item.stat}
                      </div>

                      <div
                        className={classNames(
                          item.changeType === "increase"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800",
                          "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                        )}
                      >
                        {item.changeType === "increase" ? (
                          <ArrowSmUpIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowSmDownIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        )}

                        <span className="sr-only">
                          {item.changeType === "increase"
                            ? "Increased"
                            : "Decreased"}{" "}
                          by
                        </span>
                        {item.change}
                      </div>
                    </dd>
                  </div>
                  <div className="bg-gray-100">
                    <div className="flex -mt-px divide-x divide-gray-200">
                      <div className="flex flex-1 w-0">
                        <p
                          onClick={() => {
                            setSelectedunit(item);
                            setOpenEmployees(true);
                          }}
                          className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg cursor-pointer hover:text-gray-500"
                        >
                          <UserGroupIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-1 font-semibold">
                            {item?.employees}
                          </span>

                          <span className="ml-2">Employees</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </dl>
        </motion.div>

        <motion.div className="grid w-full grid-cols-1 gap-2 mt-5 bg-white divide-x-2 sm:grid-cols-3">
          <div className="flex flex-col items-start justify-start p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-500">
                <ul className="flex space-x-2 divide-x-2 ">
                  <li className="flex items-start">
                    <p className="mr-1">Strategy Project</p>
                    <p className="font-semibold text-gray-600">19</p>
                  </li>
                  <li className="flex items-start">
                    <p className="mx-1">Operation Project</p>
                    <p className="font-semibold text-gray-600">0</p>
                  </li>
                </ul>
              </p>
            </div>
            <div className="w-full h-60">
              <MyResponsiveBar data={barData} />
            </div>
            <div>
              <button
                onClick={() => {
                  setProjectlist(selected?.projects);
                  setOpenprojects(true);
                }}
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Procurement
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                <ul className="flex space-x-2 divide-x-2 ">
                  <li className="flex items-start">
                    <p className="mr-1">Total Items</p>
                    <p className="font-semibold text-gray-600">8</p>
                    <p className="mx-2 font-semibold text-gray-600">
                      for September 2021
                    </p>
                  </li>
                </ul>
              </p>
            </div>
            <div className="w-full h-60">
              <MyResponsivePie data={pieData} />
            </div>
            <div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Finance</h1>
              <p className="mt-1 text-sm text-gray-500">
                <ul className="flex space-x-2 divide-x-2 ">
                  <li className="flex items-start">
                    <p className="mr-1">Total Initial Approved Budget</p>
                    <p className="font-semibold text-gray-600">
                      31,798,000.00 AED
                    </p>
                  </li>
                </ul>
              </p>
            </div>
            <div className="w-full h-60">
              <MyResponsiveFunnel data={funnelData} />
            </div>
            <div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid w-full grid-cols-1 gap-2 mt-5 bg-white divide-x-2 sm:grid-cols-3">
          <div className="flex flex-col items-start justify-between p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Achievements
              </h1>
              <p className="mt-1 text-sm text-gray-500">For September - 2021</p>
            </div>
            <div>
              <div className="my-2 list-none max-w-none">
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="gray" size={24} radius="xl">
                      <StarIcon />
                    </ThemeIcon>
                  }
                >
                  {selected?.achievements?.map(
                    (achievement, achievementindex) => (
                      <List.Item
                        key={achievementindex}
                        icon={
                          <ThemeIcon color="gray" size={16} radius="xl">
                            {achievement?.type == "project" ? (
                              <StarIcon />
                            ) : (
                              <ClipboardCheckIcon />
                            )}
                          </ThemeIcon>
                        }
                      >
                        {achievement?.title}
                      </List.Item>
                    )
                  )}
                </List>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Challenges
              </h1>
              <p className="mt-1 text-sm text-gray-500">For September - 2021</p>
            </div>
            <div>
              <div className="my-2 max-w-none">
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="gray" size={24} radius="xl">
                      <StarIcon />
                    </ThemeIcon>
                  }
                >
                  {selected?.challenges?.map((challenge, challengeindex) => (
                    <List.Item
                      key={challengeindex}
                      icon={
                        <ThemeIcon color="gray" size={16} radius="xl">
                          {challenge?.type == "project" ? (
                            <StarIcon />
                          ) : (
                            <ClipboardCheckIcon />
                          )}
                        </ThemeIcon>
                      }
                    >
                      <span className=""> {challenge?.title}</span>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Improvements
              </h1>
              <p className="mt-1 text-sm text-gray-500">For September - 2021</p>
            </div>
            <div>
              <div className="my-2 max-w-none">
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="gray" size={24} radius="xl">
                      <StarIcon />
                    </ThemeIcon>
                  }
                >
                  {selected?.improvements?.map(
                    (improvement, improvementindex) => (
                      <List.Item
                        key={improvementindex}
                        icon={
                          <ThemeIcon color="gray" size={16} radius="xl">
                            {improvement?.type == "project" ? (
                              <StarIcon />
                            ) : (
                              <ClipboardCheckIcon />
                            )}
                          </ThemeIcon>
                        }
                      >
                        <span className=""> {improvement?.title}</span>
                      </List.Item>
                    )
                  )}
                </List>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="sm:hidden inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                View all
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div className="w-full mt-5">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          KPI Metric (Q3/2021)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Sector / Department
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Target(%)
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Achieved(%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpidata.map((kpi, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="flex flex-col px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                            <span className="inline-block"> {kpi.title}</span>
                            <span className="inline-block text-sm font-normal text-gray-400">
                              {kpi?.subtitle}
                            </span>
                          </td>
                          <td className="flex-wrap px-6 py-4 text-sm text-gray-500">
                            {kpi.dpeartment}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {kpi.planned}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {kpi.actual}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {openEmployees && <EmployeeSideCard />}
        {openprojects && <ProjectSideCard />}
      </StyledLayout>
    </React.Fragment>
  );
};

export default SSD;
