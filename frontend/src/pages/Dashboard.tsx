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
  const [mobileOpen, setMobileOpen] = useState(false);
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
      {/* Desktop sidebar */}
      <div className='hidden md:block'>
        <SideBar selected={selected} onSelect={setSelected} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className='fixed inset-0 z-40'>
          <div className='absolute inset-0 bg-black/30' onClick={() => setMobileOpen(false)} />
          <SideBar selected={selected} onSelect={(v)=>{ setSelected(v); setMobileOpen(false); }} onClose={()=>setMobileOpen(false)} className='z-50 transition-transform duration-300 translate-x-0' />
        </div>
      )}

      <div className='p-4 md:ml-72 min-h-screen bg-gray-100 border transition-colors'>
        <CreateContentModel open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center gap-2'>
            <button className='md:hidden px-3 py-2 rounded-md bg-purple-200 text-purple-600 transition-all duration-200 active:scale-[0.98]' onClick={()=>setMobileOpen(true)}>Menu</button>
            <h1 className='text-xl text-gray-700'>Your Brain</h1>
          </div>
          <div className='flex justify-end gap-2 sm:gap-4 flex-wrap'>
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

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filtered.map(({ type, link, title }, idx) => (
            <div key={idx} className='opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]' style={{ animationDelay: `${idx * 60}ms` }}>
              <Card title={title} type={type as any} link={link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
