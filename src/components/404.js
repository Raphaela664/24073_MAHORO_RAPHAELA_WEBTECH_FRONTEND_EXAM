import React from "react";

const notfound = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h3 className="mt-4 text-9xl font-bold tracking-tight text-gray-900 sm:text-5xl">404</h3>
          <h3 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h3>
          <p className="mt-6 text-4xl text-base  text-gray-600">
            Sorry, we could not find the page you are looking for
          </p>
        </div>
      </main>
    </>
  );
};

export default notfound;
