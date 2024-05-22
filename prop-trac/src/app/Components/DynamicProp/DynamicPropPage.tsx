import dynamic from "next/dynamic";

const DynamicPropPageComponent = dynamic(() => import('./PropPage'), {
    ssr: false,
})

export default DynamicPropPageComponent