import { useState } from "react";
import { MdFileDownload } from "react-icons/md";
import Fade from "react-reveal/Fade";
import { Entry } from "../../models/Entry";
import { entryService } from "../../service/entry.service";

export function Entries() {
  const [entries] = useState<Entry[]>([]);

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

  return (
    <Fade>
      <div className="my-5 space-y-5 flex flex-col">
        <h2 className="text-xl">Download your entries</h2>
        <small>
          This will download a JSON file with all your text entries.
        </small>
        <button className="btn btn-info" onClick={downloadEntries}>
          <MdFileDownload className="inline-block w-6 h-6 mr-2 stroke-current" />
          Download
        </button>
      </div>
    </Fade>
  );
}
