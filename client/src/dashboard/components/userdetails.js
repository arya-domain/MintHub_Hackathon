import { Row, Col, Container } from "react-bootstrap";    

export const UserDetails = () => {
    const token = localStorage.getItem("authtoken");
	const fname = localStorage.getItem("fname");
	const lname = localStorage.getItem("lname");
	const email = localStorage.getItem("email");
  
    return(
        <div className="h-[720px] text-white bg-gradient-to-r from-black via-purple-500 to-black">
            <Container style={{ width: '900px', height: '600px' }} className="text-white bg-purple-800 border-black rounded-lg shadow-2xl border-1 shadow-black bg-opacity-10">
                    <Row className="p-10 text-4xl font-extrabold text-left ">Name : {fname} {lname}</Row>
                    <Row className="p-10 text-4xl font-extrabold text-left ">Email : {email}</Row>
            </Container>
        </div>
    )
}