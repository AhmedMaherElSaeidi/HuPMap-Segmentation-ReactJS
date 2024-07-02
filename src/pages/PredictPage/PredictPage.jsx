import "./PredictPage.css";
import React, { useState } from "react";
import segmentMapper from "../../services/ai-segmentation";
import { GiReturnArrow } from "react-icons/gi";
import { FaCloudUploadAlt } from "react-icons/fa";
import IMGDash from "../../components/IMGDash/IMGDash";
import Spinner from "../../components/Spinner/Spinner";
import background_video from "../../assets/video/HuPMap.mp4";

const PredictPage = () => {
  const models = [
    { name: "Unet", method: "unet" },
    { name: "Scratch Unet", method: "unet_scratch" },
    { name: "Linknet", method: "linknet" },
    { name: "FCN", method: "fcn" },
    { name: "Ensemble", method: "ensemble" },
  ];
  const [inputsState, setInputsState] = useState({
    method: models[0].method,
    image: null,
    mask: null,
  });
  const [predictData, setPredictData] = useState({
    response: null,
    loading: false,
    err: false,
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length !== 2) return;

    setInputsState({
      ...inputsState,
      image: files[0],
      mask: files[1],
    });
    console.log(`image:, ${files[0].name}, mask: ${files[1].name}`);
  };
  const onSubmit = async () => {
    if (!predictData.loading) {
      try {
        if (!inputsState.image || !inputsState.mask) {
          alert("Hey, Two files are required.");
          return;
        }

        const request_data = new FormData();
        request_data.append("image", inputsState.image);
        request_data.append("mask", inputsState.mask);

        setPredictData({ ...predictData, loading: true });
        const response = await segmentMapper[inputsState.method](request_data);

        setPredictData({ ...predictData, loading: false, response });
      } catch (err) {
        setPredictData({ ...predictData, loading: false, err });
        alert(err.message);
      }
    }
  };
  const reset_predictData = () => {
    setPredictData({ ...predictData, response: null });
    setInputsState({ ...inputsState, image: null, mask: null });
  };

  return (
    <div className="predict-page">
      <div className="video-container">
        <video autoPlay muted loop id="video-background">
          <source src={background_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {!predictData.response && (
        <section className="form">
          <div className="form-box">
            <h2 className="mb-3">
              <FaCloudUploadAlt /> Segmentation
            </h2>
            <div className="selectBox mb-2">
              <select
                value={inputsState.method}
                onChange={(e) =>
                  setInputsState({ ...inputsState, method: e.target.value })
                }
              >
                {models.map((model, index) => (
                  <option key={index} value={model.method}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputBox">
              <input
                type="file"
                name="file"
                title="Select files"
                onChange={handleFileChange}
                multiple
              />
              <i></i>
            </div>
            <button
              type="button"
              className="btn-create"
              onClick={onSubmit}
              disabled={predictData.loading}
            >
              Upload
            </button>
          </div>
          {predictData.loading && <Spinner />}
        </section>
      )}
      {predictData.response && (
        <IMGDash
          plot_data={predictData.response.data}
          model_name={
            models.filter((value) => value.method === inputsState.method)[0]
              .name
          }
        />
      )}
      {predictData.response && (
        <button
          type="button"
          className="btn btn-warning mt-2"
          onClick={() => {
            reset_predictData();
          }}
        >
          <GiReturnArrow /> Upload Image
        </button>
      )}
    </div>
  );
};

export default PredictPage;
