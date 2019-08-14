import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FetchData } from "./types";
/**
 * Fetches data from options using [[AxiosInstance.request]] and returns an [[Observable]] of type T
 * from the resulting AxiosRequest Promise or undefined if the response throws an error.
 *
 * TODO: Refactor returning undefined on error
 *
 * @param options   HTTP Request Options formatted as [[AxiosRequestConfig]]
 * @typeparam T   Specified type of expected response schema
 * @returns   Observable<T> | undefined on Error
 */
export const fetchData: FetchData = <T>(options: AxiosRequestConfig) => {
  try {
    /**
     * repsonse references the HTTP Request made from axios given options as a Promise<AxiosResponse>.
     */
    const response: Promise<AxiosResponse> = axios.request(options);
    /**
     * response$ references the Observable<AxiosResponse> created by  wrapping the promise as an observable.
     */
    const response$: Observable<AxiosResponse> = from(response);
    /**
     * data references the transformation of the AxiosResponse Object to the AxiosResponse data property asserted as type T.
     */
    const data$: Observable<T> = response$.pipe(map(res => res.data));

    return data$;
  } catch (err) {
    /**
     * Error is asserted as type AxiosError to check branches when error is thrown by Axios Request or Axios Response.
     */
    const error = err as AxiosError;
    if (error.response) {
      const { data, status, headers } = error.response;
      console.log(`Status: ${status}`);
      console.log(headers);
      console.log(data);
    } else if (error.request) {
      console.log(error.request);
      /**
       * When Error is not of type AxiosError, it is handled here
       */
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
};
