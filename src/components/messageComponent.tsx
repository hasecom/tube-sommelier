import Link from 'next/link'

import { escapeHtml } from '@/func/escape'
type props = {
  message: string,
  isDisplayButton:boolean,
  buttonMessage?:string,
  linkPath?:string,
}
const messageComponent = (props:props)=> {
  return (
<div className="flex items-center justify-center">
  <div className="bg-white rounded-lg min-w-[60%] max-w-[600px] p-4 shadow m-4 text-center">
    <p className="text-black whitespace-pre-wrap">
    {escapeHtml(props.message || "")}
    </p>
    { props.isDisplayButton ?(
      <Link href={escapeHtml(props.linkPath || "") || ""}>
        <button className="bg-red-500 text-white rounded-lg px-4 py-2 m-7 hover:bg-red-600">
        {escapeHtml(props.buttonMessage || "")}</button>
      </Link>
    ):(<></>)}
  </div>
</div>
  )
}
export default messageComponent;