/* eslint-disable */

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileCode, faDownload } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";

const App = ({ submissionCode }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [selectedSnapshotIndex, setSelectedSnapshotIndex] = useState(-1);
  const [snapshotData, setSnapshotData] = useState(null);
  const [selectedSnapshotName, setSelectedSnapshotName] = useState("");

  useEffect(() => {
    setSnapshotData(null);
    setSelectedSnapshotIndex(-1);
    setOpenFolders({});
    setSelectedSnapshotName("");
    if (submissionCode) {
      api
        .get(`/api/submission/${submissionCode}`)
        .then((response) => {
          if (response.data.status === "success") {
            const snapshots = response.data.data.snapshots;
            setSnapshotData(snapshots);
            setSelectedSnapshotIndex(0);

            const initialOpenFolders = {};
            snapshots[0].content.forEach((item) => {
              if (item.isDirectory) {
                initialOpenFolders[item.name] = false;
              }
            });
            setOpenFolders(initialOpenFolders);
          } else {
            // Handle error
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [submissionCode]);

  const handleDownloadClick = () => {
    if (selectedSnapshotIndex !== -1) {
      const selectedSnapshot = snapshotData[selectedSnapshotIndex];
      const snapshotId = selectedSnapshot.id;

      api
        .get(`/api/submission/snapshot/${snapshotId}/download`, {
          responseType: "blob"
        })
        .then((response) => {
          if (response.status === 200) {
            const contentDisposition = response.headers["content-disposition"];
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            const filename = matches && matches[1] ? matches[1] : selectedSnapshot.snapshotName;

            const blob = new Blob([response.data], { type: response.headers["content-type"] });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
          } else {
            console.error("Failed to download the file");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDownloadAllClick = () => {
    if (submissionCode) {
      api
        .get(`/api/submission/snapshot/download/${submissionCode}`, {
          responseType: "blob"
        })
        .then((response) => {
          if (response.status === 200) {
            const contentDisposition = response.headers["content-disposition"];
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            const filename = matches && matches[1] ? matches[1] : `${submissionCode}.zip`;

            const blob = new Blob([response.data], { type: response.headers["content-type"] });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
          } else {
            console.error("Failed to download all snapshots");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const toggleFolder = (folderName) => {
    setOpenFolders((prevOpenFolders) => ({
      ...prevOpenFolders,
      [folderName]: !prevOpenFolders[folderName]
    }));
  };

  const toggleFile = (fileName) => {
    setOpenFolders((prevOpenFolders) => ({
      ...prevOpenFolders,
      [fileName]: !prevOpenFolders[fileName]
    }));
  };

  const createFolderStructure = (
    data,
    parentPath,
    isOpen,
    toggleFolder,
    toggleFile,
    selectedSnapshotName
  ) => {
    if (!data || data.length === 0) return null;

    return (
      <ul className="list-none cursor-pointer">
        {data.map((item, index) => {
          const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;

          if (item.isDirectory) {
            return (
              <li key={index} className=" text-lg border-b-[2px] mr-4 mt-4 pb-4">
                <div onClick={() => toggleFolder(item.name)}>
                  <FontAwesomeIcon icon={faFolder} style={{ color: "#FFD700" }} /> {item.name}
                </div>
                {isOpen[item.name]
                  ? createFolderStructure(
                      item.children,
                      itemPath,
                      isOpen,
                      toggleFolder,
                      toggleFile,
                      selectedSnapshotName
                    )
                  : null}
              </li>
            );
          } else if (item.content) {
            return (
              <li key={index} className="mt-2 border-b-[2px] mr-4 pb-2 ">
                <div onClick={() => toggleFile(item.name)}>
                  <FontAwesomeIcon icon={faFileCode} style={{ color: "#9F9F9F" }} /> {item.name}
                </div>
                {isOpen[item.name] ? (
                  <div>
                    <pre>{item.content}</pre>
                  </div>
                ) : null}
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    );
  };

  const handleSnapshotChange = (e) => {
    const index = e.target.value;
    setSelectedSnapshotIndex(index);
    if (index !== -1) {
      const selectedSnapshotName = snapshotData[index].snapshotName;
      setSelectedSnapshotName(selectedSnapshotName);
    } else {
      setSelectedSnapshotName("");
    }
  };

  return (
    <div className="w-full overflow-y-auto h-[60vh]  pl-6 ">
      <div className="flex justify-end mr-4 pb-2 text-white font-semibold border-b-[2px]">
        <select
          className="mr-4 rounded-lg capitalize bg-black cursor-pointer border-none"
          onChange={handleSnapshotChange}
          value={selectedSnapshotIndex}
        >
          {snapshotData &&
            snapshotData.map((snapshot, index) => (
              <option key={index} value={index}>
                {snapshot.snapshotName}
              </option>
            ))}
        </select>

        <button className="bg-[#1A9E27] pl-2 pr-2 mr-2 rounded-lg " onClick={handleDownloadClick}>
          Download one <FontAwesomeIcon icon={faDownload} />
        </button>

        <button className="bg-[#1A9E27] pl-2 pr-2 rounded-lg " onClick={handleDownloadAllClick}>
          Download All <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      {selectedSnapshotIndex !== -1 ? (
        createFolderStructure(
          snapshotData[selectedSnapshotIndex].content,
          "",
          openFolders,
          toggleFolder,
          toggleFile,
          selectedSnapshotName
        )
      ) : (
        <div>Select a snapshot</div>
      )}
    </div>
  );
};
export default App;
