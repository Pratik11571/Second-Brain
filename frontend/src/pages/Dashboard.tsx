import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { ToastContainer, toast } from 'react-toastify';
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<"all" | "twitter" | "youtube" | "instagram" | "text" | "document">("all");
  const { contents, refresh } = useContent()

  useEffect(() => {
    refresh();
  }, [modalOpen])

  const filtered = useMemo(() => {
    if (selected === "all") return contents;
    // @ts-ignore backend returns string type
    return contents.filter((c) => c.type === selected)
  }, [contents, selected])

  return (
    <div>
      <ToastContainer/>
      <SideBar selected={selected} onSelect={setSelected} />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border'>
        <CreateContentModel open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <div className='flex items-center justify-between pb-4'>
          <h1 className='text-xl text-gray-700'>Your Brain</h1>
          <div className='flex justify-end gap-4'>
            <Button variant='primary' text='Add content' startIcon={<PlusIcon />} onClick={() => { setModalOpen(true) }} />
            <Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              })
              const url = `${BACKEND_URL}/api/v1/share/${response.data.hash}`
              await navigator.clipboard.writeText(url)
              toast.success(`Copied!...${url}`)
            }} variant='secondary' text='Share Brain' startIcon={<ShareIcon />} />
          </div>
        </div>

        <div className='flex gap-4 flex-wrap'>
          {filtered.map(({ type, link, title }, idx) => (
            <Card key={idx} title={title} type={type as any} link={link} />
          ))}
        </div>
      </div>
    </div>
  )
}
