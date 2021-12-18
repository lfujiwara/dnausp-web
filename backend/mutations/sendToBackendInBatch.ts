import { useAxios } from "../../hooks/axios";
import { Empresa } from "@dnausp/core";
import Queue from "queue-promise";
import { EmpresaJsonSerializer } from "../../lib/serializers/json/empresa.json-serializer";

export const useSendToBackendInBatch = () => {
  const axios = useAxios();

  return (
    empresas: Empresa[]
  ): Promise<{
    okCount: number;
    errorCount: number;
    totalCount: number;
  }> => {
    if (!empresas)
      return Promise.resolve({
        okCount: 0,
        errorCount: 0,
        totalCount: 0,
      });
    const queue = new Queue({
      concurrent: 5,
      start: false,
    });
    const requestBatchSize = 10;

    const batches = empresas.reduce((acc, empresa, index) => {
      if (index % requestBatchSize === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(empresa);
      return acc;
    }, [] as Empresa[][]);

    let okCount = 0;
    let errorCount = 0;
    let totalCount = empresas.length;

    const push = (ok, error) => {
      okCount += ok;
      errorCount += error;
    };

    queue.enqueue(
      batches.map(
        (empresasFromBatch) => () =>
          axios
            .put(
              "/empresas",
              empresasFromBatch.map(EmpresaJsonSerializer.serialize)
            )
            .then((res) => {
              const ok = res.data?.ok || [];
              const errors = res.data?.fail || [];
              push(ok.length, errors.length);
            })
      )
    );

    queue.start();

    return new Promise<{
      okCount: number;
      errorCount: number;
      totalCount: number;
    }>((resolve, reject) => {
      setTimeout(() => {
        reject("Timeout");
      }, 60 * 1000);
      queue.on("end", () => {
        resolve({ okCount, errorCount, totalCount });
      });
      queue.on("error", (err) => {
        reject(err);
      });
    });
  };
};
