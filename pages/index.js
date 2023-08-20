import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import SideBarTools from "../components/Sidbar";
import { stateToHTML } from "draft-js-export-html";
import { stateToMarkdown } from "draft-js-export-markdown";
// import { TEInput } from "tw-elements-react";

const MyModal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});
const NoSSREditor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showModalFile, setShowModalFile] = useState(false);
  const [darkToggle, setDarkToggle] = React.useState(false);
  const [journalState, setJournalState] = useState("empty");
  const [title, setTitle] = useState("Journal Title");
  const handle = useFullScreenHandle();
  const toggleFullScreen = () => {
    if (handle.active) handle.exit();
    else handle.enter();
    // alert("toggle", handle.active);
  };

  useEffect(() => {
    // handle.enter();
  }, [darkToggle]);

  function exportFile(type) {
    const link = document.createElement("a");
    if (type == "html") {
      let html = stateToHTML(journalState.getCurrentContent());
      const fileData = JSON.stringify(html);
      const blob = new Blob([fileData], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      link.download = `${title}.html`;
      link.href = url;
    } else if (type == "markdown") {
      const markdown = stateToMarkdown(journalState.getCurrentContent());
      const fileData = JSON.stringify(markdown);
      const blob = new Blob([fileData], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      link.download = `${title}.md`;
      link.href = url;
    }

    link.click();
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  return (
    <FullScreen handle={handle}>
      <div
        className={`flex items-center justify-center h-screen ${
          darkToggle && "dark"
        }`}
      >
        <SideBarTools
          toggleDark={() => setDarkToggle(!darkToggle)}
          toggleFullScreen={toggleFullScreen}
          showModal={showModal}
          setShowModal={setShowModal}
          showModalFile={showModalFile}
          setShowModalFile={setShowModalFile}
        />
        <MyModal
          showModal={showModal}
          setShowModal={setShowModal}
          title="Target Word Count"
        ></MyModal>

        <MyModal
          showModal={showModalFile}
          setShowModal={setShowModalFile}
          title="Save Journal"
        >
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded inline-flex items-center"
            onClick={() => exportFile("markdown")}
          >
            Save Markdown
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => exportFile("html")}
          >
            Save HTML
          </button>
        </MyModal>
        <div>
          <input
            className="relative top-16 text-5xl"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
          <NoSSREditor
            journalState={journalState}
            setJournalState={setJournalState}
          />
        </div>
      </div>
    </FullScreen>
  );
}
