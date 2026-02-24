import React from "react";
import InspectionForm from "../../sections/inspectionsForm/InspectionForm";

export default function FormLanding({ user }) {
  return (
    <div className="form-landing-page">
      <InspectionForm user={user} />
    </div>
  );
}
