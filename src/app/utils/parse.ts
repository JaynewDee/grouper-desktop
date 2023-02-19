import { useEffect, useState } from "react";
import { Groups } from "../components/GroupsView";

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
type UseAvgsInput = Groups;

export const useGroupAvgs = (input: UseAvgsInput) => {
  const [avgs, setAvgs] = useState<AvgsObject>({});

  useEffect(() => {
    const avgsStruct = Object.values(input).reduce(
      (acc: AvgsObject, v, idx: number) => ({
        ...acc,
        [idx + 1]: (
          v.reduce((acc, student) => acc + student.avg, 0) / v.length
        ).toFixed(2)
      }),
      {}
    );
    setAvgs(avgsStruct);
  }, []);

  return [avgs, setAvgs];
};
