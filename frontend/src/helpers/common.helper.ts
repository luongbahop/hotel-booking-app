import getEnvVars from "environment";

const CONFIGS = getEnvVars();

export const buildUrl = (url: string, parameters: any): string => {
  let qs = "";
  for (let key in parameters) {
    let value = parameters[key];
    if (value !== "") {
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1);
    url = url + "?" + qs;
  }
  return url;
};

export const getImageUrl = (url: string | undefined): string => {
  if (!url) return "";
  return `${CONFIGS.API_URL}/uploads/${url}`;
};

// ** Build filter query
export const buildQuery = (params: any = {}, overrideParams = {}) => {
  let newParams: any = {
    isPaginate: false,
    // page: params?.page,
    // perPage: params?.perPage,
  };
  if (params.keyword) {
    newParams.keyword = params.keyword;
  }
  if (params.order) {
    newParams.order = params.order;
  }
  if (params.orderBy) {
    newParams.orderBy = params.orderBy;
  }
  if (params.status) {
    newParams.filter_key_1 = "status";
    newParams.filter_value_1 = params.status;
  }
  if (params.start_date) {
    newParams.start_date = params.start_date;
  }
  if (params.end_date) {
    newParams.end_date = params.end_date;
  }
  if (params.filter_date_by) {
    newParams.filter_date_by = params.filter_date_by;
  }
  if (params.category) {
    newParams.filter_key_2 = "post_cate_id";
    newParams.filter_value_2 = params.category;
  }
  if (params.author) {
    newParams.filter_key_3 = "created_by";
    newParams.filter_value_3 = params.author;
  }
  if (typeof params.gender !== "undefined" && params.gender !== "") {
    newParams.filter_key_4 = "gender";
    newParams.filter_value_4 = params.gender;
  }
  return { ...newParams, ...overrideParams };
};
