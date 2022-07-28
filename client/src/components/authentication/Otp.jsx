import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
function Otp({ setPage }) {
    const [otp, setOtp] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault();
        //<-----------------------------> //OTP Logic for verification
        const result = window.confirmation;
        result
            .confirm(otp)
            .then((result) => {
                const userPreData = {
                    Token: result._tokenResponse.idToken,
                    Phone: result.user.phoneNumber
                };
                localStorage.setItem("preUser", JSON.stringify(userPreData));
                setPage("details")
            })
}
    return (
      <div className={styles.innerDiv}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setOtp(e.target.value)}
            required
            type="number"
            placeholder="Enter OTP"
            className={styles.input}
          />
          <br />
          <br />
          <input className={styles.button} type="submit" value="Verify" />
        </form>
      </div>
    );
}

export default Otp