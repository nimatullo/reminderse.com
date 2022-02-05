import { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { CreateTextEntry } from "../models/CreateTextEntry";
import { entryService } from "../service/entry.service";
import Fade from "react-reveal/Fade";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function AddText() {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [category, setCategory] = useState("");
  const [nextEmailDate, setNextEmailDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [successfulAdd, setSuccessfulAdd] = useState(false);
  const [customDate, setCustomDate] = useState(false);

  function showSuccessfulAdd() {
    setSuccessfulAdd(true);
    setTimeout(() => {
      setSuccessfulAdd(false);
    }, 3000);
  }

  function handleTextAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const entry: CreateTextEntry = {
      entry_title: title,
      category: category,
      date_of_next_send: customDate ? nextEmailDate : undefined,
      text_content: textContent,
    };

    entryService
      .addText(entry)
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          setErrors("");
          setTextContent("");
          setTitle("");
          setCategory("");
          setNextEmailDate(new Date().toISOString().split("T")[0]);
          showSuccessfulAdd();
        }
      })
      .catch(() => {
        setErrors("Something went wrong. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-10">
        New text entry
      </h2>
      {successfulAdd && (
        <Fade top>
          <div className="alert alert-success">
            <div className="flex-1">
              <BiCheckCircle className="w-6 h-6 mx-2" />
              <label>Entry successfully added!</label>
            </div>
          </div>
        </Fade>
      )}
      {errors && (
        <div className="alert alert-error">
          <div className="flex-1">
            <BiErrorCircle className="w-6 h-6 mx-2" />
            <label>{errors}</label>
          </div>
        </div>
      )}
      <form onSubmit={handleTextAdd} className="space-y-5">
        <Fade duration={250}>
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
                <p>Text Content</p>
              </span>
              <textarea
                className="text-entry-area"
                rows={3}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                required
                placeholder="Contents of your text entry"
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
            Add Text Entry
          </button>
        </Fade>
      </form>
    </>
  );
}
