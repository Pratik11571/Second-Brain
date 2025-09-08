import { useEffect, useState } from 'react'
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
  const { contents, refresh } = useContent()

  useEffect(() => {
    refresh();
  }, [modalOpen])
  return (
    <div>
      <ToastContainer/>
      <SideBar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border'>
        <CreateContentModel open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />
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
            navigator.clipboard.writeText(url)
              .then(() => {
                console.log('Text copied to clipboard successfully!');
              })
              .catch(err => {
                console.error('Failed to copy text: ', err);
              });
            toast.success(`Copied!...${url}`)
          }} variant='secondary' text='Share Brain' startIcon={<ShareIcon />} />
        </div>

        <div className='flex gap-4 flex-wrap'>
          {contents.map(({ type, link, title }) => (

            <Card title={title} type={type} link={link} />

          ))}

        </div>
      </div>
    </div>
  )
}
