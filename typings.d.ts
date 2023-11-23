type WithData<T> = {
  data: T;
};

type ServiceResponse<T, S> = {
  code: S;
  data: T | null;
};
