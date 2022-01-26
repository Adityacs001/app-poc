import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  ChatAltIcon,
  DocumentReportIcon,
  HeartIcon,
  InboxIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
  ExternalLinkIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const footernavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const features = [
  {
    name: "Unlimited Inboxes",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: InboxIcon,
  },
  {
    name: "Manage Team Members",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: UsersIcon,
  },
  {
    name: "Spam Report",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: TrashIcon,
  },
  {
    name: "Compose in Markdown",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: PencilAltIcon,
  },
  {
    name: "Team Reporting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: DocumentReportIcon,
  },
  {
    name: "Saved Replies",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ReplyIcon,
  },
  {
    name: "Email Commenting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChatAltIcon,
  },
  {
    name: "Connect with Customers",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: HeartIcon,
  },
];

const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 3,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 4,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

const Landing: React.FC = () => {
  return (
    <Fragment>
      <div className="min-h-screen">
        <div className="relative overflow-hidden">
          <Popover as="header" className="relative">
            <div className="pt-6 bg-primary">
              <nav
                className="relative flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6"
                aria-label="Global"
              >
                <div className="flex items-center flex-1">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <p className="flex items-center justify-center w-24 h-24 rounded-full bg-secondary">
                        The logo
                      </p>
                    </a>
                    <div className="flex items-center -mr-2 md:hidden">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="hidden space-x-8 md:flex md:ml-10">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-white hover:text-gray-300"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-6">
                  <a
                    href="#"
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    Log in
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 text-base font-medium border border-transparent rounded-md text-primary bg-secondary hover:bg-tertiary"
                  >
                    Start free trial
                  </a>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top transform md:hidden"
              >
                <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <div>
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="pt-5 pb-6">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="px-5 mt-6">
                      <a
                        href="#"
                        className="block w-full px-4 py-3 font-medium text-center rounded-md shadow text-primary bg-secondary hover:bg-tertiary"
                      >
                        Start free trial
                      </a>
                    </div>
                    <div className="px-5 mt-6">
                      <p className="text-base font-medium text-center text-gray-500">
                        Existing customer?{" "}
                        <a href="#" className="text-gray-900 hover:underline">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main>
            <div className="pt-10 bg-primary sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
              <div className="mx-auto max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                    <div className="lg:py-24">
                      <a
                        href="#"
                        className="inline-flex items-center p-1 pr-2 text-white bg-green-900 rounded-full sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                      >
                        <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-primary rounded-full">
                          We're hiring
                        </span>
                        <span className="ml-4 text-sm">
                          Visit our careers page
                        </span>
                        <ChevronRightIcon
                          className="w-5 h-5 ml-2 text-gray-500"
                          aria-hidden="true"
                        />
                      </a>
                      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                        <span className="block">A better way to</span>
                        <span className="block text-secondary">
                          ship web apps
                        </span>
                      </h1>
                      <p className="mt-3 text-base text-tertiary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                        irure qui Lorem cupidatat commodo. Elit sunt amet fugiat
                        veniam occaecat fugiat.
                      </p>
                      <div className="mt-10 sm:mt-12">
                        <form
                          action="#"
                          className="sm:max-w-xl sm:mx-auto lg:mx-0"
                        >
                          <div className="sm:flex">
                            <div className="flex-1 min-w-0">
                              <label htmlFor="email" className="sr-only">
                                Email address
                              </label>
                              <input
                                autoComplete="off"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="block w-full px-4 py-3 text-base placeholder-gray-500 border-0 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary"
                              />
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                              <button
                                type="submit"
                                className="block w-full px-4 py-3 font-medium rounded-md shadow text-primary bg-secondary hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary"
                              >
                                Start free trial
                              </button>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                            Start your free 14-day trial, no credit card
                            necessary. By providing your email, you agree to our{" "}
                            <a href="#" className="font-medium text-white">
                              terms or service
                            </a>
                            .
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                    <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                      {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                      <img
                        className="w-full h-full"
                        src="/images/themind.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature List*/}
            <div className="bg-white">
              <div className="max-w-4xl px-4 py-16 mx-auto sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                  Inbox support built for efficiency
                </h2>
                <p className="max-w-3xl mt-4 text-lg text-secondary">
                  Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                  Et magna sit morbi lobortis. Blandit aliquam sit nisl euismod
                  mattis in.
                </p>
                <div className="grid grid-cols-1 mt-12 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name}>
                      <div>
                        <span className="flex items-center justify-center w-12 h-12 rounded-md bg-primary bg-opacity-10">
                          <feature.icon
                            className="w-6 h-6 text-primary"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-primary">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-base text-secondary">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA*/}
            <div className="bg-primary">
              <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-secondary md:text-4xl">
                  <span className="block">Ready to dive in?</span>
                  <span className="block text-tertiary">
                    Start your free trial today.
                  </span>
                </h2>
                <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-5 py-3 text-base font-medium border border-transparent rounded-md text-primary bg-secondary hover:bg-tertiary"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ*/}
            <div className="bg-white">
              <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-primary">
                  Frequently asked questions
                </h2>
                <div className="pt-10 mt-6 border-t border-opacity-25 border-secondary">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
                    {faqs.map((faq) => (
                      <div key={faq.id}>
                        <dt className="text-lg font-medium leading-6 text-primary">
                          {faq.question}
                        </dt>
                        <dd className="mt-2 text-base text-secondary">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Footer*/}
            <footer className="bg-primary" aria-labelledby="footer-heading">
              <h2 id="footer-heading" className="sr-only">
                Footer
              </h2>
              <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                  <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                      <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                          Solutions
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                          {footernavigation.solutions.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-base text-white hover:text-tertiary"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-12 md:mt-0">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                          Support
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                          {footernavigation.support.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-base text-white hover:text-tertiary"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                      <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                          Company
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                          {footernavigation.company.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-base text-white hover:text-tertiary"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-12 md:mt-0">
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                          Legal
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                          {footernavigation.legal.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="text-base text-white hover:text-tertiary"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 xl:mt-0">
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">
                      Subscribe to our newsletter
                    </h3>
                    <p className="mt-4 text-base text-white">
                      The latest news, articles, and resources, sent to your
                      inbox weekly.
                    </p>
                    <form className="mt-4 sm:flex sm:max-w-md">
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        required
                        className="w-full min-w-0 px-4 py-2 text-base placeholder-gray-500 bg-white border border-transparent rounded-md appearance-none text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white focus:placeholder-primary"
                        placeholder="Enter your email"
                      />
                      <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-4 py-2 text-base font-medium border border-transparent rounded-md text-primary bg-secondary hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-secondary md:flex md:items-center md:justify-between">
                  <div className="flex space-x-6 md:order-2">
                    {footernavigation.social.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-secondary hover:text-gray-300"
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <p className="mt-8 text-base text-secondary md:mt-0 md:order-1">
                    &copy; 2021 The Mind, Inc. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
