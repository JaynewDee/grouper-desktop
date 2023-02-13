import React from "react";

const StudentCard = ({ data }: { data: any }) => {
  return (
    <div className="student-card">
      <div>
        <h4 className="student-field-header">Student Name:</h4>
        <p className="student-field">{data.name}</p>
      </div>
      <div>
        <h4 className="student-field-header">Email:</h4>
        <p className="student-field">{data.email}</p>
      </div>
      <div>
        <h4 className="student-field-header">GPA:</h4>
        <p className="student-field">{data.avg}%</p>
      </div>
      <div>
        <h4 className="student-field-header">Group:</h4>
        <p>{data.group}</p>
      </div>
    </div>
  );
};

export default StudentCard;
