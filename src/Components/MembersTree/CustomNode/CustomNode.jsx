import React from "react";
import userImg from "../../../Assets/Images/user1.png"; // Replace with the actual path to your image
import "./CustomNode.css"; // Assuming you have a CSS file for styling

const CustomNode = ({ nodeDatum, toggleNode, foreignObjectProps = {} }) => {
  return (
    <>
      {/* <div className="customNodeContainer">
        <img src={userImg} alt="userImg" className="nodeUserImage" />
        <div className="userDetails">
          <h3 className="nodeUsername">{nodeDatum.name}</h3>
          <p className="nodeShortCodeId">
            ID:
            {nodeDatum.attributes
              ? nodeDatum.attributes.ID
              : nodeDatum.shortcode}
          </p>
        </div>
      </div> */}

      <React.Fragment>
        <foreignObject
          style={{ width: "200px", height: "120px" }}
          {...foreignObjectProps}
        >
          <div className="customNodeContainer">
            <img src={userImg} alt="userImg" className="nodeUserImage" />
            <div className="userDetails">
              <h3 className="nodeUsername">{nodeDatum?.name}</h3>
              <p className="nodeShortCodeId">
                ID:{" "}
                {nodeDatum.attributes
                  ? nodeDatum.attributes.ID
                  : nodeDatum.shortcode}
              </p>
            </div>
          </div>
        </foreignObject>
        <g>
          <circle cx="0" cy="10" r="10" fill="blue" onClick={toggleNode} />
          <text fill="blue" strokeWidth="1" x="20">
            {nodeDatum?.name}
          </text>
          {nodeDatum.attributes?.department && (
            <text fill="green" x="20" dy="20" strokeWidth="1">
              Department: {nodeDatum.attributes?.department}
            </text>
          )}
        </g>
      </React.Fragment>

     
    </>
  );
};

export default CustomNode;
