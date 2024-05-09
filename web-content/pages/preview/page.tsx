import dynamic from "next/dynamic";

const PreviewComponent = dynamic(() => import('../components/preview/PreviewComponent'), {
  ssr: false
})


export default function Preview() {
  return <>
    <PreviewComponent />
  </>
}