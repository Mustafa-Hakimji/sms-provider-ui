import { useRef } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";

const UserData = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const state = location.state || {};
  const data = state.item;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-wrapper">
      <div className="invoice-toolbar">
        <h1>Personnel Detail Sheet</h1>
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      <div className="invoice-card" ref={printRef}>
        <div className="invoice-section">
          <h2>Personal Information</h2>
          <Row label="IC" value={data.ic} />
          <Row label="Rank" value={data.rank} />
          <Row label="Name" value={data.name} />
          <Row label="Mobile" value={data.mobile} />
          <Row label="CDA Account No." value={data.cdaAcNo} />
          <Row label="Unit" value={data.unit} />
          <Row label="Appointment" value={data.appointment} />
          <Row label="Reporting Date" value={data.reportingDate} />
          <Row label="Date of Birth" value={data.dob} />
          <Row label="Commission Date" value={data.commissionDate} />
          <Row label="Accn Date" value={data.accnDate} />
        </div>

        <div className="invoice-section">
          <h2>Family & Dependents</h2>
          <Row label="Marriage Date" value={data.marriageDate} />
          <Row label="Is Married" value={data.isMarried ? "Yes" : "No"} />
          <Row label="Wife Name" value={data.wifeName} />
          <Row
            label="Children 1"
            value={`${data.children1} (${data.children1Age} yrs)`}
          />
          <Row
            label="Children 2"
            value={`${data.children2} (${data.children2Age} yrs)`}
          />
          <Row
            label="Dependent 1"
            value={`${data.dependent1} (${data.dependent1Relation})`}
          />
          <Row
            label="Dependent 2"
            value={`${data.dependent2} (${data.dependent2Relation})`}
          />
          {data.dependent3 && (
            <Row
              label="Dependent 3"
              value={`${data.dependent3} (${data.dependent3Relation})`}
            />
          )}
          {data.dependent4 && (
            <Row
              label="Dependent 4"
              value={`${data.dependent4} (${data.dependent4Relation})`}
            />
          )}
        </div>

        <div className="invoice-section">
          <h2>Service Info</h2>
          <Row
            label="Total Duration"
            value={`${data.years} yrs, ${data.months} mo, ${data.days} d`}
          />
          <Row label="Unit Area 1" value={data.unitArea1} />
          <Row label="From" value={data.from1} />
          <Row label="To" value={data.to1} />
          <Row label="Unit Area 2" value={data.unitArea2} />
          <Row label="From" value={data.from2} />
          <Row label="To" value={data.to2} />
          <Row label="Accommodation" value={data.occupiedAccom} />
          <Row label="Family Stay 1" value={data.familyStay} />
          <Row label="Family Stay 2" value={data.familyStay2} />
        </div>

        <div className="invoice-section">
          <h2>Vehicle & Preferences</h2>
          <Row label="Vehicle Make" value={data.vehMake} />
          <Row label="Vehicle Reg. No." value={data.vehRegistration} />
          <Row label="Preference 1" value={data.preference1} />
          <Row label="Preference 2" value={data.preference2} />
          <Row label="Preference 3" value={data.preference3} />
          <Row label="Agreed" value={data.agreed ? "Yes" : "No"} />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="invoice-row">
    <div className="label">{label}</div>
    <div className="value">{value || "-"}</div>
  </div>
);

export default UserData;
