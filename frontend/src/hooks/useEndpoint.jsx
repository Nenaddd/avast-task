/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useEndpoint = req => {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false,
  });

  useEffect(() => {
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false,
    });

    axios(req)
      .then(response =>
        setRes({
          data: response.data,
          pending: false,
          error: false,
          complete: true,
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true,
        })
      );
  }, [req?.url]);

  return res;
};

export default useEndpoint;
