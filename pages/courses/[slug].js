import supabase from "middleware/supabaseClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "@layouts/partials/Header";
import Footer from "@layouts/partials/Footer";

const post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setdata] = useState();

  const funct = async () => {
    const { data, error } = await supabase
      .from("data")
      .select()
      .eq("course_name", slug);
    setdata(data);
  };

  useEffect(() => {
    funct();
  }, []);

  return (
    <>
      <Header />
      {data &&
        data.map((item, i) => (
          <div class="bg-primary shadow-md shadow-primary">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 class="px-14 text-3xl font-bold tracking-wide text-white">
                {item.course_name}
              </h1>
            </div>
          </div>
        ))}

      <div className="h-auto w-full">
        {/* {/* <div className="w-full h-screen"> */}
        <div className="flex h-auto w-auto items-center justify-center">
          {data &&
            data.map((item, i) => (
              <div
                className="grid h-full w-full grid-cols-1 gap-10 overflow-y-scroll bg-white px-16 py-16"
                key={i}
              >
                {item.video_links.map((link, j) => (
                  <div
                    key={j}
                    className="aspect-w-16 aspect-h-9 h-auto rounded-xl bg-[#EDF6F5] px-16 py-16 transition duration-500 ease-in-out hover:shadow-xl hover:shadow-[#777777]"
                  >
                    <div className="flex h-16 items-center justify-start">
                      <h1 className="text-center text-2xl font-bold">
                        Lecture - {j + 1}
                      </h1>
                    </div>
                    <iframe
                      className="h-screen w-full rounded-lg"
                      src={`${link}`}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default post;
