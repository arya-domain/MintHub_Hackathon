import React, { useState } from "react";
import jwtDecode from "jwt-decode";

export const Update = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  const handleDecodeToken = (token) => {
    const decoded = jwtDecode(token);
    setDecodedToken(decoded);
  };

  return (
    <div className="text-2xl text-center text-white">
      <input type="text" onChange={(e) => handleDecodeToken(e.target.value)} className=" text-black"/>
      {decodedToken && (
        <div>
          <p>Token header:</p>
          <pre>{JSON.stringify(decodedToken.header, null, 2)}</pre>
          <p>Token payload:</p>
          <pre>{JSON.stringify(decodedToken.payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

