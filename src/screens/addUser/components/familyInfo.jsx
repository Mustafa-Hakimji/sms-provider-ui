import React from "react";
import "../styles.css";
import CustomInput from "../../../components/customInput";
import Toggler from "../../../components/toggler";
import { API_URL, headerJson } from "../../../utils/apis";
import Loading from "../../../components/loading";
import { DEPENDENT_NAME, WIFE_NAME } from "../../../utils/constants/messages";

class FamilyInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wifeName: "",
      children1: "",
      children2: "",
      children1Age: "",
      children2Age: "",
      marriageDate: "",
      dependent1: "",
      dependent2: "",
      dependent3: "",
      dependent4: "",
      dependent1Relation: "",
      dependent2Relation: "",
      dependent3Relation: "",
      dependent4Relation: "",
      isMarried: true,
      isDependent: false,
      mobile: this.props?.number,
      loading: false,
    };
  }

  setMarried = (val) => {
    this.setState({ isMarried: val });
  };

  setStateCommon = (stateName, value) => {
    this.setState({ [stateName]: value });
  };
  render() {
    const { inputWidth } = this.props;
    const smallInput = 50;

    const addUser = async () => {
      try {
        const {
          wifeName,
          children1,
          children2,
          children1Age,
          children2Age,
          marriageDate,
          dependent1,
          dependent2,
          dependent3,
          dependent4,
          isMarried,
          isDependent,
          dependent1Relation,
          dependent2Relation,
          dependent3Relation,
          dependent4Relation,
          mobile,
        } = this.state;

        if (isMarried && !wifeName) {
          alert(WIFE_NAME);
          return;
        }

        if (isDependent && !dependent1) {
          alert(DEPENDENT_NAME);
          return;
        }

        this.setStateCommon("loading", true);

        const response = await fetch(API_URL.addUser, {
          method: "POST",
          headers: headerJson,
          body: JSON.stringify({
            wifeName,
            children1,
            children2,
            children1Age,
            children2Age,
            marriageDate,
            dependent1,
            dependent2,
            dependent3,
            dependent4,
            isMarried,
            isDependent,
            dependent1Relation,
            dependent2Relation,
            dependent3Relation,
            dependent4Relation,
            mobile,
          }),
        });

        if (response.ok) {
          const fromattedResponse = await response.json();
          g(fromattedResponse);
          this.props.setStep(3);
        }
      } catch (error) {
        console.warn("Add USER Error--> ", error);
      } finally {
        this.setStateCommon("loading", false);
      }
    };

    const {
      wifeName,
      children1,
      children2,
      children1Age,
      children2Age,
      marriageDate,
      dependent1,
      dependent2,
      dependent3,
      dependent4,
      isMarried,
      isDependent,
      dependent1Relation,
      dependent2Relation,
      dependent3Relation,
      dependent4Relation,
      loading,
    } = this.state;
    return (
      <div className="add-main-container">
        <Toggler
          title1={"Married"}
          title2={"Unmarried"}
          selected1={isMarried}
          selected2={!isMarried}
          onClick1={() => this.setMarried(true)}
          onClick2={() => this.setMarried(false)}
        />
        {isMarried && (
          <>
            <div className="row-container">
              <CustomInput
                width={inputWidth}
                title="Wife Name"
                placeholder="Enter name"
                type="text"
                value={wifeName}
                setText={(text) => this.setStateCommon("wifeName", text)}
                inputNote
              />
              <CustomInput
                width={inputWidth}
                title="Marrige Date"
                placeholder="Enter date"
                type="date"
                value={marriageDate}
                setText={(text) => this.setStateCommon("marriageDate", text)}
                inputNote
              />
            </div>

            <div className="row-container">
              <CustomInput
                width={inputWidth}
                title="Children 1 Name"
                placeholder="Enter name"
                type="text"
                value={children1}
                setText={(text) => this.setStateCommon("children1", text)}
                inputNote
              />

              <CustomInput
                width={inputWidth}
                title="Children 2 Name"
                placeholder="Enter name"
                type="text"
                value={children2}
                setText={(text) => this.setStateCommon("children2", text)}
                inputNote
              />
            </div>
            <div className="row-container">
              <CustomInput
                width={inputWidth}
                title="Children 1 Age"
                placeholder="Enter age"
                type="text"
                value={children1Age}
                setText={(text) => this.setStateCommon("children1Age", text)}
                inputNote
              />
              <CustomInput
                width={inputWidth}
                title="Children 2 Age"
                placeholder="Enter age"
                type="text"
                value={children2Age}
                setText={(text) => this.setStateCommon("children2Age", text)}
                inputNote
              />
            </div>
          </>
        )}

        <Toggler
          title1={"Dependents"}
          title2={"No Dependents"}
          selected1={isDependent}
          selected2={!isDependent}
          onClick1={() => this.setStateCommon("isDependent", true)}
          onClick2={() => this.setStateCommon("isDependent", false)}
        />

        {isDependent && (
          <>
            <div className="row-container">
              <CustomInput
                width={smallInput}
                title="Dependent 1"
                placeholder="Enter name"
                type="text"
                value={dependent1}
                setText={(text) => this.setStateCommon("dependent1", text)}
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 2"
                placeholder="Enter name"
                type="text"
                value={dependent2}
                setText={(text) => this.setStateCommon("dependent2", text)}
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 3"
                placeholder="Enter name"
                type="text"
                value={dependent3}
                setText={(text) => this.setStateCommon("dependent3", text)}
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 4"
                placeholder="Enter name"
                type="text"
                value={dependent4}
                setText={(text) => this.setStateCommon("dependent4", text)}
                inputNote
              />
            </div>

            <div className="row-container">
              <CustomInput
                width={smallInput}
                title="Dependent 1 Relation"
                placeholder="Enter relation"
                type="text"
                value={dependent1Relation}
                setText={(text) =>
                  this.setStateCommon("dependent1Relation", text)
                }
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 2 Relation"
                placeholder="Enter relation"
                type="text"
                value={dependent2Relation}
                setText={(text) =>
                  this.setStateCommon("dependent2Relation", text)
                }
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 3 Relation"
                placeholder="Enter relation"
                type="text"
                value={dependent3Relation}
                setText={(text) =>
                  this.setStateCommon("dependent3Relation", text)
                }
                inputNote
              />
              <CustomInput
                width={smallInput}
                title="Dependent 4 Relation"
                placeholder="Enter relation"
                type="text"
                value={dependent4Relation}
                setText={(text) =>
                  this.setStateCommon("dependent4Relation", text)
                }
                inputNote
              />
            </div>
          </>
        )}
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

export default FamilyInfo;
