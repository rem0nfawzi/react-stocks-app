interface ErrorProps {
  error: string;
}
const Error = ({ error }: ErrorProps) => {
  return <p className="my-8 text-lg font-bold">{error}</p>;
};

export default Error;
