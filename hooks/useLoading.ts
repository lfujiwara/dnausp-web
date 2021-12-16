import { useState } from "react";

type state = "stale" | "loading" | "loaded" | "error";

export const useLoadingState = (initialState: state = "stale") => {
  const [state, setState] = useState(initialState);

  const setLoading = () => setState("loading");
  const setLoaded = () => setState("loaded");
  const setError = () => setState("error");

  const isLoading = state === "loading";
  const isLoaded = state === "loaded";
  const isError = state === "error";
  const isStale = state === "stale";

  return {
    state,
    setLoading,
    setLoaded,
    setError,
    isLoading,
    isLoaded,
    isError,
    isStale,
  };
};
