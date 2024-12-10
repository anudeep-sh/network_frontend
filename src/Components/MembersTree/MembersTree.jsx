import React, { useEffect, useRef, useState } from "react";
import "./MembersTree.css";
import Tree from "react-d3-tree";
import userImg from "../../Assets/Images/user1.png";
import CustomNode from "./CustomNode/CustomNode";
import { UserTreeApi } from "../../api/requests/network/network";
import { ReactComponent as UserSvg } from "../../Assets/Images/SolidPersonIcon.svg";



const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g transform="translate(-146, -33)" onClick={toggleNode}>
    {/* Centering the entire node */}
    {/* Outer frame for the node */}
    <rect width="292" height="66" rx="8" ry="8" fill="#f1f1f1" stroke="none" />
    {/* Inner circle for the user icon */}

    {/* The imported SVG icon */}
    <foreignObject x="16" y="12" width="42" height="42" stroke="none">
      <UserSvg width="42" height="42" stroke="none" />
    </foreignObject>
    {/* Text block for the name and ID */}
    <g transform="translate(74, 27)" stroke="none">
      <text
        fill="#3C3C3C"
        fontSize="14"
        fontFamily="Poppins"
        fontWeight="500"
        lineHeight="22"
        letterSpacing="0.28"
      >
        {nodeDatum.name}
      </text>
      <text
        fill="#727273"
        fontSize="14"
        fontFamily="Poppins"
        fontWeight="400"
        lineHeight="18"
        letterSpacing="0.28"
        dy="20"
      >
        ID: {nodeDatum.attributes?.shortcode || nodeDatum?.shortcode}
      </text>
    </g>
  </g>
);

function MembersTree() {
  const [orgChart, setOrgChart] = useState([]);
  const [transFormedOrgChart, setTransFormedOrgChart] = useState([]);
  const [show, setShow] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const treeContainerRef = useRef(null);

  const handleNetwork = async () => {
    try {
      const res = await UserTreeApi.getUserNetwork();
      setOrgChart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleNetwork();
  }, []);

  useEffect(() => {
    if (orgChart.length > 0) {
      const usersWithoutChildren = orgChart.filter(
        (user) => user.children.length === 0
      );
      const usersWithChildren = orgChart.filter(
        (user) => user.children.length > 0
      );
      setTransFormedOrgChart(usersWithChildren);
    }
    setShow(true);
  }, [orgChart]);

  useEffect(() => {
    const updateTranslate = () => {
      if (treeContainerRef.current) {
        const { width, height } = treeContainerRef.current.getBoundingClientRect();
        setTranslate({
          x: width / 2,
          y: height / 4,
        });
      }
    };

    updateTranslate();
    window.addEventListener('resize', updateTranslate);

    return () => {
      window.removeEventListener('resize', updateTranslate);
    };
  }, [show]);

  return (
    <>
      <div id="treeWrapper"  ref={treeContainerRef} style={{ width: "100%", height: "500px" }}>
        {show && (
          <Tree
            data={transFormedOrgChart?.length > 0 ? transFormedOrgChart : {}}
            pathFunc="step"
            orientation="vertical"
            separation={{ siblings: 3, nonSiblings: 3 }}
            allowForeignObjects={true}
            initialDepth={0.02}
            renderCustomNodeElement={renderRectSvgNode}
            pathClassFunc={() => "custom-path-style"}
            translate={translate}

          />
        )}
      </div>
    </>
  );
}

export default MembersTree;
