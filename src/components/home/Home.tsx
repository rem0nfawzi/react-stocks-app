import { Link } from "react-router";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 container">
      <Link to="/stocks">
        <img
          src="/images/logo.png"
          className="max-w-full"
          width={303}
          height={87}
          alt="See stocks"
        />
      </Link>
      <p className="text-neutral-200">
        Click on the logo to see the stocks page
      </p>
      <p className="text-sm text-white absolute bottom-4 left-4 italic">
        By:{" "}
        <a
          href="https://www.linkedin.com/in/rem0nfawzi/"
          className="font-bold capitalize"
        >
          remon fawzi
        </a>
      </p>
    </div>
  );
};

export default Home;
