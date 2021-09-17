import React, { useState, useRef } from "react";
import Router from "next/router";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { motion } from "framer-motion";

//using Yup setting the validation schema in order to display a different error message for different cases
const validationSchema = Yup.object({
  fullName: Yup.string()
    .max(50, "Are you really sure that your full name is correct?")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Are you sure that your email is correct?"),
});

export default function Home() {
  //useState is used in order to count the characters in the textarea.
  //initially the count is 0 and it will be getting update every time the user types a characters
  // in order to achieve this we use  onChange={(e) => setCount(e.target.value.length)} in the texteare
  //which will be returning the length of the typed message.
  const [count, setCount] = useState(0);

  // setting the variants and values for the animation
  // the animation appears from the left on enter
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    //setting the height to be full screen and using flex in order to be able to center the form
    <div className="flex h-screen bg-gradient-to-l md:bg-gradient-to-r from-purple-900   to-purple-700">
      {/* Setting he width of the form on 60% for any screen above medium size and full width for anything below that */}
      <div className="m-auto w-full md:w-3/5">
        {/* ANIMATE CONTACT FORM */}
        <motion.div
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: "linear" }}
        >
          {/* SET CONTACT FORM BACKGROUND TO WHITE  AND CENTER IT  */}
          <div className="m-auto bg-white max-w-lg p-8 md:p-12 my-10 rounded-lg shadow-2xl ">
            {/* USE FORMIK TO CREATE THE FORM  AND SET INITIAL VALUES TO BLANK*/}
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                message: "",
              }}
              // Use the YUP validation schema we created earlier for
              validationSchema={validationSchema}
              //On submit, in order to hide the form and show a Thank You message we redirect to the /thankyou page
              onSubmit={() => {
                Router.push("/thankyou");
              }}
            >
              <Form>
                <div>
                  <label htmlFor="fullName" className="p4-5 px-1 font-thin">
                    Full Name:
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    className="px-4 py-3 w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                  />
                  <div className="text-red-600 font-semibold text-xs">
                    <ErrorMessage name="fullName" />
                  </div>
                </div>
                <div className="flex flex-col mb-5">
                  <label htmlFor="email" className="pt-5 px-1 font-thin">
                    Email:
                  </label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="px-4 py-3 w-full mt-2 border-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                  />
                  <div className="text-red-600 font-semibold text-xs">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="message" className=" px-1 font-thin">
                    Message:
                  </label>
                  <textarea
                    as="textarea"
                    name="message"
                    //setting the size of the textarea on 5 rows
                    rows="5"
                    placeholder="Your Message Here"
                    className="px-4 py-3 w-full border-2 mt-2 rounded-md text-sm outline-none focus:border-1 focus:border-purple-600 "
                    //change the character count every time the user entering or deleting a character
                    onChange={(e) => setCount(e.target.value.length)}
                  />
                  {/* Display the count of the characters below the the text area */}
                  <p className="text-right pr-4 text-xs text-gray-600">
                    {count}
                  </p>
                </div>
                <button
                  type="submit"
                  className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-300 hover:text-black text-white py-2 rounded-md transition duration-100"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
