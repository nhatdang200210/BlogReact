import React from 'react'
import { Modal } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { modalState$ } from './Selector'

export default function CreateModalPost() {
    const {ishow} = useSelector(modalState$);
    console.log({ishow})
    const body = <p>This is body</p>
    
  return (
    <div>
        <Modal open={ishow} >
            {body}
        </Modal>
    </div>
  )
}
