function NotFound() {
  return (
    <section className='bg-[#213555]'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <h1 className='mt-3 text-2xl font-semibold text-red-600 '>
            404
          </h1>
          <p className='mt-4 text-white'>
            Page Not Found
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;