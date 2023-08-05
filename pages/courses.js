import React, { useEffect, useState } from "react";
import Header from "@layouts/partials/Header";
import Footer from "@layouts/partials/Footer";
import supabase from "middleware/supabaseClient";
import Link from "next/link";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useRouter } from "next/router";
import { set } from "date-fns";

const Courses = () => {
  const router = useRouter();
  const [data, setdata] = useState();
  const [search, setSearch] = useState();
  const [results, setResults] = useState();

  const searchResults = async (event) => {
    const { data, error } = await supabase
      .from("data")
      .select()
      .textSearch("course_name", event, {
        config: "english",
      });
    setResults(data);
  };

  useEffect(() => {
    const funct = async () => {
      const { data, error } = await supabase.from("data").select();
      setdata(data);
    };

    funct();
  }, []);

  const handleOnChange = (e) => {
    if (e.target.value) {
      searchResults(e.target.value);
      setTimeout(() => {
        setSearch(e.target.value);
      }, 100);
    }
  };

  const lectures = (slug) => {
    if (sessionStorage.getItem("token")) {
      router.push(`/courses/${slug}`);
    }
  };

  return (
    <div className="h-auto">
      <Header />
      <div className="bg-primary shadow-md shadow-primary">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="px-16 text-3xl font-bold tracking-wide text-white">
            Courses
          </h1>
        </div>
      </div>
      <div>
        {/* <!-- component --> */}
        <div className="select-none bg-[#EDF6F5] py-8">
          <div className="relative mx-auto w-4/6">
            <div className="mb-3 h-12 w-full rounded-xl bg-white p-2 shadow-lg">
              <input
                onChange={handleOnChange}
                type="text"
                placeholder="Search"
                className="h-8 w-full rounded-lg text-xl focus:border-primary focus:outline-none"
              />
            </div>
            {search && (
              <div className="absolute w-full overflow-hidden rounded-xl bg-white p-1 shadow-xl">
                {results &&
                  results.map((items, i) => (
                    <div
                      onClick={() => {
                        lectures(items.course_name);
                      }}
                      key={i}
                      className="flex w-full cursor-pointer items-center rounded-lg p-3 pl-4 hover:bg-gray-300"
                    >
                      <div>
                        <div className="text-lg font-bold">
                          {items.course_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="mr-2">{items.course_type}</span>
                          <span className="mr-2">{items.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-auto justify-center bg-[#EDF6F5]">
        <div className="grid h-auto grid-cols-1 gap-28 px-4 pb-24 pt-16 md:grid-cols-2 md:px-10 lg:grid-cols-2 lg:px-8 xl:grid-cols-3 xl:px-24 2xl:grid-cols-3 2xl:px-32">
          {data &&
            data.map((item) => (
              <div
                key={item.id}
                className="h-[27rem] w-80 transition duration-500 ease-in-out hover:shadow-xl hover:shadow-[#777777]"
              >
                <div className="block h-[27rem] rounded-lg bg-gray-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <img
                    className="rounded-t-lg"
                    src={`${item.image_link}`}
                    alt=""
                  />
                  <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
                      {item.course_name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600">
                      {item.description}
                    </p>
                    <div className="flex justify-between">
                      {item.course_type == "free" && (
                        <button
                          onClick={() => {
                            lectures(item.course_name);
                          }}
                          type="button"
                          className="focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          view
                        </button>
                      )}
                      {item.course_type == "premium" &&
                        sessionStorage.getItem("token") && (
                          <button
                            onClick={() => {
                              lectures(item.course_name);
                            }}
                            type="button"
                            className="focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            view
                          </button>
                        )}
                      {item.course_type == "premium" && (
                        <div className="flex w-full items-center justify-end">
                          <MdOutlineWorkspacePremium className="text-2xl text-yellow-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
