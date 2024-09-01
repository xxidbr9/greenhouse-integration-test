import wretch from "wretch";
import FormDataAddon from "wretch/addons/formData";
import QueryStringAddon from "wretch/addons/queryString";

export const greenHouseApi = wretch(process.env.GREENHOUSE_API_URL, {
  mode: "cors",
})
  .addon(FormDataAddon)
  .addon(QueryStringAddon)
  .auth(`Basic ${process.env.GREENHOUSE_API_KEY}`)
  .headers({ "On-Behalf-Of": "4408763007" }) // HARVEST][API_KEY][9e9-7] OM GANDHI - Take home assignment Service Account
  .errorType("json")
  .resolve((r) => r.json());

export const localApi = wretch(process.env.NEXT_PUBLIC_LOCAL_URL + "/api", {
  mode: "cors",
})
  .addon(FormDataAddon)
  .addon(QueryStringAddon)
  .errorType("json")
  .resolve((r) => r.json());
