import React from 'react'
import '../css/Form.css'

export default function form() {
  
  return (
    <section className="form-section">
      
            <form className="form">
                <textarea
                    type="text"
                    name="content"
                    id="content"
                    className="content"
                    placeholder ="what's happening?">
                </textarea>
                <button className="bnt" type="submit">Post</button>
            </form>

    </section>
  )
}
