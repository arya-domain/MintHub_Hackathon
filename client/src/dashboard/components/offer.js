
export const Offer = () => {
    return (
        <div className='relative h-screen bg-black '>
            <h1 className='flex items-center justify-center w-1/2 h-screen my-2 text-5xl subpixel-antialiased italic font-extrabold text-center text-white bg-gradient-to-l from-purple-500 to-black '>
                Haven't Joined Us Yet ? <br /> Register Now !! <br />
            </h1>
            <a href='/register'>
                <button className='absolute text-6xl font-extrabold text-white rounded-lg top-1/2 left-2/3 hover:bg-gradient-to-r from-black via-purple-500 to-black hover:scale-110 '>
                    Register
                </button>
            </a>
        </div>
    )
}