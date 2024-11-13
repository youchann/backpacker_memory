import useSWR, { SWRResponse, SWRConfiguration, Key } from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "omit",
  }).then((r) => r.json());

export function useFetcher<Data = any, Error = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  key: Key,
  config?: SWRConfiguration<Data, Error>,
): SWRResponse<Data, Error> {
  return useSWR<Data, Error>(key, fetcher, config);
}
