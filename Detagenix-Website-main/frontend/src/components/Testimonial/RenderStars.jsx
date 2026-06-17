const GlowStar = ({ fillPercent }) => {
  return (
    <div style={{ position: "relative", display: "inline-block", fontSize: "20px" }}>
 
      <span style={{ color: "#475569" }}>★</span>
 
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${fillPercent}%`, 
          overflow: "hidden",
          color: "rgb(0, 191, 255)", 
          textShadow: "0 0 8px rgba(0, 191, 255, 0.6)", 
          whiteSpace: "nowrap",
        }}
      >
        ★
      </div>
    </div>
  );
};
const RenderStars = ({rating}) => {
  const stars = [];
  const parsedRating = Number(rating) || 0; 

  for (let i = 1; i <= 5; i++) {
    let fillPercent = 0;

    if (parsedRating >= i) {
     
      fillPercent = 100;
    } else if (parsedRating > i - 1) {
      
      fillPercent = (parsedRating - (i - 1)) * 100;
    }

    stars.push(<GlowStar key={i} fillPercent={fillPercent} />);
  }

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {stars}
    </div>
  );
};
export default RenderStars;