import { Row, Col, Container } from "react-bootstrap";

export const UserDetails = () => {
    const token = localStorage.getItem("authtoken");
    const fname = localStorage.getItem("fname");
    const lname = localStorage.getItem("lname");
    const email = localStorage.getItem("email");
    const phoneno = localStorage.getItem("phoneno");
    const country = localStorage.getItem("country");
    console.log(email)
    return (
        <div className=" text-white bg-gradient-to-r from-black via-purple-500 to-black min-h-[900px] flex items-center justify-center ">
            <Container style={{ width: '900px', height: '500px' }} className="text-white bg-purple-800 border-black shadow-2xl border-[1px] shadow-black bg-opacity-10 rounded-md ">
                <div className="relative left-[10%]">
                    <h1 className="text-center  text-6xl font-bold text-black relative left-[-10%] pt-3">Your Details</h1>
                    <table >
                        <tbody>
                            <tr >
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  pt-5">Name </td>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  pt-5">:</td>
                                <td className="px-10 pb-5 text-3xl font-bold text-left  pt-5">{fname} {lname}</td>
                            </tr>
                            <tr>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">Email</td>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">:</td>
                                <td className="px-10 pb-5 text-3xl font-bold text-left  ">{email}</td>
                            </tr>
                            <tr>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">Phone</td>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">:</td>
                                <td className="px-10 pb-5 text-3xl font-bold text-left  ">{phoneno}</td>
                            </tr>
                            <tr>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">Country</td>
                                <td className="px-10 pb-5 text-3xl font-extrabold text-left  ">:</td>
                                <td className="px-10 pb-5 text-3xl font-bold text-left  ">{country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}