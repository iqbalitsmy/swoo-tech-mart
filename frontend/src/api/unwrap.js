// Shared helper: pulls `data.data` out of the API envelope.
export const unwrap = (request) => request.then(({ data }) => data.data);
