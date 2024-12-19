import { useSearchParams } from "next/navigation";

const useGetAllSearchParams = () => {
  const searchParams = useSearchParams();
  const params: { [anyProp: string]: string } = {};
  const results: { key: string; value: string }[] = [];

  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  Object.entries(params).forEach((el) => {
    if (el[1].includes(",")) {
      el[1].split(",").forEach((e) => results.push({ key: el[0], value: e }));
    } else {
      results.push({ key: el[0], value: el[1] });
    }
  });
  return results.filter((el) => !["mode", "page", "price"].includes(el.key));
};

export default useGetAllSearchParams;
