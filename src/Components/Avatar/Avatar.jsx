import { Avatar } from "@mui/material";

export default function ManualAvatar({ src, alt, height, width, name }) {
  const initial = name
    ? name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
    : "A";
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: "auto",
        width: width || "40px",
        height: height || "40px",
        backgroundColor: src ? "" : "#8686e0",
        color: "#fff",
        fontFamily: "Poppins",
        fontSize: "19px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "normal",
        borderRadius: "50%",
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
     {initial}
    </Avatar>
  );
}
