import React from "react";
import "../styles.css";
import CustomInput from "../../../components/customInput";
import { API_URL, headerJson } from "../../../utils/apis";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ic: "",
      rank: "",
      userName: "",
      cdaAcNo: "",
      unit: "",
      appointment: "",
      mobile: this.props?.number || "",
      reportingDate: "",
      dob: "",
      commissionDate: "",
      accnDate: "",
    };
  }

  setStateCommon = (stateName, value) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const { inputWidth } = this.props;

    const addUser = async () => {
      try {
        const {
          ic,
          rank,
          userName,
          cdaAcNo,
          unit,
          appointment,
          mobile,
          reportingDate,
          dob,
          commissionDate,
          accnDate,
        } = this.state;

        const response = await fetch(API_URL.addUser, {
          method: "POST",
          headers: headerJson,
          body: JSON.stringify({
            ic,
            rank,
            userName,
            cdaAcNo,
            unit,
            appointment,
            mobile,
            reportingDate,
            dob,
            commissionDate,
            accnDate,
          }),
        });

        if (response.ok) {
          const fromattedResponse = await response.json();
          console.log(fromattedResponse);
          this.props.setStep(2);
        }
      } catch (error) {
        console.log("Add USER Error--> ", error);
      }
    };

    const {
      ic,
      rank,
      userName,
      cdaAcNo,
      unit,
      appointment,
      mobile,
      reportingDate,
      dob,
      commissionDate,
      accnDate,
    } = this.state;
    return (
      <div className="add-main-container">
        <div className="row-container">
          <CustomInput
            width={inputWidth}
            title="IC"
            placeholder="Enter IC"
            type="text"
            value={ic}
            setText={(text) => this.setStateCommon("ic", text)}
            inputNote
          />
          <CustomInput
            width={inputWidth}
            title="Rank"
            placeholder="Enter Rank"
            type="text"
            value={rank}
            setText={(text) => this.setStateCommon("rank", text)}
            inputNote
          />
        </div>

        <div className="row-container">
          <CustomInput
            width={inputWidth}
            title="Name"
            placeholder="Enter Name"
            type="text"
            value={userName}
            setText={(text) => this.setStateCommon("userName", text)}
            inputNote
          />
          <CustomInput
            width={inputWidth}
            title="CDA (O) A/C No."
            placeholder="Enter CDA (O) A/C No."
            type="text"
            value={cdaAcNo}
            setText={(text) => this.setStateCommon("cdaAcNo", text)}
            inputNote
          />
        </div>

        <div className="row-container">
          <CustomInput
            width={inputWidth}
            title="Unit"
            placeholder="Enter Unit"
            type="text"
            value={unit}
            setText={(text) => this.setStateCommon("unit", text)}
            inputNote
          />
          <CustomInput
            width={inputWidth}
            title="Appointment"
            placeholder="Enter Appointmet"
            type="text"
            value={appointment}
            setText={(text) => this.setStateCommon("appointment", text)}
            inputNote
          />
        </div>

        <div className="row-container">
          <CustomInput
            width={inputWidth}
            title="Mobile"
            placeholder="Enter Mobile number"
            type="text"
            value={mobile}
            inputNote
            disabled
          />
          <CustomInput
            width={inputWidth}
            title="Date of reported"
            placeholder="Enter date of reported"
            type="text"
            value={reportingDate}
            setText={(text) => this.setStateCommon("reportingDate", text)}
            inputNote
          />
        </div>

        <div className="row-container">
          <CustomInput
            width={inputWidth}
            title="Date of birth"
            placeholder="Enter D.O.B."
            type="text"
            value={dob}
            setText={(text) => this.setStateCommon("dob", text)}
            inputNote
          />
          <CustomInput
            width={inputWidth}
            title="Date of commission & seniority"
            placeholder="Enter commission date"
            type="text"
            value={commissionDate}
            setText={(text) => this.setStateCommon("commissionDate", text)}
            inputNote
          />
        </div>

        <div className="row-container">
          <CustomInput
            width={40}
            title="Date from which accn is reqd"
            placeholder="Enter accn date"
            type="text"
            value={accnDate}
            setText={(text) => this.setStateCommon("accnDate", text)}
            inputNote
          />
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
      </div>
    );
  }
}

export default UserInfo;
