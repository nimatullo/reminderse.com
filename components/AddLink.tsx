import { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { CreateEntry } from "../models/CreateEntry";
import { entryService } from "../service/entry.service";
import Fade from "react-reveal/Fade";
import Snackbar from "./Snackbar";
import useMessage from "../context/customMessageHook";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function AddLink() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [nextEmailDate, setNextEmailDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [customDate, setCustomDate] = useState(false);

  const { setMessage } = useMessage();

  function handleLinkAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const entry: CreateEntry = {
      entry_title: title,
      category: category,
      date_of_next_send: customDate ? nextEmailDate : undefined,
      content: url,
    };

    entryService
      .addLink(entry)
      .then((res) => {
        if (res.status === 201) {
          setUrl("");
          setTitle("");
          setCategory("");
          setNextEmailDate(new Date().toISOString().split("T")[0]);
          setMessage({
            show: true,
            type: "success",
            message: "Entry added successfully!",
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setMessage({
            show: true,
            type: "error",
            message: "Dates cannot be in the past",
          });
        } else {
          setMessage({
            show: true,
            type: "error",
            message: "Something went wrong. Please try again.",
          });
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
        New link entry
      </h2>
      <form className="space-y-5" onSubmit={handleLinkAdd}>
        <Fade duration={500}>
          <div className="form-control">
            <label
              htmlFor="title"
              className="input-group input-group-vertical input-group-md"
            >
              <span className="bg bg-secondary" style={{ color: "white" }}>
                Entry Title
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Title"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label
              htmlFor="url"
              className="input-group input-group-vertical input-group-md"
            >
              <span
                className="bg bg-secondary flex justify-between"
                style={{ color: "white" }}
              >
                <p>URL</p>
              </span>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="https://reminderse.com"
                className="input input-bordered"
              />
            </label>
          </div>
          <div
            className={`grid grid-cols-1 gap-3 ${
              customDate ? "lg:grid-cols-3" : ""
            }`}
          >
            <div className="form-control lg:col-span-2">
              <label
                htmlFor="category"
                className="input-group input-group-vertical input-group-md"
              >
                <span
                  className="bg bg-secondary flex justify-between"
                  style={{ color: "white" }}
                >
                  <p>Category (optional)</p>
                </span>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category for link"
                  className="input input-bordered"
                />
              </label>
            </div>
            {customDate && (
              <div className="form-control">
                <label
                  htmlFor="date"
                  className="input-group input-group-vertical input-group-md"
                >
                  <span
                    className="bg bg-secondary flex justify-between"
                    style={{ color: "white" }}
                  >
                    <p>Next email date</p>
                  </span>
                  <input
                    type="date"
                    disabled={!customDate}
                    value={nextEmailDate}
                    onChange={(e) => setNextEmailDate(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="Date of next send"
                    className="input input-bordered"
                  />
                </label>
              </div>
            )}
          </div>
          <div className="form-control bordered">
            <label className="cursor-pointer label">
              <span className="label-text flex items-center">
                Custom date
                <div data-tip="Set your own email date" className="tooltip">
                  <AiOutlineQuestionCircle
                    className="text-xl mx-1 hover:fill-neutral"
                    style={{ color: "#777676" }}
                  />
                </div>
              </span>
              <input
                type="checkbox"
                checked={customDate}
                onChange={() => setCustomDate(!customDate)}
                className="checkbox checkbox-secondary"
              />
            </label>
          </div>
          <button
            type="submit"
            className={`${
              isLoading ? "loading" : ""
            } btn btn-primary w-full shadow-primary/50 shadow-sm`}
          >
            <IoMdAddCircle className="mr-2" />
            Add Link Entry
          </button>
        </Fade>
      </form>
    </>
  );
}
