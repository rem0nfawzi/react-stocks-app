const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center container">
      <img src="/images/logo.png" width={303} height={87} alt="See stocks" />
      <p className="text-sm text-white absolute bottom-4 left-4 italic">
        By:{" "}
        <a href="" className="font-bold capitalize">
          remon fawzi
        </a>
      </p>
    </div>
  );
};

export default Home;
