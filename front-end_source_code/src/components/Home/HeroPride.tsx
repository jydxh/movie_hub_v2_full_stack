import snowIcon from "@/assets/snow_icon.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function HeroPride() {
	return (
		<section className="w-full h-[25rem] relative bg-gradient-to-r from-yellow-500 from-10% via-orange-600 via-45% to-pink-500 to-90%">
			<div className="absolute top-[1.4rem] left-[1.4rem]">
				<img src={snowIcon} alt="snow icon" className="w-[1.4rem]" />
			</div>
			<div className="absolute top-[1.4rem] right-[1.4rem]">
				<img src={snowIcon} alt="snow icon" className="w-[1.4rem]" />
			</div>
			<div className="absolute bottom-[1.4rem] right-[1.4rem]">
				<img src={snowIcon} alt="snow icon" className="w-[1.4rem]" />
			</div>
			<div className="absolute left-[1.4rem] bottom-[1.4rem]">
				<img src={snowIcon} alt="snow icon" className="w-[1.4rem]" />
			</div>
			<div className="flex justify-center items-center w-full h-full">
				<div className="border-2 border-white w-[94%] h-[84%] rounded-[6rem] flex justify-center items-center">
					<div className="border-2 border-white w-[94%] h-[94%] rounded-[6rem] flex justify-center items-center">
						<div className="border-2 border-white w-[94%] h-[94%] rounded-[6rem] flex flex-col justify-center items-center">
							<h3 className="uppercase  md:text-2xl text-sm  md:tracking-[1.4rem] tracking-[1rem] mb-8 flex items-center justify-center  gap-x-2 lg:gap-x-8">
								<p className="text-center">the</p>

								<span className="font-serif tracking-normal lg:text-8xl md:text-6xl text-4xl border-b-2 font-bold">
									pride
								</span>

								<p className="text-center relative left-4">list</p>
							</h3>
							<p className="italic text-sm md:text-base">
								A list of some of the best in genre in celebration of Pride
								Month.
							</p>
							<Button className="border-2 border-white rounded-full px-6 py-[0.8rem] mt-8 font-semibold hover:text-blue-600">
								<Link to="/trailers">Check out the list</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default HeroPride;
