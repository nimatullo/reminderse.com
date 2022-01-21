import { useState } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { CreateLinkEntry } from "../models/CreateTextEntry";
import { entryService } from "../service/entry.service";
import Fade from "react-reveal/Fade";
import Snackbar from "./Snackbar";
import useMessage from "../context/customMessageHook";

export default function AddLink() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [nextEmailDate, setNextEmailDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const { setMessage } = useMessage();

  function handleLinkAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const entry: CreateLinkEntry = {
      entry_title: title,
      category: category,
      dateOfNextSend: nextEmailDate,
      url: url,
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
      .catch(() => {
        setMessage({
          show: true,
          type: "error",
          message: "Something went wrong. Please try again.",
        });
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
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
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
                  value={nextEmailDate}
                  onChange={(e) => setNextEmailDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  placeholder="Date of next send"
                  className="input input-bordered"
                />
              </label>
            </div>
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
