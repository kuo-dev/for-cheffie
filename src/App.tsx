import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    // Get window width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get button and image dimensions
    const noButton = document.getElementById("nobutton");
    const buttonRect = noButton.getBoundingClientRect();
    const imageRect = document.querySelector("img").getBoundingClientRect();
    const yesButtonRect = document.getElementById("yesbutton").getBoundingClientRect();

    // Calculate available space for the button
    const availableWidth = windowWidth - buttonRect.width;
    const availableHeight = windowHeight - buttonRect.height - imageRect.height;

    // Calculate the boundaries for the yes button
    const yesButtonTop = yesButtonRect.top - buttonRect.height;
    const yesButtonBottom = yesButtonRect.bottom + buttonRect.height;
    const yesButtonLeft = yesButtonRect.left - buttonRect.width;
    const yesButtonRight = yesButtonRect.right + buttonRect.width;

    // Generate random top and left positions within available space
    let randomTop = Math.floor(Math.random() * availableHeight);
    let randomLeft = Math.floor(Math.random() * availableWidth);

    // Check if the random position overlaps with the yes button, if so, recalculate
    while (
      randomTop + buttonRect.height > yesButtonTop &&
      randomTop < yesButtonBottom &&
      randomLeft + buttonRect.width > yesButtonLeft &&
      randomLeft < yesButtonRight
    ) {
      randomTop = Math.floor(Math.random() * availableHeight);
      randomLeft = Math.floor(Math.random() * availableWidth);
    }

    // Ensure the random position doesn't overlap with the image or goes off-screen
    randomTop = Math.max(0, Math.min(randomTop, windowHeight - buttonRect.height - imageRect.height));
    randomLeft = Math.max(0, Math.min(randomLeft, windowWidth - buttonRect.width));

    // Update button style with adjusted positions
    noButton.style.position = "absolute";
    noButton.style.top = randomTop + "px";
    noButton.style.left = randomLeft + "px";

    // Increment noCount
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "hhhhhhhhhhhhhhh",
      "but like...",
      "what if i was bruce :0",
      "i'll give u free cuddles!",
      "DUMMY STAWP HIT YES ;-;",
      "PLEASE CHEFFIE",
      "ill make u all the juice in the world!!",
      "i'll give u bao bao :3 👜",
      "no more farmers market trips 😭😭😭",
      "omg ill take u to hawaii if u say yes >:D",
      "please dummieee 😔",
      ":((((",
      "PRETTY PLEASE",
      "...",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img
            style={{ width: "200px", height: "200px" }} 
            src="https://media1.tenor.com/m/qMw2--N2wCUAAAAC/tiger-piglet.gif"
          />
          <div className="my-4 text-4xl font-bold">hehee Yay!!! ily dummie &lt;3333 happy valentines day &gt;.&lt;</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/groovy-tigger-hugging-heart-emoji-2t2jyujqx5oxiaqf.gif"
          />
          <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>
          <div className="flex items-center">
            <button
              id="yesbutton"
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes
            </button>
            <button
              id="nobutton"
              onClick={handleNoClick}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
