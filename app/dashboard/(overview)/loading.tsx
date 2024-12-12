import { JSX } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";
const Loading: React.FC = () => {
    return (
        <div className="">
            <DashboardSkeleton />
        </div>
    );
};

export default Loading;
