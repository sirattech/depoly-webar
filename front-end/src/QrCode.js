import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

function QrCode() {
    const [text, setText] = useState("");
  const canvasRef = useRef();
  useEffect(() => {
    QRCode.toCanvas(
      canvasRef.current,
    
      text || " ",
      (error) => error && console.error(error)
    );
  }, [text]);
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />

      <canvas ref={canvasRef} />
    </div>
  )
}

export default QrCode