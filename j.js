import { Row,Col } from "react-bootstrap"

export const Search = () => {
    const mj = localStorage.getItem("marketjson")

    return(
        <div>
            <Row className="px-2 rounded-md items-left border-gray-50 -scale-x-100">
                <Col>
                  <input type="search" id="searchBar" className="w-3/5 text-left outline-none form-control active:outline-none focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /></Col>
                <Col className="mx-[2%]">
                  <button className="relative px-3 py-2 text-sm duration-200 ease-in border-2 border-white rounded-md hover:bg-white hover:text-black right-1/2 " >
                    Find
                  </button>
                  <div></div>
                </Col>

              </Row>
        </div>
    )
}
