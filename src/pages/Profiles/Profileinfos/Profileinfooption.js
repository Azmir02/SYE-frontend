import axios from "axios";
import React, { useEffect, useState } from "react";
import Editbio from "./Editbio";
import { LoginUser } from "../../../features/users/loginUser";
import Editdetails from "./Editdetails";
import { useDispatch } from "react-redux";

const Profileinfooption = ({ userDtails, users, visitor, setOthername }) => {
  const [details, setDetails] = useState(userDtails);
  const dispatch = useDispatch();
  const initial = {
    bio: details?.bio ? details.bio : "",
    othername: details?.othername ? details.othername : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    hometown: details?.hometown ? details.hometown : "",
    currentcity: details?.currentcity ? details.currentcity : "",
    college: details?.college ? details.college : "",
    highschool: details?.highschool ? details.highschool : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [visible, setVisible] = useState(false);
  const [max, setMax] = useState(100);

  useEffect(() => {
    setDetails(userDtails);
    setInfos(userDtails);
  }, [userDtails]);

  const updateDetails = async () => {
    try {
      let { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/updatedetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${users.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.othername);
      dispatch(LoginUser({ ...users, details: data.othername }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...users, details: data.othername })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  return (
    <div className="postMenu">
      <div className="text-center">
        {!showBio && (
          <span className="text-secondary_color font-primary text-lg font-medium block">
            {details?.bio && <span>{details?.bio}</span>}
          </span>
        )}
        {showBio && (
          <Editbio
            max={max}
            updateDetails={updateDetails}
            handlechange={handlechange}
            infos={infos}
            setShowBio={setShowBio}
            placeholder="Edit bio"
            name="bio"
          />
        )}
        {!visitor && !showBio && !details?.bio && (
          <button
            onClick={() => setShowBio(true)}
            className="bg-page_color w-full py-2 rounded-md mt-3 text-secondary_color font-normal text-base font-primary"
          >
            Add Bio
          </button>
        )}
        {!visitor && details?.bio && (
          <button
            onClick={() => setShowBio(true)}
            className="bg-page_color w-full py-2 rounded-md mt-3 text-secondary_color font-normal text-base font-primary"
          >
            Edit Bio
          </button>
        )}
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img className="invert-[40%]" src="../../../icons/job.png" alt="" />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.job && details?.workplace ? (
              <span>
                Work as a <b>{details?.job}</b> at <b>{details?.workplace}</b>
              </span>
            ) : details?.job && !details?.workplace ? (
              <span>
                work as <b>{details?.job}</b>
              </span>
            ) : !details?.job && details?.workplace ? (
              <span>
                works at <b>{details?.workplace}</b>
              </span>
            ) : (
              "work place & job"
            )}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img className="invert-[40%]" src="../../../icons/from.png" alt="" />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.currentcity ? (
              <span>
                Lives in <b>{details?.currentcity}</b>
              </span>
            ) : (
              "Currentcity"
            )}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img className="invert-[40%]" src="../../../icons/home.png" alt="" />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.hometown ? (
              <span>
                From <b>{infos.hometown}</b>
              </span>
            ) : (
              "Hometown"
            )}
          </span>
        </div>
      </div>
      {details?.college && (
        <div className="mt-3 flex items-center">
          <div className="w-[5%]">
            <img
              className="invert-[40%]"
              src="../../../icons/studies.png"
              alt=""
            />
          </div>
          <div className="w-[95%]">
            <span className="text-secondary_color font-primary text-base font-normal block ml-2">
              {details?.college ? (
                <span>
                  Studied at <b>{details?.college}</b>
                </span>
              ) : (
                "Add School or College"
              )}
            </span>
          </div>
        </div>
      )}
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img
            className="invert-[40%]"
            src="../../../icons/studies.png"
            alt=""
          />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.highschool ? (
              <span>
                Studied at <b>{details?.highschool}</b>
              </span>
            ) : (
              "Hightschool"
            )}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img
            className="invert-[40%]"
            src="../../../icons/relationship.png"
            alt=""
          />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.relationship ? (
              <span>{details?.relationship}</span>
            ) : (
              "relationship status"
            )}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center">
        <div className="w-[5%]">
          <img
            className="invert-[40%]"
            src="../../../icons/instagram.png"
            alt=""
          />
        </div>
        <div className="w-[95%]">
          <span className="text-secondary_color font-primary text-base font-normal block ml-2">
            {details?.instagram ? (
              <a className="text-blue" href="https://www.instagram.com/">
                {details?.instagram}
              </a>
            ) : (
              "Instagram account"
            )}
          </span>
        </div>
      </div>
      {!visitor &&
        !details?.othername &&
        !details?.job &&
        !details?.workplace &&
        !details?.hometown &&
        !details?.currentcity &&
        !details?.relationship &&
        !details?.highschool &&
        !details?.college &&
        !details?.instagram ? (
        <button
          onClick={() => setVisible(true)}
          className="bg-page_color w-full py-2 rounded-md mt-3 text-secondary_color font-normal text-base font-primary"
        >
          Add Details
        </button>
      ) : (
        !visitor && (
          <button
            onClick={() => setVisible(true)}
            className="bg-page_color w-full py-2 rounded-md mt-3 text-secondary_color font-normal text-base font-primary"
          >
            Edit Details
          </button>
        )
      )}
      {visible && !visitor && (
        <Editdetails
          updateDetails={updateDetails}
          handlechange={handlechange}
          setVisible={setVisible}
          infos={infos}
          details={details}
        />
      )}
    </div>
  );
};

export default Profileinfooption;
