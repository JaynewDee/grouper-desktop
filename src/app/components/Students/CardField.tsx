import { StudentType } from "./StudentCard";

const splitName = (fullName: string) => fullName.split(", ");

export const Fields = (data: StudentType) => {
  const [last, first] = splitName(data.name);

  const fields = ["Student", "GPA", "Group", "Email"];

  return fields.map((field, idx) => (
    <div className="student-field-set" key={idx}>
      <h4 className="student-field-header">{field}</h4>
      <p className="student-field">
        {field === "Student" ? (
          <>
            {first}
            <br />
            {last}
          </>
        ) : field === "GPA" ? (
          <>{data.avg}%</>
        ) : field === "Group" ? (
          <>{data.group === 0 ? "UNASSIGNED" : data.group}</>
        ) : (
          <>{data.email}</>
        )}
      </p>
    </div>
  ));
};
