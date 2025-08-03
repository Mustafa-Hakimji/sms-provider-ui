import React from "react";
import "../styles.css";
import CustomInput from "../../../components/customInput";
import { API_URL, headerJson } from "../../../utils/apis";
import Loading from "../../../components/loading";
import { ALL_FIELDS_ARE_REQUIRED } from "../../../utils/constants/messages";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ic: "",
      rank: "",
      name: "",
      cdaAcNo: "",
      unit: "",
      appointment: "",
      mobile: this.props?.number || "",
      reportingDate: "",
      dob: "",
      commissionDate: "",
      accnDate: "",
      loading: false,
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
          name,
          cdaAcNo,
          unit,
          appointment,
          mobile,
          reportingDate,
          dob,
          commissionDate,
          accnDate,
        } = this.state;

        if (
          !ic ||
          !rank ||
          !name ||
          !cdaAcNo ||
          !unit ||
          !appointment ||
          !mobile ||
          !reportingDate ||
          !dob ||
          !commissionDate ||
          !accnDate
        ) {
          alert(ALL_FIELDS_ARE_REQUIRED);
          return;
        }
        this.setStateCommon("loading", true);

        const response = await fetch(API_URL.addUser, {
          method: "POST",
          headers: headerJson,
          body: JSON.stringify({
            ic,
            rank,
            name,
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
          this.props.setStep(2);
        }
      } catch (error) {
        console.error("Add USER Error--> ", error);
      } finally {
        this.setStateCommon("loading", false);
      }
    };

    const {
      ic,
      rank,
      name,
      cdaAcNo,
      unit,
      appointment,
      mobile,
      reportingDate,
      dob,
      commissionDate,
      accnDate,
      loading,
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
            value={name}
            setText={(text) => this.setStateCommon("name", text)}
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
            type="date"
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
            type="date"
            value={dob}
            setText={(text) => this.setStateCommon("dob", text)}
            inputNote
          />
          <CustomInput
            width={inputWidth}
            title="Date of commission & seniority"
            placeholder="Enter commission date"
            type="date"
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
            type="date"
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
        {loading && <Loading />}
      </div>
    );
  }
}

export default UserInfo;
