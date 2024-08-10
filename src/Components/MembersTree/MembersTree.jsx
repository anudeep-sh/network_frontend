import React, { useEffect, useState } from "react";
import "./MembersTree.css";
import Tree from "react-d3-tree";
import userImg from "../../Assets/Images/user1.png";
import CustomNode from "./CustomNode/CustomNode";
import { UserTreeApi } from "../../api/requests/network/network";

const svgSquare = {
  shape: "rect",
  shapeProps: {
    width: 180,
    height: 40,
    x: 0,
    y: -20,
    color: "#ffffff",
  },
};

const test = {
  shape: "rect",
  shapeProps: {
    width: 0,
    height: 0,
    x: -20,
    y: 20,
    stroke: "#2F80ED",
  },
};

const nodeStyle = (
  <svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
    <rect
      width="80"
      height="40"
      x="10"
      y="10"
      style="fill: skyblue; stroke: cadetblue; stroke-width: 2;"
    />
  </svg>
);

const treeStyle = {
  nodes: {
    node: {
      circle: <nodeStyle />,
      name: <nodeStyle />,
      attributes: <nodeStyle />,
    },
  },
};

const NodeLabel = ({ className, nodeData }) => (
  <div
    className={className}
    style={{
      background: "#ffffff",
      height: "70px",
      borderTop: "2px solid #2F80ED",
      textAlign: "center",
      // position: "fixed",
      zIndex: "1000",
      // left: "-10px",
      boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
      padding: "5px 0",
      borderRadius: "5px",
    }}
  >
    {nodeData?.name}
  </div>
);

function MembersTree() {
  const [orgChart, setOrgChart] = useState([]);
  const [transFormedOrgChart, setTransFormedOrgChart] = useState([]);
  const [show, setShow] = useState(false);

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

  return (
    <>
      <div className="customNodeContainer">
        {/* <img src={userImg} alt="userImg" className="nodeUserImage" /> */}
        <div className="userDetails">
          <h3 className="nodeUsername">{"sergio"}</h3>
          <p className="nodeShortCodeId">ID:qwekhdbwu</p>
        </div>
      </div>
      <div id="treeWrapper" style={{ width: "100%", height: "500px" }}>
        {show && (
          <Tree
            data={transFormedOrgChart?.length > 0 ? transFormedOrgChart : {}}
            nodeSvgShape={test}
            pathFunc="step"
            separation={{ siblings: 2, nonSiblings: 2 }}
            orientation="vertical"
            translate={{ x: 900, y: 100 }}
            allowForeignObjects={true}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            nodeLabelComponent={{
              render: <NodeLabel className="myLabelComponentInSvg" />,
            //   foreignObjectWrapper: {
            //     width: 220,
            //     height: 200,
            //     y: -50,
            //     x: -100,
            //   },
            }}
            initialDepth={0.02}
          />
        )}
      </div>
    </>
  );
}

export default MembersTree;
