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
      .eq("course_name", slug );
    setdata(data);
  };

  useEffect(() => {
    funct();
  }, []);

  return (
    <>
      <Header/>
      {data && data.map((item,i) => (<div class="bg-primary shadow-md shadow-primary">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-white tracking-wide px-14">{item.course_name}</h1>
    </div>
    </div>
    ))}

      <div className="h-auto w-full">
          {/* {/* <div className="w-full h-screen"> */}
            <div className="w-auto h-auto flex justify-center items-center">
           {data && data.map((item,i) => (
            <div className="py-16 px-16 grid grid-cols-1 gap-10 w-full h-full bg-white overflow-y-scroll" key={i}>
              {item.video_links.map((link, j) => (
                <div key={j} className="px-16 py-16 aspect-w-16 aspect-h-9 h-auto bg-[#EDF6F5] rounded-xl transition ease-in-out duration-500 hover:shadow-xl hover:shadow-[#777777]">
                  <div className="h-16 flex justify-start items-center">
                    <h1 className="text-2xl font-bold text-center">Lecture - {j+1}</h1>
                  </div>
                  <iframe className="h-screen w-full rounded-lg" src={`${link}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
               ))} 
            </div>
          ))}
            </div>
        </div>
       
      <Footer/>
    </>
  );
};

export default post;
