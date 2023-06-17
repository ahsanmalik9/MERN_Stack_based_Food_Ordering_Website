import React from 'react'
import ReactDom from 'react-dom'

//CSS STYLING
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(  // Create POrtal ( Abhi tk jo kam ho raha wo index.html me id root k andr ho raha means isi k andr bar bar pagr work kr raha lekin agy aik or root bnana ho wo b single page to is k liye hm Modal use krty hain or phir index.hrml me aik or div id rrot bnaty hain)
    // This modal create a seperate div which overlay the first div 
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}