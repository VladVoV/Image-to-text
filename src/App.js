import React, {useState, useEffect} from 'react';
import Tesseract from 'tesseract.js';

import './style.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [checkedFirst, setCheckedFirst] = useState(true);
  const [checkedSecond, setCheckedSecond] = useState(false);
  const [language, setLanguage] = useState('');


  useEffect(()=>{
      if(checkedFirst === true){
          setLanguage('eng');
      }
      if(checkedSecond === true){
          setLanguage('ukr');
      }
  }, [checkedFirst, checkedSecond])
    async function alertMessage() {
      await alert("You need to select jpg or png file!");
            window.location.reload(false);
    }
  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, language, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
        .catch((err) => {
          console.error(err);
            alertMessage()
        })
        .then((result) => {
          console.log(result.data);
          setText(result.data.text);
          setIsLoading(false);
        });
  };

  const handleChange = () => {
      setCheckedFirst(!checkedFirst);
      setCheckedSecond(!checkedSecond);
  }
    function refreshPage() {
        window.location.reload(false);
    }


  return (
      <div className="container" style={{ height: '100vh' }}>
        <div className="row h-100">
          <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
            {!isLoading && !text &&(
                <>
                <h1 className="text-center py-4 mc-5">Converting image to text</h1>
                    <div className="text-center py-0 mc-5">Select your photo and press the button to convert it for copyable text</div>
                </>
            )}
            {isLoading && (
                <>
                  <progress className="form-control" value={progress} max="100">
                    {progress}%{' '}
                  </progress>{' '}
                  <p className="text-center py-0 my-0">Converting:- {progress} %</p>
                </>
            )}
            {!isLoading && !text && (
                <>
                  <input
                      type="file"
                      onChange={(e) =>
                          setImage(URL.createObjectURL(e.target.files[0]))
                      }
                      className="form-control mt-5 mb-2"
                  />
                    <div className="container">
                    <div className="form-control mt-3 row">
                        <div className="form-check col">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={checkedFirst}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault">
                                English language
                            </label>
                        </div>
                        <div className="form-check col">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={checkedSecond}
                                onChange={handleChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault">
                                Ukrainian language
                            </label>
                        </div>
                    </div>
                    </div>
                  <input
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-primary mt-4"
                      value="Convert"
                  />

                </>
            )}
            {!isLoading && text && (
                <>
              <textarea
                  className="form-control w-100 mt-5"
                  rows="30"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
              ></textarea>
                    <input
                        type="button"
                        onClick={refreshPage}
                        className="btn btn-primary mt-5 refreshButton"
                        value ="Main Page"
                    />
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default App;