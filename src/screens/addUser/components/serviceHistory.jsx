import React, { useState } from "react";
import CustomInput from "../../../components/customInput";
import "../styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, headerJson } from "../../../utils/apis";
import {
  AGREE_TERMS,
  WELCOME_MESSAGE,
} from "../../../utils/constants/messages";
import Loading from "../../../components/loading";

const ServiceHistory = () => {
  const navigation = useNavigate();
  const params = useParams();

  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [unitArea1, setUnitArea1] = useState("");
  const [unitArea2, setUnitArea2] = useState("");
  const [from1, setFrom1] = useState("");
  const [from2, setFrom2] = useState("");
  const [to1, setTo1] = useState("");
  const [to2, setTo2] = useState("");
  const [occupiedAccom, setOccupiedAccom] = useState("");
  const [familyStay, setFamilyStay] = useState("");
  const [familyStay2, setFamilyStay2] = useState("");
  const [vehMake, setVehMake] = useState("");
  const [vehRegistration, setVehRegistration] = useState("");
  const [preference1, setPreference1] = useState("");
  const [preference2, setPreference2] = useState("");
  const [preference3, setPreference3] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayYears = years ? years : " ____ ";
  const displayMonths = months ? months : " ____ ";
  const displayDays = days ? days : " ____ ";
  const OCCUPIED_ACCOMODATION =
    "If occupying accomodation in any other station, indicate place whether separated family/peace station and date of occupation";

  const FAMILY_STAYED =
    "During the period my family stayed under (given details)";

  const sendSms = async ({
    message = "Welcome to MHOW",
    number = params?.mobile,
  }) => {
    try {
      setLoading(true);
      const response = await fetch(API_URL.send, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, number }),
      });
    } catch (error) {
      console.error("Error sending message--> ", error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      if (!agreed) {
        alert(AGREE_TERMS);
        return;
      }

      setLoading(true);
      const response = await fetch(API_URL.addUser, {
        method: "POST",
        headers: headerJson,
        body: JSON.stringify({
          years,
          months,
          days,
          unitArea1,
          unitArea2,
          from1,
          from2,
          to1,
          to2,
          occupiedAccom,
          familyStay,
          familyStay2,
          vehMake,
          vehRegistration,
          preference1,
          preference2,
          preference3,
          agreed,
          mobile: params?.number,
        }),
      });

      if (response.ok) {
        await sendSms({ message: WELCOME_MESSAGE, number: params?.number });
        alert(WELCOME_MESSAGE);
        setTimeout(() => navigation("/"));
      }
    } catch (error) {
      console.error("Add USER Error--> ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <CustomInput
        title={OCCUPIED_ACCOMODATION}
        placeholder="Please define here"
        point="01. "
        value={occupiedAccom}
        setText={(text) => setOccupiedAccom(text)}
      />

      <h4 style={{ marginTop: "20px", color: "white" }}>
        In accordance with SQC rules, I claim/do not claim ante date of{" "}
        {displayYears} Years {displayMonths} Months {displayDays} Days Ante date
        Fd Seniority cert is att. The cert must be signed consigned by Stn HQ.
      </h4>
      <div className="row-container">
        <CustomInput
          setText={(text) => setYears(text)}
          title="Years"
          width={50}
          value={years}
        />
        <CustomInput
          setText={(text) => setMonths(text)}
          title="Months"
          width={50}
          value={months}
        />
        <CustomInput
          setText={(text) => setDays(text)}
          title="Days"
          width={50}
          value={days}
        />
      </div>

      <h4 style={{ marginTop: "20px", color: "white" }}>
        I have served prior to my posting at MHOW in operational areas as under,
        and I did not stay with family for a period of 3 months or more at any
        time during the period mentioned above (Fd Area cert for last duty stn
        att):-
      </h4>

      <div className="row-container">
        <CustomInput
          setText={(text) => setUnitArea1(text)}
          title="Unit Area"
          width={70}
          value={unitArea1}
        />
        <CustomInput
          setText={(text) => setFrom1(text)}
          title="From"
          width={70}
          value={from1}
        />
        <CustomInput
          setText={(text) => setTo1(text)}
          title="To"
          width={70}
          value={to1}
        />
      </div>
      <div className="row-container">
        <CustomInput
          setText={(text) => setUnitArea2(text)}
          title="Unit Area"
          width={70}
          value={unitArea2}
        />
        <CustomInput
          setText={(text) => setFrom2(text)}
          title="From"
          width={70}
          value={from2}
        />
        <CustomInput
          setText={(text) => setTo2(text)}
          title="To"
          width={70}
          value={to2}
        />
      </div>
      <div style={{ marginTop: "20px" }} />
      <CustomInput
        title={FAMILY_STAYED}
        placeholder="Please define here"
        point="i) "
        setText={(text) => setFamilyStay(text)}
        value={familyStay}
      />
      <CustomInput
        title={FAMILY_STAYED}
        placeholder="Please define here"
        point="ii) "
        setText={(text) => setFamilyStay2(text)}
        value={familyStay2}
      />

      <h4 style={{ marginTop: "20px", color: "white" }}>
        Details of convinience held (Give Make and Veh Registration number.)
      </h4>

      <div className="row-container">
        <CustomInput
          setText={(text) => setVehMake(text)}
          title="Vehicle Make"
          point="i) "
          width={70}
          value={vehMake}
        />
        <CustomInput
          setText={(text) => setVehRegistration(text)}
          title="Vehicle Registration number"
          point="ii) "
          width={70}
          value={vehRegistration}
        />
      </div>

      <h4 style={{ marginTop: "20px", color: "white" }}>
        (NOTE: Through endeavor will be made to accomodate on request based on
        Preference. However Preference of accn mentioned by Offris not a
        guarentee for almt of accn at preferred locality/Enclave).
      </h4>

      <div className="row-container">
        <CustomInput
          setText={(text) => setPreference1(text)}
          title="Preference 1"
          point="i) "
          width={90}
          value={preference1}
        />
        <CustomInput
          setText={(text) => setPreference2(text)}
          title="Preference 2"
          point="ii) "
          width={90}
          value={preference2}
        />
        <CustomInput
          setText={(text) => setPreference3(text)}
          title="Preference 3"
          point="ii) "
          width={90}
          value={preference3}
        />
      </div>

      <div className="row-around">
        <input
          type="checkbox"
          value={agreed}
          onClick={() => setAgreed(!agreed)}
          placeholder="Agree"
          className="check-box"
        />
        <h4 style={{ marginTop: "20px", color: "white" }}>
          I hereby agreed to abide by rules, regulations and bylaws and
          subsewuent amendments, related with the accn alloted to me incl the
          colony/residential area association bylaws in existence, or as and
          when formed under the instructions of Stn HQ.
        </h4>
      </div>
      <div className="button-container">
        <button
          type="button"
          className="button-submit"
          // onClick={handleSubmit}
          onClick={addUser}
        >
          Next
        </button>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default ServiceHistory;
