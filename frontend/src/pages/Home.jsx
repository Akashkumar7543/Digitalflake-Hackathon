import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[680px]">
      <div className="flex flex-col items-center">
        <img src={logo} alt="digitalflake" className="h-[53px] mb-1" />

        <div className="flex items-center">
          <span className="text-[#1F2A44] text-[46px] font-extrabold tracking-tight">
            digital
          </span>
          <span className="text-[#1F2A44] text-[36px] font-semibold tracking-tight">
            flake
          </span>
        </div>

        <p className="mt-3 text-black text-[28px] text-center">
          Welcome to Digitalflake admin
        </p>
      </div>
    </div>
  );
}
