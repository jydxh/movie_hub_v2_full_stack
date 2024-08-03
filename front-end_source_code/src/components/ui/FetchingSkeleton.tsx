import Skeleton from "@mui/material/Skeleton";

function FetchingSkeleton() {
	return Array.from({ length: 19 }, (_, index) => index).map(index => {
		return (
			<div key={index} className="w-[10rem] h-[24rem] mt-4 flex-shrink-0">
				<Skeleton variant="circular" width={40} height={40} />
				<Skeleton
					variant="rectangular"
					width={160}
					height={230}
					className="mt-4"
				/>
				<Skeleton variant="rounded" width={160} height={60} className="mt-4" />
			</div>
		);
	});
}
export default FetchingSkeleton;
