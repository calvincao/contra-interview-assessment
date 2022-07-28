/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import Textbox from '@/components/Textbox';
import Navbar from '@/components/Navbar';

const Index: NextPage = () => {
  const [modals, setModals] = useState([]);
  const openModal = () => {
    const largestZ = modals.reduce((pre, cur) => {
        return Math.max(pre, cur.styles.zIndex);
      }, 0);
    const newModal = {
      value: `${Math.floor(Math.random()*100)}`,
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: {zIndex: modals.length ? largestZ + 1 : 10},
    }
    setModals([...modals, newModal])
    document.getElementById('root')?.classList.toggle('blurred', true);
    document.querySelector('body')?.classList.toggle('scrollLock', true);
  }

  useEffect(() => {
    if (modals.length === 0){
      document.getElementById('root')?.classList.toggle('blurred', false);
      document.querySelector('body')?.classList.toggle('scrollLock', false);
    }
  }, [modals]);

  return (
    <div id='root'>
      <Navbar openModal={openModal}/>
      <Textbox/>
      {modals.map((modalObj, i) => (
        <Modal modals={modals} setModals={setModals} index={i} key={i} >{modalObj.value}</Modal>
      ))}
    </div>
  )
};

export default Index;
