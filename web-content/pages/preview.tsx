import dynamic from 'next/dynamic';

const PreviewComponent = dynamic(() => import('@/components/preview/PreviewComponent'), {
  ssr: false
})

const Preview = () => {
  return (
    <PreviewComponent />
  )
}

export default Preview;