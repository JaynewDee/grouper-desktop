import { useEffect, useState } from "react";
import { GroupsObject, StudentType } from "../Types";

export const fileToString = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });

type AvgsObject = { [key: number]: number } | {};

export const useGroupAvgs = (input: GroupsObject) => {
  const [avgs, setAvgs] = useState<AvgsObject>({});
  useEffect(() => {
    const avgsStruct = Object.values(input).reduce(
      (acc: AvgsObject, v: StudentType[], idx: number) => ({
        ...acc,
        [idx + 1]: (
          v.reduce(
            (acc: number, student: StudentType) => acc + student.avg,
            0
          ) / v.length
        ).toFixed(2)
      }),
      {}
    );
    setAvgs(avgsStruct);
  }, [avgs]);

  return [avgs, setAvgs];
};
