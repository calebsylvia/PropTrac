import dynamic from "next/dynamic";

const DynamicInfoPageComponent = dynamic(() => import('./InfoPage'), {
    ssr: false,
})

export default DynamicInfoPageComponent