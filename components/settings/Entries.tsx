import { useState } from "react";
import { MdFileDownload } from "react-icons/md";
import Fade from "react-reveal/Fade";
import useMessage from "../../context/customMessageHook";
import { Entry } from "../../models/Entry";
import { entryService } from "../../service/entry.service";
import { LoginResponse, userService } from "../../service/user.service";
import Snackbar from "../Snackbar";

export function Entries() {
  const [interval, setInterval] = useState(() => {
    if (userService.userValue.interval) {
      return userService.userValue.interval;
    } else {
      return 3;
    }
  });
  const [isIntervalFieldDisabled, setIsIntervalFieldDisabled] = useState(true);

  const { setMessage } = useMessage();

  async function downloadEntries() {
    let entries: Entry[] = [];
    await entryService
      .getLinkEntries()
      .then((data) => entryService.mapToEntry(data.entries))
      .then((data) => data.map((entry) => entries.push(entry)));
    await entryService
      .getTextEntries()
      .then((data) => entryService.mapToEntry(data.entries))
      .then((data) => data.map((entry) => entries.push(entry)));

    const blob = new Blob([JSON.stringify(entries)], { type: "text/json" });
    const a = document.createElement("a");
    a.download = `reminderse-entries-${new Date(Date.now())
      .toLocaleString()
      .split(",")[0]
      .replaceAll("/", "-")}.json`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const re = /^[0-9]*$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setInterval(parseInt(event.target.value));
    }
  }

  function handleIntervalChange() {
    const user = localStorage.getItem("user");
    let userData: LoginResponse;
    if (user) {
      userData = JSON.parse(user);
      userService.updateInterval(interval).then((status) => {
        if (status === 200) {
          setIsIntervalFieldDisabled(true);
          setMessage({
            show: true,
            message: "Interval updated successfully",
            type: "success",
          });
          localStorage.setItem(
            "user",
            JSON.stringify({ ...userData, interval })
          );
        }
      });
    }
  }

  return (
    <Fade>
      <div className="my-5 space-y-5 flex flex-col">
        <Snackbar />
        <h2 className="text-xl">Download your entries</h2>
        <small>
          This will download a JSON file with all your text entries.
        </small>
        <button className="btn btn-info" onClick={downloadEntries}>
          <MdFileDownload className="inline-block w-6 h-6 mr-2 stroke-current" />
          Download
        </button>
        <h2 className="text-xl">Interval</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="Account Interval"
              className="w-full pr-16 input input-primary input-bordered"
              disabled={isIntervalFieldDisabled}
              value={interval}
              min={1}
              max={31}
              onChange={handleChange}
            />
            {isIntervalFieldDisabled ? (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() =>
                  setIsIntervalFieldDisabled(!isIntervalFieldDisabled)
                }
              >
                Edit
              </button>
            ) : (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={handleIntervalChange}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
