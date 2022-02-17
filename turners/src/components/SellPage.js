import React, {useState, useEffect, useLayoutEffect, useRef} from 'react'

export default function SellPage() {
    
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleImage, setVehicleImage] = useState('')
    const [prediction, setPrediction] = useState('')
    const [predictionOutcome, setPredictionOutcome] = useState('')
    const [base64image, setBase64Image] = useState('')
    const imageSelector = useRef(null)

    const submit = () => {
        console.log(imageSelector.current.files)
        console.log('change')           
            //when file reader has read image, save it in dataURL as a url which saves image data as base64 string
            let reader = new FileReader()
            console.log(reader)
            reader.onload = (e) => {
                console.log('reader.result')
                let dataURL = reader.result
                // set selectedImage src to dataURL so image is shown on DOM
                console.log(`data url = ${dataURL}`)
                setVehicleImage(dataURL)
                setBase64Image(formatImageString(dataURL))
                console.log(base64image)
            }
            if (imageSelector.current.files.length !== 0) {
              //read function occurs and then calls onload
              console.log(imageSelector.current.files[0])
              reader.readAsDataURL(imageSelector.current.files[0])

            }
      }

    //format image string 
    const formatImageString = (imageStr) => {
      console.log(imageStr.split('').splice(11, 3).join(''))
      if (imageStr.split('').splice(11, 3).join('') == 'jpe') {
          imageStr =  imageStr.replace('data:image/jpeg;base64,', '')
      } else if (imageStr.split('').splice(11, 3).join('') == 'png') {
          imageStr =  imageStr.replace('data:image/png;base64,', '')
      } else if (imageStr.split('').splice(11, 3).join('') == 'web') {
          imageStr = imageStr.replace('data:image/webp;base64,', '')
      }
          return imageStr
      }
    

    const predict = () => {
      console.log(vehicleImage)
      console.log(base64image)
      let message = {
          image: base64image
      }
      fetch('http://turnersai-env.eba-8jfh2nrg.us-east-1.elasticbeanstalk.com/predict', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(message)
      })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
          console.log(data)
  
        
  })}



  return (
    <div>
      <ul id='page-links-nav'>
          <li className='page-links-nav-item'>Find a car</li>
          <li className='page-links-nav-item'>Sell a car</li>
          <li className='page-links-nav-item'>Live auctions</li>
          <li className='page-links-nav-item' >Contact us</li>
        </ul>
        
        <img src={vehicleImage} id='vehicle-image' alt=''></img>


          <input id='image-selector' ref={imageSelector} type='file' />
          <button id='submit' onClick={submit}>Submit</button>
          <button id="predict-button" onClick={predict}>Predict</button>
          {/* <input id='vehicle-type' name='type' value={vehicleType} /> */}
          {/* <input id='vehicle-make' name='make' />
          <input id='vehicle-model' name='model'/>
          <input id='vehicle-color' name='color' /> */}
        
    </div>
  )
}
