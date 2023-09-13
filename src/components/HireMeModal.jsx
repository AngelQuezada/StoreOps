import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './reusable/Button';

const HireMeModal = ({ onClose, onRequest }) => {
  const [flashMessage, setFlashMessage] = useState(false);
  const darkMode = document.body.classList.contains('dark'); // Modify this line based on how you detect dark mode

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlashMessage(true);
    setTimeout(() => setFlashMessage(false), 3000); // Hides the message after 3 seconds
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-general-medium fixed inset-0 z-30 transition-all duration-500"
    >
      {/* Modal Backdrop */}
      <div className="bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"></div>

      {/* Modal Content */}
      <main className="flex flex-col items-center justify-center h-full w-full">
        <div className="modal-wrapper flex items-center z-30">
          <div className="modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-lg relative">
            <div className="modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark">
              <h1 className=" text-primary-dark dark:text-primary-light text-xl">
                Let's Connect!
              </h1>
              <button
                onClick={onClose}
                className="px-4 font-bold text-primary-dark dark:text-primary-light"
              >
                <FiX className="text-3xl" />
              </button>
            </div>
            <div className="modal-body p-6 w-full h-full">
              <form onSubmit={handleSubmit} className="max-w-3xl m-4 text-left">
                {flashMessage ? (
                  <div
                    style={{
                      color: darkMode ? 'white' : 'black',
                      backgroundColor: darkMode ? 'black' : 'white',
                    }}
                  >
                    Form Submitted Successfully!
                  </div>
                ) : (
                  <>
                    <div className="">
                      <input
                        className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                        id="name"
                        name="name"
                        type="text"
                        required=""
                        placeholder="Name"
                        aria-label="Name"
                      />
                    </div>
                    <div className="mt-6">
                      <input
                        className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                        id="email"
                        name="email"
                        type="text"
                        required=""
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>
                    <div className="mt-6">
                      <textarea
                        className="w-full px-5 py-2 border dark:border-secondary-dark rounded-md text-md bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
                        id="message"
                        name="message"
                        cols="14"
                        rows="6"
                        aria-label="Details"
                        placeholder="Leave a Message"
                      ></textarea>
                    </div>
                    <div className="mt-6 pb-4 sm:pb-1">
                      <button
                        type="submit"
                        className="px-4 sm:px-6 py-2 sm:py-2.5 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                        aria-label="Submit Request"
                      >
                        <Button title="Send" />
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right">
              <span
                onClick={onClose}
                type="button"
                className="px-4 sm:px-6 py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light rounded-md focus:ring-1 focus:ring-indigo-900 duration-500"
                aria-label="Close Modal"
              >
                <Button title="Close" />
              </span>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default HireMeModal;
