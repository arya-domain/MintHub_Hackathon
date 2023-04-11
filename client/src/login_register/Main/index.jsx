import styles from "./styles.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Dropdown } from "react-bootstrap";
export const Main = () => {

	const handleLogout = () => {
		localStorage.removeItem("authtoken");
		localStorage.removeItem("fname");
		localStorage.removeItem("lname");
		localStorage.removeItem("email");
		
		window.location.assign("/dashboard");
	}
	const token = localStorage.getItem("authtoken");
	const fname = localStorage.getItem("fname");
	const lname = localStorage.getItem("lname");
	const email = localStorage.getItem("email");
	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1></h1>
				<Dropdown className="ease-in-out delay-300  ">
					<Dropdown.Toggle className="py-0 text-[23px] font-bold text-white  bg-opacity-0 opacity-70 border-0 hover:bg-transparent active:bg-transparent focus:bg-transparent hover:text-2xl btnid hover:opacity-100" >
						Account
					</Dropdown.Toggle>
					<Dropdown.Menu className="text-white bg-opacity-100 bg-gradient-to-t from-black to-purple-500 active:bg-opacity-100 focus:bg-opacity-100">
						<Dropdown.Item  className="text-white hover:opacity-100 hover:bg-transparent ml-2">{fname} {lname}</Dropdown.Item>
						<Dropdown.Item  className="text-white hover:opacity-100 hover:bg-transparent ml-2">{email}</Dropdown.Item>
						<Dropdown.Item  className="text-white hover:opacity-100 hover:bg-transparent ml-2" onClick={handleLogout}>Logout</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				
			</nav>
		</div>
	);
};

