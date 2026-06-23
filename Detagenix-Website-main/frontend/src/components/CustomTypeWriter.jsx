import { useState, useEffect } from "react";

export default function CustomTypewriter() {
  const words = ["Technology", "AI Solutions", "Custom Software"];
  const [index, setIndex] = useState(0); // Kaunsa word chal raha hai
  const [subIndex, setSubIndex] = useState(0); // Word ka kaunsa letter chal raha hai
  const [isDeleting, setIsDeleting] = useState(false); // Type ho raha hai ya delete
  const [blink, setBlink] = useState(true); // Blinking cursor ke liye

  // Blinking cursor effect (|)
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Main Typing aur Deleting logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      // Pura word type ho gaya, ab 1.5s ruko fir delete shuru karo
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      // Word poora delete ho gaya, ab agle word par jao
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 40 : 80); // Typing speed 80ms, Deleting speed 40ms

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index]);

  return (
    <span style={{ color: "#00aaff" }}>
      {`${words[index].substring(0, subIndex)}`}
      <span style={{ opacity: blink ? 1 : 0, marginLeft: "2px" }}>|</span>
    </span>
  );
}